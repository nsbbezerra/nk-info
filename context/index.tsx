import { ClientContextProvider } from "./client/index";

const GlobalContext = ({ children }: any) => {
  return <ClientContextProvider>{children}</ClientContextProvider>;
};

export default GlobalContext;
