import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);

export interface UserInfoResponse {
  email: string;
  name: string;
  picture: string;
}
