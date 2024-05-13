import mongoose from "mongoose";

export const electionAdminsModel = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "electionAdmins" }
);
export const electionAdminSchema =
  mongoose.models.electionAdmins ||
  mongoose.model("electionAdmins", electionAdminsModel);
