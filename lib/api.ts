import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { getLocalizedDateString } from "./dateUtils";

const postsDirectory = join(process.cwd(), "content/_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: {
    [key: string]: string;
  } = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    // handle slug
    if (field === "slug") {
      post[field] = realSlug;
    }
    // handle content
    if (field === "content") {
      post[field] = content;
    }
    // handle excerpt
    if (field === "excerpt") {
      if (!data.excerpt) {
        // get the first 50 words of the content
        post[field] = content.split(" ").slice(0, 50).join(" ");
        return;
      }
    }
    // handle date
    if (field === "date") {
      if (!!data.date) {
        post[field] = getLocalizedDateString(data.date);
        return;
      }
    }
    // handle everything else
    if (typeof data[field] !== "undefined") {
      post[field] = data[field];
    }
  });

  return post;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
