import { Account, Client, Databases } from "appwrite";
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

export const getSession = async () => {
  const account = await getAccount();
  const promise = account.get();
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      return null;
    }
  );
  return promise;
};
export { ID } from "appwrite";
export const SignOut = async () => {
  const account = await getAccount();
  const session = await account.get();
  if (!session) return;
  const signout = await account.deleteSessions();
  if (signout) {
    toast.success("Logged out successfully");
  }
};
export const getDatabase = async () => {
  const client = await getClient();
  return new Databases(client);
};
