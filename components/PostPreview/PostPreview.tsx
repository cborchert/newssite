import Link from "next/link";
import PostType from "../../types/post";

type PropTypes = {
  post?: PostType;
};

// TODO replace classnames with modular scss
const PostPreview = ({ post }: PropTypes) =>
  post?.slug ? (
    <div>
      <Link href={`/posts/${post.slug}`} key={post.slug}>
        <a>
          <h3 className="my-0">{post.title}</h3>
        </a>
      </Link>
      <h4 className="mt-0 font-normal">{post.date}</h4>
      {post.excerpt && <p>{post.excerpt}</p>}
    </div>
  ) : null;

export default PostPreview;
