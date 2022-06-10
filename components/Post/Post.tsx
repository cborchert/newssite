import Head from "next/head";
import PostType from "../../types/post";
import Layout from "../Layout/Layout";

type PropTypes = {
  post: PostType;
};

const Post = ({ post }: PropTypes) => (
  <Layout>
    <article>
      <Head>
        <title>{post.title}</title>
        {/* TODO Add meta */}
        {/* {post?.ogImage?.url && (
            <meta property="og:image" content={post.ogImage.url} />
          )} */}
      </Head>
      {/* TODO replace classnames with modular scss */}
      <header className="mb-10">
        <h1 className="my-0">{post.title}</h1>
        <h3 className="font-normal italic mt-0 text-base">{post.date}</h3>
      </header>
      <main dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </Layout>
);

export default Post;
