"use client";

import React, { useState } from "react";
import { FaComment, FaUser, FaThumbsUp, FaReply } from "react-icons/fa";
import { motion } from "framer-motion";
import { IComment } from "@/abstract/interface";
import toastMsg from "@/utils/toaster";
import axios from "axios";

interface CommentSectionProps {
  comments: IComment[];
  postId: string;
  currentUserId?: string | null;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  postId,
  currentUserId,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<IComment[]>(comments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  // Handle input changes
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  // Handle comment or reply submission
  const handleCommentSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId: currentUserId,
          text: parentId ? replyText : newComment,
          parentId: parentId || null,
        }),
      });

      if (response.ok) {
        const addedComment: IComment = (await response.json()).comment;
        if (parentId) {
          setCommentsList((prevComments) =>
            prevComments.map((comment) =>
              comment._id === parentId
                ? {
                    ...comment,
                    replies: [...(comment.replies || []), addedComment],
                  }
                : comment
            )
          );
          setReplyText("");
          setReplyingTo(null);
        } else {
          setCommentsList((prevComments) => [...prevComments, addedComment]);
          setNewComment("");
        }
      } else {
        toastMsg("error", "Failed to add comment");
      }
    } catch (error) {
      toastMsg("error", error!.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      axios
        .post(`/api/comments`, { action: "like", commentId })
        .then((res) => {
          if (res.status === 200) {
            const updatedComment: IComment = res.data;
            setCommentsList((prevComments) =>
              prevComments.map((comment) =>
                comment._id === updatedComment._id ? updatedComment : comment
              )
            );
          } else {
            toastMsg("error", "Failed to like comment");
          }
        })
        .catch((error) => {
          if(error.response.status === 401) {
            toastMsg("info", "Please log in to like comments");
          }else{
            toastMsg("error", "Failed to like comment");
          }
        });
    } catch (error) {
      toastMsg("error", "Failed to like comment");
    }
  };

  // Render a single comment (and its replies)
  const renderComment = (comment: IComment, isReply = false) => {
    if (!comment) return null;
    if (comment.comment) {
      comment = comment.comment;
    }
    return (
      <motion.div
        key={comment._id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#4fd1c5] ${
          isReply ? "ml-8 mt-2" : "mt-4"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaUser className="text-[#4fd1c5] mr-2" size={20} />
            <p className="text-sm text-[#4fd1c5] font-medium">
              {comment.username}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
        <p className="text-gray-300 mb-2">{comment.text}</p>
        <div className="flex items-center space-x-4">
          {
            comment.likedBy.includes(currentUserId!) ? (
              <button
                onClick={() => handleLikeComment(comment._id)}
                className="flex items-center text-[#4fd1c5] hover:text-gray-400 transition-colors duration-300"
              >
                <FaThumbsUp size={16} className="mr-1" />
                <span className="text-sm">{comment.likes}</span>
              </button>
            ) : (
              <button
                onClick={() => handleLikeComment(comment._id)}
                className="flex items-center text-gray-400 hover:text-[#4fd1c5] transition-colors duration-300"
              >
                <FaThumbsUp size={16} className="mr-1" />
                <span className="text-sm">{comment.likes}</span>
              </button>
            )
          }
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-[#222] rounded-xl shadow-2xl text-gray-200"
    >
      <h3 className="text-3xl font-bold mb-8 text-[#4fd1c5] border-b border-[#0694a2] pb-2">
        Comments
      </h3>
      <motion.div layout className="space-y-6">
        {commentsList.length > 0 ? (
          commentsList.map((comment) => renderComment(comment))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 italic text-center"
          >
            No comments yet. Be the first to share your thoughts!
          </motion.p>
        )}
      </motion.div>
      <motion.form
        onSubmit={(e) => handleCommentSubmit(e)}
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          rows={4}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4fd1c5] focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400"
          placeholder="Add a comment..."
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-[#0694a2] text-white rounded-lg font-semibold shadow-lg hover:bg-[#4fd1c5] focus:outline-none focus:ring-2 focus:ring-[#4fd1c5] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-lg"
        >
          <FaComment className="inline mr-2" size={18} />
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default CommentSection;
