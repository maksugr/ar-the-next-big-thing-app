import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from '../Button';

interface ICameraPermissionOverlay {
    readonly onClick: () => void;
}

const StyledCameraPermission = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledText = styled.div`
    font-size: 16px;
    margin-bottom: 15px;
    color: #fff;
`;

const CameraPermission: FunctionComponent<ICameraPermissionOverlay> = ({
    onClick
}) => {
    return (
        <StyledCameraPermission>
            <StyledText>
                To get AR expirience you need to give access to the camera
            </StyledText>
            <Button onClick={() => onClick()}>Start</Button>
        </StyledCameraPermission>
    );
};

export default CameraPermission;
