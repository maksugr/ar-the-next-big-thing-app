import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IButton {
    readonly onClick: () => void;
}

const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    background: red;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

const Button: FunctionComponent<IButton> = ({ onClick, children }) => {
    return <StyledButton onClick={() => onClick()}>{children}</StyledButton>;
};

export default Button;
