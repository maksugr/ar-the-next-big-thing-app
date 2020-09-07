import { createGlobalStyle } from 'styled-components';

export const GlobalStylesApp = createGlobalStyle`
    html, body {
        height: 100%;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Roboto Mono', monospace;
    }

    #root {
        min-height: 100%;
    }
`;
