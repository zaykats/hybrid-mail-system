// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface ClientInfo {
//   name: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
//   email: string;
//   telephone: string;
//   identifiantclient: string; 
// }

// interface ClientContextType {
//   client: ClientInfo | null;
//   setClient: (client: ClientInfo) => void;
// }

// const ClientContext = createContext<ClientContextType | undefined>(undefined);

// export const ClientProvider = ({ children }: { children: ReactNode }) => {
//   const [client, setClient] = useState<ClientInfo | null>(null);

//   return (
//     <ClientContext.Provider value={{ client, setClient }}>
//       {children}
//     </ClientContext.Provider>
//   );
// };

// export const useClient = () => {
//   const context = useContext(ClientContext);
//   if (!context) {
//     throw new Error('useClient must be used within a ClientProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClientInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  telephone: string;
  identifiantclient: string; 
  id:string
}

interface ClientContextType {
  client: ClientInfo | null;
  setClient: (client: ClientInfo | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<ClientInfo | null>(null);

  const isAuthenticated = Boolean(client);

  const logout = () => {
    setClient(null);
    // If you store client in localStorage, clear it here too:
    localStorage.removeItem('client');
  };

  return (
    <ClientContext.Provider value={{ client, setClient, isAuthenticated, logout }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
