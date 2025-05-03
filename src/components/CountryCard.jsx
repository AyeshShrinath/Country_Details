import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'

function CountryCard({ country }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const username = localStorage.getItem('user')
    if (username) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {}
      const user = allUsers[username]
      if (user?.favorites.includes(country.cca3)) {
        setIsFavorite(true)
      }
    }
  }, [country.cca3])

  const handleFavoriteToggle = () => {
    const username = localStorage.getItem('user')
    if (!username) return

    const allUsers = JSON.parse(localStorage.getItem('users')) || {}
    const user = allUsers[username]

    if (isFavorite) {
      user.favorites = user.favorites.filter((code) => code !== country.cca3)
    } else {
      user.favorites.push(country.cca3)
    }

    allUsers[username] = user
    localStorage.setItem('users', JSON.stringify(allUsers))
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <Link to={`/country/${country.cca3}`}>
        <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover" />
        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{country.name.common}</h2>
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault() // Prevent navigation when clicking the heart
              handleFavoriteToggle()
            }}
            className="text-2xl"
          >
            <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-400'} />
          </button>
        </div>
      </Link>
    </div>
  )
}

export default CountryCard
