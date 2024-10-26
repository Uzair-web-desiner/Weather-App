import { useState } from 'react'
import './App.css'

function App() {
  let [city,setcity]=useState('')
  let [count,setcount]=useState(false)
  let [count2,setcount2]=useState(false)
  let [lat,setlat]=useState()
  let [lon,setlon]=useState()
  let [temperature,settemperature]=useState()
  let [name,setname]=useState()
  let getData=(event)=>{
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=63080258713e46518fc3fe2acb35b86c`)
    .then((res)=>res.json())
    .then((finalRes)=>{
    console.log(finalRes[0].lat)
    console.log(finalRes[0].lon)
    setlat(finalRes[0].lat)
    setlon(finalRes[0].lon)
    setcount(true)
    setname(city)
    })
  
  
    
    
    
    if(count){
      fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=QmoXPK7srAhGqu2uNrhLOoexqggsD7rz`)
      .then((res)=>res.json())
      .then((finalRes2)=>{
      console.log(finalRes2.timelines.minutely[0].values.temperature)
      settemperature(finalRes2.timelines.minutely[0].values.temperature)
      setcount2(true)
      setcount(false)
      console.log(count2)

  
      })
    }
  
      
    setcount2(false)
    event.preventDefault()
    setcity('')
  }
  return (
    <>
        <div className="heading">Weather App</div>
        <form onSubmit={getData}>
          <input type="text" placeholder="Enter City Name" value={city} onChange={(e)=>setcity(e.target.value)}/>
          <button>Search</button>
        </form>
        <div className="Result">
            
            {count2==true
            ?
                <div className="result-info">
                  Temperature of
                  <div className="city-name">{name}</div>
                  is
                  <div className="temperature">{temperature}</div>
                </div>
              :
              "No Data Found"
            } 
            
        </div>
    </>
  )
}

export default App
