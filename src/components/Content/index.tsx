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

interface IContent {
    readonly isFrontCamera: boolean;
    readonly toggleCamera: () => void;
}

interface IStyledMenuContentItemLeft {
    readonly button?: boolean;
}

interface IStyledVideoContainer {
    readonly visible: boolean;
}

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

const StyledVideoContainer = styled.div<IStyledVideoContainer>`
    video {
        display: none;
    }

    canvas {
        min-height: 100vh;
        min-width: 100vw;
        object-fit: cover;
    }

    ${({ visible }) =>
        !visible &&
        `
        display: none;
    `}
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

const StyledMenuContentItemLeft = styled.span<IStyledMenuContentItemLeft>`
    font-size: 16px;
    color: #fff;

    ${({ button }) =>
        button &&
        `
        color: #ebd100;
        cursor: pointer;
        transition: opacity 0.3s;

        &:hover {
            opacity: 0.7;
        }
    `}
`;

const StyledMenuContentItemRight = styled.div`
    margin-left: auto;
`;

const StyledMenuToggle = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 100px;
    line-height: 0;
    color: #ebd100;
    cursor: pointer;
    transition: opacity 0.3s;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.7;
    }
`;
const StyledReturn = styled.a`
    position: absolute;
    bottom: 20px;
    right: 20px;
    text-transform: uppercase;
    font-family: 'Roboto Mono', monospace;
    font-size: 32px;
    font-weight: 700;
    text-decoration: none;
    color: #ebd100;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

const Content: FunctionComponent<IContent> = ({
    isFrontCamera,
    toggleCamera
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [maskColor, setMaskColor] = useState('#ebd100');

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef?.current;

        function loadedmetadataListener() {
            video?.play();

            intializeThreejs({ maskColor });
            intializeEngine({
                callback: () => {
                    setIsLoading(false);
                }
            });
        }

        video?.addEventListener('loadedmetadata', loadedmetadataListener);

        async function init() {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: isFrontCamera ? 'user' : 'environment'
                }
            });

            if (video) {
                video.srcObject = mediaStream;
            }
        }

        init();

        return () => {
            video?.removeEventListener(
                'loadedmetadata',
                loadedmetadataListener
            );
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
            {!isLoading && (
                <StyledMenuToggle
                    onClick={() => {
                        if (isMenuOpened) {
                            setIsMenuOpened(false);
                        } else setIsMenuOpened(true);
                    }}
                >
                    {isMenuOpened ? '-' : '+'}
                </StyledMenuToggle>
            )}
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
                        <StyledMenuContentItem>
                            <StyledMenuContentItemLeft
                                button
                                onClick={() => {
                                    toggleCamera();

                                    setIsMenuOpened(false);
                                }}
                            >
                                Set {isFrontCamera ? 'rear' : 'front'} camera
                            </StyledMenuContentItemLeft>
                        </StyledMenuContentItem>
                    </StyledMenuContent>
                </StyledMenu>
            )}
            <StyledVideoContainer
                id='video-container'
                visible={!isMenuOpened && !isLoading}
            >
                <video
                    ref={videoRef}
                    id='video'
                    playsInline
                    autoPlay={false}
                    muted
                />
            </StyledVideoContainer>
            <StyledReturn href='/presentations/ar-the-next-big-thing'>
                Back
            </StyledReturn>
        </StyledContent>
    );
};

export default Content;
