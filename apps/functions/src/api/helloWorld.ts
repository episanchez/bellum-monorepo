import { onRequest } from "firebase-functions/v2/https";

export const helloWorld = onRequest((_, res) => {
  res.send("Hello World !");
});
