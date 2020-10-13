import React, { useState, useEffect } from 'react'
import data from './components/data'
import './App.css'
import Searchbar from './components/Searchbar'


function App() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query === "") {
      setSuggestions([])
    }
    else {

      let val = data.filter((item) => item.country.toLowerCase().indexOf(query) !== -1 ? true : false)
        .map((item) => item.country)
      setSuggestions(val)
    }
    setLoading(false)
  }, [query])
console.log(suggestions)
  return (
    <div className="App">
      <h1>Search Countries</h1>
      <Searchbar loading={loading} setLoading={setLoading} value={query} onChange={(val) => setQuery(val)}
        suggestions={suggestions} />
    </div>
  );
}

export default App;
