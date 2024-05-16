'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  AssetSensorTypeEnum,
  AssetStatusEnum,
  type Asset,
} from '@/entities/Asset';
import type { Company } from '@/entities/Company';

export type Filter = AssetSensorTypeEnum | AssetStatusEnum;

interface GlobalContextProps {
  selectedCompany: Company | null;
  handleChangeCompany: (company: Company) => void;
  selectedFilter: Filter | null;
  handleChangeFilter: (filter: Filter | null) => void;
  selectedComponent: Asset | null;
  handleSelectComponent: (component: Asset) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

export function GlobalContextProvider({ children }: PropsWithChildren) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Asset | null>(
    null
  );

  const handleChangeCompany = useCallback((company: Company) => {
    setSelectedComponent(null);
    setSelectedCompany(company);
  }, []);

  const handleChangeFilter = useCallback((filter: Filter | null) => {
    setSelectedFilter((prevState) => (filter !== prevState ? filter : null));
  }, []);

  const handleSelectComponent = useCallback((component: Asset) => {
    setSelectedComponent(component);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        selectedCompany,
        handleChangeCompany,
        selectedFilter,
        handleChangeFilter,
        selectedComponent,
        handleSelectComponent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
