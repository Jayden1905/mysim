"use client";
import { useRef } from "react";
import { AdminBlogheader } from "../Headers/adminBlogHeader";
import { Blog } from "@prisma/client";
import BlogCardEdit from "../Blog/blogCardEdit";

type AdminBlogProps = {
  posts: Blog[];
};

export function AdminBlogPage(props: AdminBlogProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="h-full w-full rounded-lg bg-white dark:bg-dark p-4">
        <AdminBlogheader searchInputRef={searchInputRef} />
        <section className="mt-10">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(20rem, 100%), 1fr))",
            }}
          >
            {props.posts.map((post, index) => (
              <BlogCardEdit post={post} key={index} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
