import BlogOverview from "@/components/blog-overview";
import Link from "next/link";

const fetchBlogs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store"
    });
    const result = await res.json();
    return result?.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

const Blogs = async () => {
  const blogList = await fetchBlogs();
  console.log(blogList);
  return (
    <div>
      <h3 className="text-center my-4 text-xl">Manage Your Blogs</h3>
      <section>
        <BlogOverview blogList={blogList} />
      </section>
    </div>
  );
};

export default Blogs;
