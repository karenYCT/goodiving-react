import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const articlesData = [
  // { id: 1, title: "文章一", url: "https://example.com/article1" },
  // { id: 2, title: "文章二", url: "https://example.com/article2" },
  // { id: 3, title: "文章三", url: "https://example.com/article3" },
];

export default function ArticleList() {
  const [sharedArticle, setSharedArticle] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = (article) => {
    setSharedArticle(article);
    setShowShareModal(true); // 顯示分享小視窗
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setSharedArticle(null);
  };

  return (
    <div>
      <ul>
        {articlesData.map((article) => (
          <li key={article.id}>
            {article.title}
            <button onClick={() => handleShare(article)} aria-label="分享文章">
              <FaArrowUpRightFromSquare />
            </button>
          </li>
        ))}
      </ul>
      {showShareModal && (
        <div className="share-modal">
          <div className="modal-content">
            <p>{sharedArticle.title}</p>
            <p> <a href={sharedArticle.url} target="_blank" rel="noopener noreferrer">{sharedArticle.url}</a>
            </p>
            <button onClick={closeShareModal}>關閉</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .share-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
