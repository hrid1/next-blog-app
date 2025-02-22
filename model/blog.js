import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
  title: {
    type:  String,
    required: true,
  },
  description: {
    type:  String,
    required: true,
  },
  author: {
    type:  String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
