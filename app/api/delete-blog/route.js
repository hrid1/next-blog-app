import Blog from "@/model/blog";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    await connectToDB();
    // get id from query paramiter
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog ID is required",
        },
        { status: 400 }
      );
    }
    const result = await Blog.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Blog Successfully Deleted",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Blog Not Deleted error",
    });
  }
};
