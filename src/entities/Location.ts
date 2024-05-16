import { TypeEnum } from '@/config/enum';

export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

type LocationClassProps = Location & { type: TypeEnum };

export class LocationClass implements LocationClassProps {
  id;
  name;
  parentId;
  type: TypeEnum;

  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
    this.parentId = location.parentId;
    this.type = location.parentId ? TypeEnum.SUB_LOCATION : TypeEnum.LOCATION;
  }
}
