import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    font-family: 'Roboto', Arial, sans-serif;
  }
  #root {
    width: 100%;
  }
`;

export default GlobalStyles;
