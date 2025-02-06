import Blog from "@/model/blog";
import connectToDB from "@/utils/db";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract data from the request
    const extractBlogData = await req.json();
    const { title, description, author } = extractBlogData;

    // Validate using Joi
    const { error } = AddNewBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Save data in the database
    const newlyCreatedBlog = await Blog.create({
      title,
      description,
      author: author || "Anonymous", // Default author if not provided
    });

    if (newlyCreatedBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog Successfully Added!",
        data: newlyCreatedBlog, // Include created blog data for confirmation
      });
    }
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};
