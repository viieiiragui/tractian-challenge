'use client';

import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { GoldIcon } from '@/components/icons/GoldIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { TreeView } from './components/TreeView';
import { useNavigationController } from './useNavigationController';

export default function Navigation() {
  const {
    filteredTreeData,
    isLoading,
    hasTree,
    searchText,
    handleChangeSearch,
  } = useNavigationController();

  if (!hasTree) {
    return (
      <div className="w-full rounded-sm border">
        <div className="mt-32 flex items-center justify-center gap-2">
          {isLoading && <Loader className="h-10 w-10 text-blue" />}

          {!isLoading && (
            <>
              <strong className="text-lg font-semibold">
                Selecione uma Unidade
              </strong>
              <GoldIcon className="h-8 w-8 text-blue" />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-auto rounded-sm border">
      <div className="flex h-14 border-b">
        <Input
          className="my-auto"
          type="text"
          placeholder="Buscar Ativo ou Local"
          icon={<SearchIcon />}
          value={searchText}
          onChange={handleChangeSearch}
        />
      </div>

      <div className="flex-1 overflow-auto px-1 py-2">
        <div className="w-full min-w-fit">
          {filteredTreeData.map((item) => (
            <TreeView key={item.item.id} node={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
