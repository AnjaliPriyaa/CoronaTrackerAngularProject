export class Data {
  active: number;
  confirmed: number;
  deaths: number;
  deltaconfirmed: number;
  deltadeaths: number;
  deltarecovered: number;
  lastupdatedtime: string;
  migratedother: number;
  recovered: number;
  state: string;
  statecode: string;
}

export class ChildData {
  statecode: string;
  state: string;
  districtData: DistrictData;
}

export class DistrictData {
  confirmed: number;
  active: number;
  id: string;
  name: string;
  statecode: string;
  districtData: Data;
}
