import bcrypt from "bcrypt";

const password = "exu1141";
const hash = await bcrypt.hash(password, 10);
console.log("Add this to your .env file:");
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
