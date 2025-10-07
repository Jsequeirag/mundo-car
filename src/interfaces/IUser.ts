export enum Country {
  Honduras = "HN",
  CostaRica = "CR",
  ElSalvador = "SV",
  Guatemala = "GT",
  Nicaragua = "NI",
  Panama = "PA",
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  workphone1?: number;
  workphone2?: number;
  mobilephone?: number;
  country?: Country;
  role?: string;
  createdDate?: string;
  password?: string;
  validationCode?: number;
}
export interface IUserRegistered {
  user: IUser;
  userExisted: boolean;
}
