import { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const articlesData = [
  { id: 3, title: "" },
];

export default function ArticleList() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const toggleBookmark = (article) => {
    setBookmarkedArticles((prevBookmarks) => {
      const newBookmarks = prevBookmarks.includes(article.id)
        ? prevBookmarks.filter(id => id !== article.id)
        : [...prevBookmarks, article.id];

      console.log('更新後的書籤:', newBookmarks); // 檢查更新後的狀態
      return newBookmarks;
    });
  };

  return (
    <div>
      <ul>
        {articlesData.map((article) => (
          <li key={article.id}>
            {article.title}
            <button onClick={() => toggleBookmark(article)} aria-label="收藏文章">
              {bookmarkedArticles.includes(article.id) ? (
                <FaBookmark style={{ color: '#ff0' }} />
              ) : (
                <FaRegBookmark style={{ color: '#000' }} />
              )}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {bookmarkedArticles.map((id) => {
          const article = articlesData.find(a => a.id === id);
          return article ? <li key={id}>{article.title}</li> : null; // 確保 article 存在
        })}
      </ul>
    </div>
  );
}
