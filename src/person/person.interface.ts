export interface IPerson {
  name: string;
  surname: string;
  gender: Gender;
  cpr?: string;
  birthday?: string;
  address?: IAddress;
  phone?: string;
}

export interface IAddress {
  street: string;
  number: string;
  floor: string;
  door: string;
  postalCode: IPostalCode;
}

export interface IPostalCode {
  code: string;
  town: string;
}
export interface IBaseInfo {
  name: string;
  surname: string;
  gender: Gender;
}

export type Gender = 'male' | 'female';
