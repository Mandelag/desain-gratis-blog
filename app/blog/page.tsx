import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
      <br />
      <p className="text mb-8 tracking-tighter">
        My{" "}
        <Link href="https://mandelag.blogspot.com/" target="_blank">
          legacy blogspot
        </Link>
      </p>
    </section>
  );
}
