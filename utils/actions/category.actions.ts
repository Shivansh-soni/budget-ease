"use server";

import { Databases, ID } from "appwrite";
import Cookies from "js-cookie";
import { getSession } from "../db";
export const createCategory = async (payload: any) => {
  try {
    // client
    //   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    //   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    //   .setKey(process.env.APPWRITE_API_KEY!);
    // let users = new sdk.Users(client);
    const cookie = Cookies.get("session");
    console.log("cookie", cookie);
    // const session = req.cookies.session;
    // const dbId = process.env.APPWRITE_DB_ID!;
    // const collectionId = process.env.APPWRITE_DB_CATEGORIES_ID!;

    // if (!session) return { status: 401, message: "Unauthorized" };
    // const category = await db.createDocument(
    //   dbId,
    //   collectionId,
    //   ID.unique(),
    //   payload
    // );
    // return { status: 200, data: category };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
