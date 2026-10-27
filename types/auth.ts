export type UserAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
};

export type UserHair = {
  color: string;
  type: string;
};

export type UserCompany = {
  department: string;
  name: string;
  title: string;
  address: UserAddress;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  birthDate: string;
  image: string;
  phone: string;
  address: UserAddress;
  role: string;
  company: UserCompany;
  university: string;
  height: number;
  weight: number;
  bloodGroup: string;
  eyeColor: string;
  hair: UserHair;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};
