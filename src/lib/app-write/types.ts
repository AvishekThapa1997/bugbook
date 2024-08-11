import { Models } from "node-appwrite";

export type AppwriteUser = Models.User<Models.Preferences> | Models.Document;
