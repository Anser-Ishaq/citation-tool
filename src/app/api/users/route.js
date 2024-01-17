import { ConnectDB } from "@/db/config";
import { UserModel } from "@/db/models/user.model";
import { NextResponse } from "next/server";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function GET(req, res, next) {
  try {
    await ConnectDB();
    console.log("Connected to database");
    const users = await UserModel.find({});
    res.statusCode = 200;
    console.log("User: ", users);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function POST(req, res, next) {
  const { username, email, password } = await req.json();
  await ConnectDB();

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  }); 
  if (existingUser) {
    return NextResponse.json(
      { message: "user already exists" },
      { status: "200" }
    );
  }
  const newuser = new UserModel({
    username,
    password,
    email,
  });
  console.log("newly added user", newuser);
  await newuser.save();
  return NextResponse.json({ message: "new user added", user: newuser });
}
