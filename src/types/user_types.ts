export interface NewUserData {
    name_user: string;
    email: string;
    password_user: string;
}

export interface NewUserDataUpdate {
    name_user?: string;
    email?: string;
    password_user?: string;
}

export interface UserLoginData {
  id: string;
  email: string;
  password_user: string;
}

export interface GetUserData {
  name_user: string;
  email: string;
  status_user: string;
}