import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fs from "fs";

let options = {};
const credentialPath = "../../../credentials.json";
if (fs.existsSync(credentialPath)) {
  options.credential = admin.credential.cert(
    JSON.parse(fs.readFileSync(credentialPath, "utf-8"))
  );
}

admin.initializeApp(options);

export { admin, functions };
