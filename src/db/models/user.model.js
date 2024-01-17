import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema(
  {
    
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    citation: [{ type: mongoose.Schema.Types.ObjectId, ref: "CitationModel" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("UserModel", userSchema);
