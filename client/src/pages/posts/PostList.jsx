import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Posts</h2>
        <Button onClick={() => navigate("/dashboard/create")}>New Post</Button>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
