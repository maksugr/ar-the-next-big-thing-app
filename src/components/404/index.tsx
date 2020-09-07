import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledPage404 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: #0e1111;
`;

const StyledText = styled.span`
    width: 40%;
    font-size: 36px;
    font-weight: 300;
    text-align: center;
    color: #fff;

    span {
        font-size: 48px;
    }
`;

const Page404: FunctionComponent = () => {
    return (
        <StyledPage404>
            <StyledText>
                404<span>,</span>
            </StyledText>
        </StyledPage404>
    );
};

export default Page404;
