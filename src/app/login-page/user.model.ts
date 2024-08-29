// user.model.ts
export interface User {
  first_name: string;
  surname: string;
  email: string;
  password: string;
  date: string;
  gender: string;
  userIcon?: string; // Optional field for storing the image in base64
  isAdmin: boolean;
  mobileNumber?: string | null;
  birthDate?: string | null;
  age?: number | null;
}
