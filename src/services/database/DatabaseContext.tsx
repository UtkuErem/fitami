import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRealm } from './config';
import { DatabaseService } from './databaseService';

// Create a context for the database service
interface DatabaseContextType {
  databaseService: DatabaseService | null;
  isLoading: boolean;
}

const DatabaseContext = createContext<DatabaseContextType>({
  databaseService: null,
  isLoading: true,
});

// Create a provider component
interface DatabaseProviderProps {
  children: React.ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const realm = useRealm();
  const [databaseService, setDatabaseService] = useState<DatabaseService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (realm) {
      const service = new DatabaseService(realm);
      setDatabaseService(service);
      setIsLoading(false);
    }
  }, [realm]);

  return (
    <DatabaseContext.Provider value={{ databaseService, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Create a hook to use the database context
export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
