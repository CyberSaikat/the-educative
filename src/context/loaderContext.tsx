import { createContext } from 'react';

interface LoaderContext {
  loader: boolean;
  setLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContext>({
  loader: false,
  setLoading: () => {},
});

const LoaderProvider = ({ children, value }: { children: React.ReactNode; value: LoaderContext }) => {
  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderProvider, LoaderContext };