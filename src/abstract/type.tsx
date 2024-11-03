import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

type authError = {
  name?: string;
  email?: string;
  password?: string;
};

export type CustomUser = {
  login_key?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: {
    url?: string | null;
    filename?: string | null;
  };
  role?: string | null;
  _id?: string | null;
  id?: string | null;
  username?: string | null;
  usertype?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  status?: boolean | null;
  userdata?: any | null;
};

export type CustomSession = Session & {
  user?: CustomUser | null;
  expires?: string | null;
};

export type { authError };

export type ResourcesError = {
  resourceName?: string;
  description?: string;
  image?: string;
  url?: string;
  imageCredit?: string;
};

export type BlockKeys =
  | "block_1"
  | "block_2"
  | "block_3"
  | "block_4"
  | "block_5"
  | "block_6"
  | "block_7";