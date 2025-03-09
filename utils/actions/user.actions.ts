"use server";

import { Databases, ID, Permission, Role } from "appwrite";
import { getAccount, getClient } from "../db";

export const getUser = async () => {
  try {
    const account = await getAccount();
    if (!account) return null;
    const client = account.client;
    const database = new Databases(client);
    const dbId = process.env.APPWRITE_DB_ID!;
    const collectionId = process.env.APPWRITE_DB_USERS_ID!;
    const user = await database.listDocuments(dbId, collectionId);
    return JSON.stringify(user);
  } catch (error: any) {
    console.log(error?.message);
    return null;
  }
};

export const createUser = async ({
  name,
  email,
  role = "user",
  id,
}: {
  name: string;
  email: string;
  role: "user" | "admin";
  id: string;
}) => {
  try {
    const account = await getAccount();
    const client = account.client;
    const database = new Databases(client);
    const dbId = process.env.APPWRITE_DB_ID!;
    const collectionId = process.env.APPWRITE_DB_USERS_ID!;
    const user = await database.createDocument(dbId, collectionId, id, {
      name,
      email,
      role,
    });
    return JSON.stringify(user);
  } catch (error: any) {
    console.log("error", error?.message);
    return null;
  }
};
