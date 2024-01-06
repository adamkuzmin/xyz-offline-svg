import AuthWrapper from "@/components/auth/auth-wrapper";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />

      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  && body {
    background-color: #141414;
    font-family: "Roboto", sans-serif;
  }
  

  & .MuiBox-root {
    &:focus-visible {
      outline: none;
    }
  }
`;

export default App;
