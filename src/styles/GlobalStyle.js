// import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: ${(props) => props.theme.bodyBg};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }
`;

export const lightTheme = {
  bodyBg: "#f1f1f1",
  text: "#333",
  accentColor: "#6200ee",
};

export const darkTheme = {
  bodyBg: "#121212",
  text: "#fff",
  accentColor: "#bb86fc",
};
