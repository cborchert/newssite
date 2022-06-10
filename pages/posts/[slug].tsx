import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import Post from "../../components/Post/Post";
import PostType from "../../types/post";

type PropTypes = {
  post: PostType;
};

const SinglePostPage = ({ post }: PropTypes) => {
  const router = useRouter();
  if (router.isFallback) return "Loading...";
  if (!router.isFallback && !post?.slug) return "Error";
  return <Post post={post} />;
};

export default SinglePostPage;

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
