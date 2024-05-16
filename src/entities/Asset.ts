import { TypeEnum } from '@/config/enum';

export enum AssetSensorTypeEnum {
  ENERGY = 'energy',
  VIBRATION = 'vibration',
}

export enum AssetStatusEnum {
  OPERATION = 'operating',
  ALERT = 'alert',
}

export interface Asset {
  gatewayId?: string;
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorId?: string;
  sensorType: AssetSensorTypeEnum | null;
  status: AssetStatusEnum | null;
}

type AssetClassProps = Asset & { type: TypeEnum };

export class AssetClass implements AssetClassProps {
  id;
  locationId;
  name;
  parentId;
  sensorType;
  status;
  gatewayId;
  sensorId;
  type: TypeEnum;

  constructor(asset: Asset) {
    this.id = asset.id;
    this.locationId = asset.locationId;
    this.name = asset.name;
    this.parentId = asset.parentId;
    this.sensorType = asset.sensorType;
    this.status = asset.status;
    this.gatewayId = asset?.gatewayId;
    this.sensorId = asset?.sensorId;

    this.type = asset.parentId ? TypeEnum.SUB_ASSET : TypeEnum.ASSET;
    if (asset.sensorType) {
      this.type = TypeEnum.COMPONENT;
    }
  }
}
