import { ConnectDB } from "@/db/config";
import { CitationModel } from "@/db/models/citation.model";
import { NextResponse } from "next/server";
export async function POST(req, res, next) {
  const { authors, title, publicationDate } = await req.json();
  //   console.log(data);
  await ConnectDB();
  const newCitation = new CitationModel({
    authors,
    title,
    publicationDate,
  });
  console.log(newCitation);
  await newCitation.save();
  return NextResponse.json({ message: "citation added", data: newCitation });
}
