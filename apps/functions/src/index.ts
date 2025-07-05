import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const nextServer = onRequest(
  { timeoutSeconds: 15, memory: "1GiB", region: "europe-west1" },
  async (req, res) => {
    // 🛈 Ce handler est remplacé par Next.js lors du déploiement (adapter-firebase).
    res.status(200).send("Next.js server placeholder");
  }
);

export const helloWorld = onRequest((req, res) => {
  res.send("Hello World !");
});
