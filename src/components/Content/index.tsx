/* eslint-disable jsx-a11y/media-has-caption */

import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useState,
    ChangeEvent
} from 'react';
import styled from 'styled-components';

import {
    intializeThreejs,
    intializeEngine,
    changeMaskColor
} from './helpers/render';

interface IContent {}

const StyledContent = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const StyledLoading = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    background: #0e1111;
`;

const StyledVideoContainer = styled.div`
    video {
        display: none;
    }

    canvas {
        min-height: 100vh;
        min-width: 100vw;
        object-fit: cover;
    }
`;

const StyledMenu = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0e1111;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledMenuContent = styled.div`
    width: 300px;
`;

const StyledMenuContentItem = styled.div`
    display: flex;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const StyledMenuContentItemLeft = styled.span`
    font-size: 16px;
    color: #fff;
`;

const StyledMenuContentItemRight = styled.div`
    margin-left: auto;
`;

const StyledMenuToggle = styled.div`
    position: absolute;
    top: 30px;
    right: 20px;
    font-size: 100px;
    line-height: 0;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

const Content: FunctionComponent<IContent> = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [maskColor, setMaskColor] = useState('#0000FF');

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef?.current;

        function canplayListener() {
            video?.play();

            intializeThreejs({ maskColor });
            intializeEngine({
                callback: () => {
                    setIsLoading(false);
                }
            });
        }

        video?.addEventListener('canplay', canplayListener);

        async function init() {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: 'user'
                }
            });

            if (video) {
                video.srcObject = mediaStream;
            }
        }

        init();

        return () => {
            video?.removeEventListener('canplay', canplayListener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        changeMaskColor(maskColor);
        setIsMenuOpened(false);
    }, [maskColor]);

    return (
        <StyledContent>
            {isLoading ? <StyledLoading>Loading...</StyledLoading> : null}
            {isMenuOpened && (
                <StyledMenu>
                    <StyledMenuContent>
                        <StyledMenuContentItem>
                            <StyledMenuContentItemLeft>
                                Mask color:
                            </StyledMenuContentItemLeft>
                            <StyledMenuContentItemRight>
                                <input
                                    type='color'
                                    value={maskColor}
                                    onChange={(
                                        event: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setMaskColor(event.target.value);
                                    }}
                                />
                            </StyledMenuContentItemRight>
                        </StyledMenuContentItem>
                    </StyledMenuContent>
                </StyledMenu>
            )}
            <StyledMenuToggle
                onClick={() => {
                    if (isMenuOpened) {
                        setIsMenuOpened(false);
                    } else setIsMenuOpened(true);
                }}
            >
                {isMenuOpened ? '-' : '+'}
            </StyledMenuToggle>
            <StyledVideoContainer id='video-container'>
                <video ref={videoRef} id='video' />
            </StyledVideoContainer>
        </StyledContent>
    );
};

export default Content;
