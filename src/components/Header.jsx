import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import React from 'react';


function Header({ onToggleFavorites }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showFavorites, setShowFavorites] = useState(false);

  const handleFavoritesClick = () => {
    const newState = !showFavorites;
    setShowFavorites(newState);
    onToggleFavorites(newState);
  };

  return (
    <header className="bg-gray-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={handleFavoritesClick}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            showFavorites ? 'bg-gray-900' : 'bg-gray-800'
          } hover:opacity-90`}
        >
          <FaHeart className="text-xl" />
          {showFavorites ? 'Show All Countries' : 'View Favorites'}
        </button>
      </div>
      <h1 className="text-2xl font-bold">Country Book</h1>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span>👋 Welcome, {user.username}</span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
