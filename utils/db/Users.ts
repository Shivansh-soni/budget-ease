import { Databases } from "appwrite";
import { getClient } from "../db";

export const getUser = async (userId: string) => {
  const client = await getClient();
  const databases = new Databases(client);
  const user = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_ID!,
    userId
  );
  return user;
};

export const createUser = async ({
  name,
  email,
  id,
  role,
}: {
  name: string;
  email: string;
  id: string;
  role: "user" | "admin";
}) => {
  const client = await getClient();
  const databases = new Databases(client);
  const user = await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_ID!,
    id,
    {
      name,
      email,
      role,
    }
  );
  return user;
};

export const updateUser = async ({
  id,
  userData,
}: {
  id: string;
  userData: any;
}) => {
  const client = await getClient();
  const databases = new Databases(client);
  const user = await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_ID!,
    id,
    userData
  );
  return user;
};
