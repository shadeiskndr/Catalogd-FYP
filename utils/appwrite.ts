import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
} from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const avatar = new Avatars(client);

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const userdataCol =
  process.env.NEXT_PUBLIC_APPWRITE_USERDATA_COLLECTION!;
export const mylibCol = process.env.NEXT_PUBLIC_APPWRITE_MYLIB_COLLECTION!;
export const wishlistCol =
  process.env.NEXT_PUBLIC_APPWRITE_WISHLIST_COLLECTION!;
export let userID: string;


//fetching account data
export const getSessionData = async () => {
  try {
    const data = await account.get();
    userID = data.$id;
    return data;
  } catch (error: unknown) {
    console.error("Error getting session data:", error);
  }
};
