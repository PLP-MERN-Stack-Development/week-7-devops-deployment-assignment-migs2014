

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch {
        toast.error("Failed to load comments");
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(`/comments/${postId}`, { content });
      setComments((prev) => [...prev, res.data]);
      setContent("");
      toast.success("Comment added 💬");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl p-6 shadow-lg border border-pink-100">
      <h3 className="text-xl font-bold text-pink-700 flex items-center gap-2">
        <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4.39-1.13l-3.02.67a1 1 0 01-1.18-1.18l.67-3.02A8.96 8.96 0 012 10c0-4.418 3.134-8 7-8s7 3.582 7 8z"></path></svg>
        Comments
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-400 italic">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-3">
          {comments.map((cmt) => (
            <div
              key={cmt._id}
              className="border border-pink-100 rounded-xl p-3 text-sm bg-white/80 flex items-start gap-2 shadow-sm"
            >
              <span className="font-semibold text-pink-600">{cmt.author?.username}:</span>
              <span className="text-gray-700">{cmt.content}</span>
            </div>
          ))}
        </div>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <Input
            placeholder="Leave a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 rounded-full border-pink-200 focus:border-pink-400"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-green-800 text-white rounded-full px-6"
          >
            {loading ? "Posting..." : "Send"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;