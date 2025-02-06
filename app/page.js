import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg min-h-screen flex items-center justify-center flex-col gap-4">
      <h1>Welcome to Dev Blog</h1>
      <Link
        className="bg-white px-3.5 py-2 rounded text-black font-semibold"
        href={"/blogs"}
      >
        Explore Blogs
      </Link>
    </div>
  );
}
