import mongoose from "mongoose";
const CitationSchema = new mongoose.Schema({
  // Common Fields

  authors: [{ type: String }], // Array of author names
  title: { type: String, required: true },
  publicationDate: { type: Date },

  // Book-specific Fields
  publisher: { type: String },
  edition: { type: String },
  placeOfPublication: { type: String },
  isbn: { type: String },

  // Article-specific Fields
  journalName: { type: String },
  volume: { type: Number },
  issue: { type: Number },
  pageRange: { type: String },

  // Website-specific Fields
  url: { type: String },
  accessDate: { type: Date },

  //   doi: { type: String },
  //   database: { type: String },
  //   medium: { type: String },
  //   citationStyle: {
  //     type: String,
  //     enum: ["APA", "MLA", "Chicago"],
  //     default: "APA",
  //   },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  userId: { type: String },
  
});

export const CitationModel = mongoose.model("CitationModel", CitationSchema);
