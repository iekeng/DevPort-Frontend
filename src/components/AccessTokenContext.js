// AccessTokenContext.js
import React, { createContext, useContext, useState } from 'react';

const AccessTokenContext = createContext(null);

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (context === undefined) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};
