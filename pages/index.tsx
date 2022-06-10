import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import PostList from "../components/PostList/PostList";
import { getAllPosts } from "../lib/api";
import { blogPostsPerPage } from "../lib/constants/site";
import PostType from "../types/post";

type PropTypes = {
  posts?: PostType[];
  showMore?: boolean;
};

const Index = ({ posts = [], showMore }: PropTypes) => (
  <Layout>
    <PostList posts={posts} />
    {showMore ? (
      <div className="my-12 text-center flex justify-center">
        <Button href="/posts/page/2">Show More</Button>
      </div>
    ) : null}
  </Layout>
);

export default Index;

export const getStaticProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "content",
  ]);

  return {
    props: {
      posts: posts.slice(0, blogPostsPerPage),
      showMore: posts.length > blogPostsPerPage,
    },
  };
};
