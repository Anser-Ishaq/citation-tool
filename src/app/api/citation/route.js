import { ConnectDB } from "@/db/config";
import { CitationModel } from "@/db/models/citation.model";
import { UserModel } from "@/db/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await ConnectDB();

//   make page and page size dynamic
  const page = parseInt(req.query?.page) || 1;
  const pageSize = parseInt(req.query?.pageSize) || 10;

  try {
    const totalCitations = await CitationModel.countDocuments({});
    console.log(totalCitations);
    const totalPages = Math.ceil(totalCitations / pageSize);

    if (page < 1 || page > totalPages) {
      return NextResponse.json({ message: "Invalid page number" });
    }

    const citations = await CitationModel.find({})
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return NextResponse.json({
      message: "Get paginated references",
      citations,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function POST(req, res, next) {
  const { authors, title, publicationDate, userId } = await req.json();
  await ConnectDB();
  const newCitation = new CitationModel({
    authors,
    title,
    publicationDate,
    user: userId,
  });
  console.log("citation data", newCitation);
  await newCitation
    .save()
    .then(async (savedCitation) => {
      console.log("citation saved", savedCitation);
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { citation: savedCitation._id } },
        { new: true }
      ).populate("citation");

      console.log("User's citations updated:", updatedUser);
    })
    .catch((err) => {
      console.error(err);
    });

  return NextResponse.json({ message: "citation added", data: newCitation });
}
