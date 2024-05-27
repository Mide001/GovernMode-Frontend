import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import CommentsList from "./CommentsList";

const FetchComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const db = getFirestore(app);
    const fetchComments = async () => {
      try {
        const q = query(collection(db, "comments"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            address: data.address,
            content: data.comment,
            date: data.date.toDate().toLocaleString(),
          };
        });
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  if (loading) {
    return <div>...</div>;
  }

  return <CommentsList comments={comments} />;
};

export default FetchComment;
