import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

export default function CommentList() {
  const [comments, setComments] = useState([
    "這是第一則留言",
    
  ]);

  const handleDelete = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div>
      <ul>
        {comments.map((_, index) => (
          <li key={index}>
            <button onClick={() => handleDelete(index)} aria-label="刪除留言">
              <FaRegTrashCan style={{ color: '#000' }} /> {/* 這裡可以根據需要調整顏色 */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
