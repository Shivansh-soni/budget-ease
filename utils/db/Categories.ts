import { Databases, ID } from "appwrite";

import { Query } from "appwrite";
import { getClient } from "../db";
import { Category } from "@/app/user/dashboard/categories/page";

export const getCategories = async () => {
  const client = await getClient();
  const databases = new Databases(client);
  const categories = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
    [Query.equal("type", "expense")]
  );
  return categories;
};

export const getCategoryById = async (id: string) => {
  const client = await getClient();
  const databases = new Databases(client);
  const category = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
    id
  );
  return category;
};

export const createCategory = async (payload: Category) => {
  const client = await getClient();
  const databases = new Databases(client);
  const category = await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
    ID.unique(),
    payload
  );
  return category;
};

export const updateCategory = async (id: string, payload: Category) => {
  const client = await getClient();
  const databases = new Databases(client);
  const category = await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
    id,
    payload
  );
  return category;
};

export const deleteCategory = async (id: string) => {
  const client = await getClient();
  const databases = new Databases(client);
  const category = await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
    id
  );
  return category;
};
