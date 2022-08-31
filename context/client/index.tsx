import { createContext, Dispatch, SetStateAction, useState } from "react";

type ClientTypes = {
  id: string;
  name: string;
};

type PropsClientContext = {
  state: ClientTypes;
  setState: Dispatch<SetStateAction<ClientTypes>>;
};

const DEFAULT_VALUES = {
  state: {
    id: "",
    name: "",
  },
  setState: () => {},
};

const ClientContext = createContext<PropsClientContext>(DEFAULT_VALUES);

const ClientContextProvider = ({ children }: any) => {
  const [state, setState] = useState(DEFAULT_VALUES.state);

  return (
    <ClientContext.Provider value={{ state, setState }}>
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContextProvider };
export default ClientContext;
