import { FaRegComment } from "react-icons/fa";


export default function CommentButton({ commentCount = 0 }) {
  return (
    <button
    
    >
      <FaRegComment />
      <span>{commentCount}</span>
    </button>
  );
}

