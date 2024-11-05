import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

export default function UserProfile() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(prev => !prev);
  };

  return (
    <div>
      <button onClick={toggleProfileModal} aria-label="會員中心">
        <FaRegCircleUser style={{ fontSize: '24px', color: '#000' }} />
      </button>

      {showProfileModal && (
        <div className="profile-modal">
          <div className="modal-content">
            <button onClick={toggleProfileModal}></button>
          </div>
        </div>
      )}

    </div>
  );
}
