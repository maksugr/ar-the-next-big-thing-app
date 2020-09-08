/* eslint-disable jsx-a11y/media-has-caption */

import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { intializeThreejs, intializeEngine } from './helpers/render';

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
    margin: auto;
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
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

const Content: FunctionComponent<IContent> = () => {
    const [isLoading, setIsLoading] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef?.current;

        function canplayListener() {
            video?.play();

            intializeThreejs();
            intializeEngine();

            setIsLoading(false);
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
    }, []);

    return (
        <StyledContent>
            {isLoading ? <StyledLoading>Loading...</StyledLoading> : null}
            <StyledVideoContainer id='video-container'>
                <video ref={videoRef} id='video' />
            </StyledVideoContainer>
        </StyledContent>
    );
};

export default Content;
