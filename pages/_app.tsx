import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { client, ssrCache } from "../lib/urql";
import GlobalContext from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <GlobalContext>
        <Component {...pageProps} />
      </GlobalContext>
    </Provider>
  );
}

export default MyApp;
