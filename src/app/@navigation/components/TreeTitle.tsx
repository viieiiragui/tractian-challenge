import { SensorStatus } from '@/components/SensorStatus';
import { AssetClass, type Asset } from '@/entities/Asset';
import { TreeIcon } from './TreeIcon';
import type { TreeViewProps } from './TreeView';

interface TreeTitleProps extends TreeViewProps {}

export function TreeTitle({ node }: TreeTitleProps) {
  const hasStatus = node.item instanceof AssetClass && node.item.status;

  return (
    <>
      <TreeIcon type={node.item.type} />
      <span className="px-1">{node.item.name}</span>
      {hasStatus && (
        <SensorStatus
          sensorType={(node.item as Asset).sensorType}
          status={(node.item as Asset).status}
        />
      )}
    </>
  );
}
