import { Collapsible } from '@/components/Collapsible';
import { cn } from '@/utils/cn';
import type { TreeViewNode } from '../TreeClass';
import { TreeButton } from './TreeButton';
import { TreeIcon } from './TreeIcon';
import { TreeTitle } from './TreeTitle';

export interface TreeViewProps {
  node: TreeViewNode;
  level?: number;
}

export function TreeView({ node, level = 1 }: TreeViewProps) {
  const incrementedLevel = level + 1;
  const hasNoChildren = node.children.length === 0;

  if (hasNoChildren) {
    return (
      <TreeButton node={node} level={level}>
        <TreeTitle node={node} />
      </TreeButton>
    );
  }

  return (
    <Collapsible
      className={cn('mt-0.5 first:mt-0', level > 1 && 'mt-0.5 first:mt-1')}
      title={<TreeTitle node={node} />}
      icon={<TreeIcon type={node.item.type} />}
    >
      {node.children.map((item) => (
        <TreeView
          key={`${node.item.id}-${item.item.id}`}
          node={item}
          level={incrementedLevel}
        />
      ))}
    </Collapsible>
  );
}
