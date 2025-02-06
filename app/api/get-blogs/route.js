import Blog from "@/model/blog";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const blogs = await Blog.find({});
    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong!",
    });
  }
};
