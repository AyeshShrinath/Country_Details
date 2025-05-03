import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import CountryCard from '../components/CountryCard'
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from '../services/api'

function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [topRegions, setTopRegions] = useState([])
  const [topLanguages, setTopLanguages] = useState([])

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCountries()
      setCountries(data)
      setFilteredCountries(data)

      // Calculate top 5 regions
      const regionCounts = data.reduce((acc, country) => {
        acc[country.region] = (acc[country.region] || 0) + 1
        return acc
      }, {})
      const sortedRegions = Object.entries(regionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([region]) => region)
      setTopRegions(sortedRegions)

      // Calculate top 5 languages
      const languageCounts = data.reduce((acc, country) => {
        Object.values(country.languages || {}).forEach((language) => {
          acc[language] = (acc[language] || 0) + 1
        })
        return acc
      }, {})
      const sortedLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([language]) => language)
      setTopLanguages(sortedLanguages)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let results = countries

    if (showFavorites) {
      const username = localStorage.getItem('user')
      const allUsers = JSON.parse(localStorage.getItem('users')) || {}
      const user = allUsers[username]
      if (user) {
        results = results.filter((country) => user.favorites.includes(country.cca3))
      }
    }

    // Search by name
    if (searchQuery) {
      results = results.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by region
    if (selectedRegion) {
      results = results.filter(
        (country) => country.region === selectedRegion
      )
    }

    // Filter by language
    if (selectedLanguage) {
      results = results.filter((country) =>
        Object.values(country.languages || {}).includes(selectedLanguage)
      )
    }

    setFilteredCountries(results)
  }, [searchQuery, selectedRegion, selectedLanguage, countries, showFavorites])

  return (
    <div>
      <Header onToggleFavorites={setShowFavorites} />
      <div className="max-w-6xl mx-auto px-4">
        <SearchBar onSearch={setSearchQuery} />
        <FilterBar
          onRegionChange={setSelectedRegion}
          onLanguageChange={setSelectedLanguage}
          regions={topRegions}
          languages={topLanguages}
        />
        <div id="country-list" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))
          ) : (
            <p className="text-center col-span-full">No Countries Found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
