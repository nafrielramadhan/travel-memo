import * as arctic from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_REDIRECT_URI_DEV;

// ini kalau udah di deploy nanti ya! yg atas process.env.GOOGLE_REDIRECT_URI; apus dulu nanti
//   process.env.NODE_ENV === "production"
//     ? process.env.GOOGLE_REDIRECT_URI
//     : process.env.GOOGLE_REDIRECT_URI_DEV;

export const google = new arctic.Google(clientId, clientSecret, redirectURI);
