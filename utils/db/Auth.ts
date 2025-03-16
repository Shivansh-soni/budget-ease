import { getAccount, getClient, ID } from "../db";
export const signIn = async (email: string, password: string) => {
  const account = await getAccount();
  await account.createEmailPasswordSession(`${email}`, `${password}`);
};

export const signUp = async (email: string, password: string, name: string) => {
  const account = await getAccount();
  const userID = ID.unique();

  await account.create(userID, email, password);
};

export const getSession = async () => {
  const account = await getAccount();
  const promise = account.get();
  promise.then(
    async function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      return null;
    }
  );
  return promise;
};

export const signOut = async () => {
  try {
    const account = await getAccount();
    await account.deleteSession("current");
  } catch (error) {
    console.log("Error signing out:", error);
    return true;
  }
};
