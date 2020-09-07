import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: #0e1111;
`;

const Main: FunctionComponent = () => {
    return <StyledMain />;
};

export default Main;
