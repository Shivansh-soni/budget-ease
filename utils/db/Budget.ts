import { Budget } from "@/app/user/dashboard/budget/page";
import { getClient } from "../db";

import { Databases, ID } from "appwrite";

export const getBudget = async () => {
  const client = await getClient();
  const databases = new Databases(client);
  const budget = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!
  );
  return budget;
};

export const getBudgetById = async (id: string) => {
  const client = await getClient();
  const databases = new Databases(client);
  const budget = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!,
    id
  );
  return budget;
};

export const createBudget = async (payload: Budget) => {
  const client = await getClient();
  const databases = new Databases(client);
  const budget = await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!,
    ID.unique(),
    payload
  );
  return budget;
};

export const updateBudget = async (id: string, payload: Budget) => {
  const client = await getClient();
  const databases = new Databases(client);
  const budget = await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!,
    id,
    payload
  );
  return budget;
};
