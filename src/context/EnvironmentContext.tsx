import React, { createContext, useContext, useState, ReactNode } from 'react';

type Environment = 'demo' | 'live';

interface EnvironmentContextType {
  environment: Environment;
  toggleEnvironment: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] = useState<Environment>('demo');

  const toggleEnvironment = () => {
    setEnvironment(prev => prev === 'demo' ? 'live' : 'demo');
  };

  return (
    <EnvironmentContext.Provider value={{ environment, toggleEnvironment }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}
