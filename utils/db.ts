export { ID } from "appwrite";
import { Account, Client, Databases, Query } from "appwrite";
import toast from "react-hot-toast";
const clientCache: { client: Client | null; promise: Promise<Client> | null } =
  { client: null, promise: null };

export const getClient = async () => {
  if (clientCache.client) return clientCache.client;
  if (!clientCache.promise) {
    clientCache.promise = new Promise((resolve) => {
      const client = new Client();
      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
      client.setEndpoint(endpoint!).setProject(projectId!);
      clientCache.client = client;
      resolve(client);
    });
  }
  return clientCache.promise;
};

export const getAccount = async () => {
  const client = await getClient();
  return new Account(client);
};

export const SignOut = async () => {
  try {
    const account = await getAccount();
    const signout = await account.deleteSessions();
    if (signout) {
      toast.success("Logged out successfully");
    }
  } catch (error) {
    console.error("Error signing out:", error);
    // No need to show an error toast as the user might not be signed in
  }
};

export const getDatabase = async () => {
  const client = await getClient();
  return new Databases(client);
};
