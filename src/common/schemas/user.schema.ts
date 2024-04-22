export interface UserSchema {
  user_id: number | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface UserSchemaCreate {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UserSchemaLogin {
  email: string;
  password: string;
}
