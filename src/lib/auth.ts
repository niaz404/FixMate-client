import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/fixmate";
const client = new MongoClient(uri);
const db = client.db("fixmate");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "technician", "admin"],
        input: true,
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      area: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
