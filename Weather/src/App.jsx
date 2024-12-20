import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaWind } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";







function App() {
  let [city,setcity]=useState('')
  let [count,setcount]=useState(false)
  let [lat,setlat]=useState()
  let [lon,setlon]=useState()
  let [temperature,settemperature]=useState()
  let [name,setname]=useState()
  let [humidity,sethumidity]=useState()
  let [wind,setwind]=useState()
  let [cloud,setcloud]=useState()
  function firstData(){
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=63080258713e46518fc3fe2acb35b86c`)
      .then((res)=>res.json())
      .then((finalRes)=>{
      if(finalRes.length==0){
        toast.error('Please Write Correct City Name')
      }else{
        console.log(finalRes[0].lat)
        console.log(finalRes[0].lon)
        setlat(finalRes[0].lat)
        setlon(finalRes[0].lon)
        setname(city)
        }
      })
      
  }
  function secondData(){
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=Ghi38iYmWQGRaDNlNlhcCrpq2ILZcfRs`)
    .then((res)=>res.json())
    .then((finalRes2)=>{
    console.log(finalRes2.timelines.minutely[0].values.temperature)
    console.log(finalRes2)
    settemperature(finalRes2.timelines.minutely[0].values.temperature)
    sethumidity(finalRes2.timelines.minutely[0].values.humidity)
    setwind(finalRes2.timelines.minutely[0].values.windSpeed)
    setcloud(finalRes2.timelines.minutely[0].values.cloudCover)
    setcount(true)
    })
  }
  let getData=(event)=>{
    toast.info("Wait a few seconds")
    firstData()
    setTimeout(secondData,3000)
    
    
    
    
    
     
    
  
      
    setcount(false)
    event.preventDefault()
    setcity('')
  }
  return (
    <>
      <ToastContainer />
      <div className="heading">Weather App</div>
      <div className="main">   
    
        <form onSubmit={getData}>
          <input type="text" placeholder="Enter City Name" value={city} onChange={(e)=>setcity(e.target.value)}/>
          <button>Search</button>
        </form>
        <div className="Result">
            
            {count==true
            ?
                <>
                  <div className="result-heading">Today Weather</div>
                  <div className="result-info">
                    <div className="weather">
                       {temperature}oC
                    </div>
                    <div className="other-info">
                      <div className="extra-info">
                            <div className="info-heading">City</div>
                            <div className="info-result">{name}</div>
                      </div>
                      <div className="extra-info">
                            <div className="info-heading">humidity</div>
                            <div className="info-result">{humidity}</div>
                      </div>
                      <div className="extra-info">
                            <div className="info-heading">windSpeed</div>
                            <div className="info-result">{wind}  <FaWind/> </div>
                      </div>
                      <div className="extra-info">
                            <div className="info-heading">cloud</div>
                            <div className="info-result">{cloud} <FaCloud/></div>
                      </div>
                      
                    </div>
                  </div>
                </>
              :
              <div className="nodata">No Data Found</div>
            } 
            
        </div>
        
      </div> 
      <div className="note">
            <p>First Time When You Check Temperature You Donnot Get Result Due To Rules</p>
      </div>

    </>
  )
}

export default App
