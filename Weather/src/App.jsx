import { useState } from 'react'
import './App.css'

function App() {


  return (
    <>
        <div className="heading">Weather App</div>
        <div className="search-container">
          <input type="text" placeholder="Enter City Name" />
          <button>Search</button>
        </div>
        <div className="Result">
            <div className="result-info">
                Temperature of
                <div className="city-name">Hafizabad</div>
                is
                <div className="temperature">25oC</div>
            </div>
        </div>
    </>
  )
}

export default App
