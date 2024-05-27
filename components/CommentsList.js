import React from "react";
import { UserIcon } from "../assets/ConstantIcons";
import Link from "next/link";

const CommentsList = ({ comments }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b border-gray-700">
            <div className="flex items-center mb-2">
              <UserIcon />
              <div className="ml-3">
                <h4 className="text-lg font-bold text-gray-200">
                  <Link
                    href={`https://sepolia.explorer.mode.network/address/${comment.address}`}
                  >
                    {comment.address.slice(0, 4)}...{comment.address.slice(-3)}
                  </Link>
                </h4>
                <span className="text-gray-300 text-sm">{comment.date}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;
