import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { app } from "../firebase/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Notification from "./Notification";
import { config } from "../config/config";
import { getAccount } from "@wagmi/core";


const AddComment = () => {
  const router = useRouter();
  const { id } = router.query;

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  const [connectedWallet, setConnectedWallet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const db = getFirestore(app);
    const commentRef = collection(db, "comments");

    try {
      const commentData = {
        id: id,
        address: connectedWallet,
        date: new Date(),
        comment: comment,
      };

      console.log("Router ID: ", id);

      await addDoc(commentRef, commentData);

      setNotification({
        message: "Comment added successfully",
        type: "success",
      });

      setComment("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding comment: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const acccount = getAccount(config);
    setConnectedWallet(acccount.address);
  }, []);

  return (
    <div className="mx-auto mt-10">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-400 text-sm font-bold mb-2"
          >
            Add a Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none shadow appearance-none border border-[#D7FF00] rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
            rows="5"
            placeholder="Write your comment here..."
          ></textarea>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-[#D7FF00] hover:bg-[#828b4c] text-gray-800 font-bold py-2 px-4 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
