import {
  ChangeEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGlobal } from '@/contexts/GlobalContext';
import { companiesService } from '@/services/companiesService';
import { TreeView } from './TreeClass';

export function useNavigationController() {
  const { selectedCompany, selectedFilter, handleChangeFilter } = useGlobal();

  const [treeData, setTreeData] = useState<TreeView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const deferredSearchText = useDeferredValue(searchText);

  const hasTree = treeData !== null;

  const filteredTreeData = useMemo(() => {
    if (treeData) {
      if (deferredSearchText || selectedFilter) {
        return treeData.find(deferredSearchText, selectedFilter);
      }

      return treeData.root;
    }
    return [];
  }, [deferredSearchText, treeData, selectedFilter]);

  useEffect(() => {
    function loadData() {
      setIsLoading(true);

      const companyId = selectedCompany!.id;

      Promise.all([
        companiesService.getCompanyAssets(companyId),
        companiesService.getCompanyLocations(companyId),
      ])
        .then(([assetsResponse, locationsResponse]) => {
          const start = performance.now();

          const treeView = new TreeView(
            locationsResponse.toReversed(),
            assetsResponse.toReversed()
          );

          setTreeData(treeView);

          const end = performance.now();
          console.log('performance:', ((end - start) / 1000).toFixed(3));
        })
        .catch(console.error)
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (selectedCompany) {
      setSearchText('');
      handleChangeFilter(null);
      loadData();
    }
  }, [handleChangeFilter, selectedCompany]);

  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return {
    filteredTreeData,
    isLoading,
    hasTree,
    searchText,
    handleChangeSearch,
  };
}
