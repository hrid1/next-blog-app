"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import AllBlogs from "../all-blogs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const initialFormData = {
  title: "",
  description: "",
  author: "Hero",
};
const BlogOverview = ({ blogList }) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  const { toast } = useToast();
  const router = useRouter();
  // handle page refresh after add data
  useEffect(() => {
    router.refresh();
  }, []);
  // handle save blog
  const handleSaveBlog = async () => {
    console.log("blog data", blogFormData);
    try {
      setLoading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      console.log(result);
      if (result.success) {
        setBlogFormData(initialFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        router.refresh();
        toast({
          title: result?.message,
        });
      } else {
        console.log(result?.message);
        toast({
          description: result?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // handle delete blog
  const handleDeleteBlog = async (blogId) => {
    console.log(blogId);
    const res = await fetch(`/api/delete-blog?id=${blogId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log(result);
    // console.log(res);
    if (result.success) {
      router.refresh();
      toast({
        title: result.message,
      });
      
    } else {
    }
  };
  return (
    <div className="container mx-auto">
      <section className="flex items-center justify-between">
        <h3 className="text-3x font-semibold">Blogs Overview</h3>

        {/* add blog */}
        <AddNewBlog
          openBlogDialog={openBlogDialog}
          setOpenBlogDialog={setOpenBlogDialog}
          loading={loading}
          blogFormData={blogFormData}
          setBlogFormData={setBlogFormData}
          handleSaveBlog={handleSaveBlog}
        ></AddNewBlog>
      </section>

      <div>All Blogs</div>
      <sectio className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
        {blogList.map((blog, idx) => (
          <Card key={idx} className="h-60 relative">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{blog.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center absolute bottom-0 w-full">
              <Button>Update</Button>
              <Button onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </sectio>
    </div>
  );
};

export default BlogOverview;
