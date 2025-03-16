import { Query } from "appwrite";
import { Databases } from "appwrite";
import { getClient } from "../db";

export const getIncome = async () => {
  const client = await getClient();
  const databases = new Databases(client);
  const income = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_TRANSACTIONS_ID!,
    [Query.equal("type", "Income")]
  );
  return income;
};

export const getLatestTransactions = async () => {
  const client = await getClient();
  const databases = new Databases(client);
  const transactions = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_TRANSACTIONS_ID!,
    [Query.orderAsc("createdAt"), Query.limit(5)]
  );
  return transactions;
};

export const getExpenses = async () => {
  const client = await getClient();
  const databases = new Databases(client);
  const expenses = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_DB_TRANSACTIONS_ID!,
    [Query.equal("type", "Expense")]
  );
  return expenses;
};

export const getTotalIncome = async () => {
  const income = await getIncome();
  const totalIncome = income.documents.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  return totalIncome;
};
