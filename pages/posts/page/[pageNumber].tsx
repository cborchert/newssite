import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import PostList from "../../../components/PostList/PostList";
import { getAllPosts } from "../../../lib/api";
import { blogPostsPerPage } from "../../../lib/constants/site";
import PostType from "../../../types/post";

type PropTypes = {
  posts?: PostType[];
  currentPage: number;
  numberOfPages: number;
};

// TODO replace classnames with modular scss
const PostsArchivePage = ({
  posts = [],
  currentPage,
  numberOfPages,
}: PropTypes) => (
  <Layout>
    <PostList posts={posts} />
    <nav className="mt-8">
      <ul className="flex justify-between list-none m-0">
        <li>
          {currentPage > 1 ? (
            <Link href={`/posts/page/${currentPage - 1}`}>
              <a>Previous Page</a>
            </Link>
          ) : null}
        </li>
        <li>
          {currentPage < numberOfPages ? (
            <Link href={`/posts/page/${currentPage + 1}`}>
              <a>Next Page</a>
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  </Layout>
);

export default PostsArchivePage;

export const getStaticProps = async ({
  params,
}: {
  params: {
    pageNumber: string;
  };
}) => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "content",
  ]);

  const startIndex = (Number(params.pageNumber) - 1) * blogPostsPerPage;
  const endIndex = Number(params.pageNumber) * blogPostsPerPage;
  const numberOfPages = Math.ceil(posts.length / blogPostsPerPage);
  return {
    props: {
      posts: posts.slice(startIndex, endIndex),
      currentPage: Number(params.pageNumber),
      numberOfPages,
    },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  const numberOfPages = Math.ceil(posts.length / blogPostsPerPage);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  return {
    paths: pageNumbers.map((pageNumber) => {
      return {
        params: {
          pageNumber: pageNumber.toString(),
        },
      };
    }),
    fallback: false,
  };
}
