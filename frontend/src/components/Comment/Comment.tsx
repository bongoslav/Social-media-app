import { useEffect, useState } from "react";
import IComment from "../../interfaces/Comment";
import IUser from "../../interfaces/User";
import { fetchUser } from "../../services/userServices";

export default function Comment({ _id, author, content, createdAt }: IComment) {
  const [commentAuthor, setCommentAuthor] = useState<IUser | null>(null);

  const formatDate = (date: Date) => {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthIndex = date.getUTCMonth();
    const year = String(date.getUTCFullYear()).slice(-2);

    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthAbbreviation = monthAbbreviations[monthIndex];

    return `${hours}:${minutes} | ${day}-${monthAbbreviation}-${year}`;
  };

  useEffect(() => {
    fetchUser(author).then((user) => setCommentAuthor(user));
  }, [author]);

  return (
    <div key={_id}>
      <h2>{commentAuthor?.username}</h2>
      <h3>{content}</h3>
      <h3>{formatDate(new Date(createdAt))}</h3>
    </div>
  );
}
