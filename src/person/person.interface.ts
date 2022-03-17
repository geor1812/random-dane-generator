export interface IPerson {
  baseInfo?: IBaseInfo;
  cpr?: string;
  birthday?: string;
  address?: IAddress;
  phone?: string;
}

export interface IAddress {
  street: string;
  number: string;
  floor: string;
  door: Door;
  postalCode: string;
  townName: string;
}

export interface IBaseInfo {
  name: string;
  surname: string;
  gender: Gender;
}

export type Gender = 'male' | 'female';

export type Door = 'th' | 'tv' | 'mf';
