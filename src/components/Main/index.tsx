import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'react-use';

import Content from '../Content';
import Button from '../Button';

interface ISlyledMain {
    readonly height: number;
}

const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledText = styled.div`
    font-size: 16px;
    margin-bottom: 40px;
    color: #fff;
`;

const StyledMain = styled.div<ISlyledMain>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    ${({ height }) => `
        height: ${height}px;
        max-height: ${height}px;
    `}
    background: #0e1111;
`;

const StyledButton = styled(Button)`
    margin-bottom: 40px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const StyledLink = styled.a`
    font-weight: 700;
    color: #ebd100;
    text-decoration: none;
`;

const Main: FunctionComponent = () => {
    const [isCameraAllowed, setIsCameraAllowed] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const { height } = useWindowSize();

    const toggleCamera = () => {
        if (isFrontCamera) {
            setIsFrontCamera(false);
        } else {
            setIsFrontCamera(true);
        }
    };

    return (
        <StyledMain height={height}>
            {!isCameraAllowed && (
                <StyledMenu>
                    <StyledText>
                        To get AR experience you need to give access to the
                        camera
                    </StyledText>
                    <StyledButton onClick={() => setIsCameraAllowed(true)}>
                        Mask
                    </StyledButton>
                    <StyledButton href='/presentations/ar-the-next-big-thing/crystal'>
                        Marker-base (hiro marker)
                    </StyledButton>
                    <StyledLink href='https://maksugr.com'>
                        maksugr.com
                    </StyledLink>
                </StyledMenu>
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
