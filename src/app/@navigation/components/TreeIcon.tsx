import { AssetIcon } from '@/components/icons/AssetIcon';
import { ComponentIcon } from '@/components/icons/ComponentIcon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import { TypeEnum } from '@/config/enum';

interface TreeIconProps {
  type: TypeEnum;
}

export function TreeIcon({ type }: TreeIconProps) {
  switch (type) {
    case TypeEnum.LOCATION:
    case TypeEnum.SUB_LOCATION:
      return <LocationIcon />;
    case TypeEnum.ASSET:
    case TypeEnum.SUB_ASSET:
      return <AssetIcon />;
    case TypeEnum.COMPONENT:
      return (
        <ComponentIcon className="transition-colors group-hover:text-blue group-data-[selected=yes]:text-white" />
      );

    default:
      return null;
  }
}
