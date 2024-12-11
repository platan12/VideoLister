import React, { createContext, useState, useContext } from 'react';

// Crear el context
const UserContext = createContext();

// Proveïdor del context
export const UserProvider = ({ children }) => {
  const [userUID, setUserUID] = useState(null);

  return (
    <UserContext.Provider value={{ userUID, setUserUID }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook per utilitzar el context fàcilment
export const useUser = () => useContext(UserContext);