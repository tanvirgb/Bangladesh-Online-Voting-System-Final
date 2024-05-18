import mongoose from "mongoose";

export const electionAdminsModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  number: String,
});
export const electionAdminSchema =
  mongoose.models.admins || mongoose.model("admins", electionAdminsModel);
