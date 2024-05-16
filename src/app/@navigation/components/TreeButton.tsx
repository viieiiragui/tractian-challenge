import { ReactNode } from 'react';

import { TypeEnum } from '@/config/enum';
import { useGlobal } from '@/contexts/GlobalContext';
import { type Asset } from '@/entities/Asset';
import { cn } from '@/utils/cn';
import type { TreeViewProps } from './TreeView';

interface TreeButtonProps extends TreeViewProps {
  children: ReactNode;
}

export function TreeButton({ node, level = 1, children }: TreeButtonProps) {
  const { selectedComponent, handleSelectComponent } = useGlobal();

  const isComponent = node.item.type === TypeEnum.COMPONENT;
  const isSelected = node.item.id === selectedComponent?.id;
  const isDisabled = !isComponent || isSelected;

  function handleClick() {
    handleSelectComponent(node.item as Asset);
  }

  return (
    <button
      className={cn(
        'group mt-0.5 flex w-full min-w-fit items-center whitespace-nowrap p-[1.5px] transition-colors first:mt-0',
        level > 1 && 'mt-0.5 pl-4 first:mt-1',
        !isDisabled && 'hover:bg-blue-100',
        isSelected && 'bg-blue text-white',
        isDisabled && 'pointer-events-none'
      )}
      onClick={handleClick}
      disabled={isDisabled}
      data-selected={isSelected ? 'yes' : 'no'}
    >
      {children}
    </button>
  );
}
