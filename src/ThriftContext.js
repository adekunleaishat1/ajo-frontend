// ThriftContext.js
import React, { createContext, useContext, useState } from 'react';

const ThriftContext = createContext();

export const ThriftProvider = ({ children }) => {
  const [selectedThriftId, setSelectedThriftId] = useState(null);

  return (
    <ThriftContext.Provider value={{ selectedThriftId, setSelectedThriftId }}>
      {children}
    </ThriftContext.Provider>
  );
};

export const useThriftContext = () => useContext(ThriftContext);
