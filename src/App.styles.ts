import { createGlobalStyle } from 'styled-components';

export const GlobalStylesApp = createGlobalStyle`
    html, body {
        height: 100%;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Roboto Mono', monospace;
        background: #0e1111;
    }

    #root {
        min-height: 100%;
    }
`;
