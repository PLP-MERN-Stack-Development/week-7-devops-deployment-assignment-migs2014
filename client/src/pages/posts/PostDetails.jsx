

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Optional: add this if installed
import CommentSection from "@/components/CommentSection";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 space-y-4 animate-pulse">
        <Skeleton className="h-8 w-1/2 bg-gradient-to-r from-pink-200 via-slate-200 to-purple-200 rounded" />
        <Skeleton className="h-4 w-3/4 bg-gradient-to-r from-pink-100 via-slate-100 to-purple-100 rounded" />
        <Skeleton className="h-4 w-full bg-gradient-to-r from-pink-100 via-slate-100 to-purple-100 rounded" />
      </div>
    );
  }

  if (!post) return <p className="text-center mt-10 text-lg text-red-500">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10 px-2">
      <Card className="p-8 bg-white/90 shadow-2xl rounded-3xl border border-pink-200 relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-pink-200 via-purple-200 to-slate-200 rounded-full opacity-30 blur-2xl pointer-events-none" />
        <h1 className="text-4xl font-extrabold text-pink-700 mb-2 drop-shadow">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
            {post.category?.name || "Uncategorized"}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="prose prose-pink max-w-none text-gray-800 text-lg leading-relaxed pt-2">
          {post.content}
        </div>
      </Card>

      <div className="bg-white/80 rounded-2xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Comments</h2>
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
};

export default PostDetails;