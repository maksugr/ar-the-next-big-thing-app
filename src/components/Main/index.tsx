import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import CameraPermission from '../CameraPermission';
import Content from '../Content';

const StyledMain = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: #0e1111;
`;

const Main: FunctionComponent = () => {
    const [isCameraAllowed, setIsCameraAllowed] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(false);

    const toggleCamera = () => {
        if (isFrontCamera) {
            setIsFrontCamera(false);
        } else {
            setIsFrontCamera(true);
        }
    };

    return (
        <StyledMain>
            {!isCameraAllowed && (
                <CameraPermission onClick={() => setIsCameraAllowed(true)} />
            )}
            {isCameraAllowed && isFrontCamera && (
                <Content
                    isFrontCamera={isFrontCamera}
                    toggleCamera={toggleCamera}
                />
            )}
            {isCameraAllowed && !isFrontCamera && (
                <Content
                    isFrontCamera={isFrontCamera}
                    toggleCamera={toggleCamera}
                />
            )}
        </StyledMain>
    );
};

export default Main;
