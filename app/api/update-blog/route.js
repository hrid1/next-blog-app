import Blog from "@/model/blog";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");
    if (!blogId) {
      return NextResponse.json({
        success: false,
        message: "Id not Valid!",
      });
    }

    // TODO: data validation with joi
    //extract the title and descrtion form req body
    const { title, description } = await req.json();

    // update blog by id
    const updateBlog = await Blog.findOneAndUpdate(
      {
        _id: blogId,
      },
      { title, description },
      { new: true }
    );

    if (updateBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog is update Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};
