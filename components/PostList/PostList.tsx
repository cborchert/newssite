import PostType from "../../types/post";
import Card from "../Card/Card";
import PostPreview from "../PostPreview/PostPreview";

type PropTypes = {
  posts?: PostType[];
};

// TODO replace classnames with modular scss
const PostList = ({ posts = [] }: PropTypes) => (
  <div className="grid md:grid-cols-2 gap-5">
    {posts.map((post) => (
      <Card key={post.slug}>
        <PostPreview post={post} />
      </Card>
    ))}
  </div>
);

export default PostList;
