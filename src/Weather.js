import React, { useEffect, useState } from 'react'
import sun from './assests/sun.png'
import cloudy from './assests/cloudy.png'



const Weather = () => {
  const API_KEY = '7bc5683ec6c521aaf1d7ec855969a4f4'
  const [inputval,setInputval] = useState('salem')
  const [weather,setWeather] = useState('')
  const [Imgsrc,setImgsrc] = useState(sun)
  const [windspeed,setWindspeed] = useState('')
  const [Humidity,setHumidity] = useState('')
  const [cityval,setCityval] = useState('')
  const [emptyvalEroors,setemptyvalErrors] = useState(false)
  const [fetcherror,setfetcherror] =useState('')
  const [Country,setCountry] = useState('')
  const[fetchdata,setfetchdata] = useState([])

  useEffect(()=>{
    const fetchfunction = async() =>{
      try{
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=${API_KEY}&units=metric`
        const result = await fetch(URL)
        if(!result.ok) throw Error('City not found')
        const resdata = await result.json();
        console.log(resdata)
        const weather = Math.floor(resdata.main.temp) +'°C'
        setWeather(weather)
        if(resdata.main.temp < 30){
          setImgsrc(cloudy)
        }
        else{
          setImgsrc(sun)
  
        }
        setCountry(resdata.sys.country)
        setHumidity('Humidity :'+ resdata.main.humidity)
        setCityval(resdata.name)
     }
     catch(err){
  
      if(err.message === 'Failed to fetch'){
        setfetcherror('Please ensure internet connection')
      }
      else if(err.message === 'City not found' ){
        setfetcherror('City not found')
      }
     }
     
    }
    fetchfunction()
  },[])
  
  const Checkfunc = () => {
    const checkEmptyval = inputval
    if(checkEmptyval.length === 0){
      setemptyvalErrors(true)
    }
    else{
      fetchfunction()
    }
  }
  const fetchfunction = async() =>{
    try{
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=${API_KEY}&units=metric`
      const result = await fetch(URL)
      if(!result.ok) throw Error('City not found')
      const resdata = await result.json();
      console.log(resdata)
      const weather = Math.floor(resdata.main.temp) +'°C'
      setWeather(weather)
      if(resdata.main.temp < 30){
        setImgsrc(cloudy)
      }
      else{
        setImgsrc(sun)

      }
      setCountry(resdata.sys.country)
      setHumidity('Humidity :'+ resdata.main.humidity)
      setCityval(resdata.name)
   }
   catch(err){

    if(err.message === 'Failed to fetch'){
      setfetcherror('Please ensure internet connection')
    }
    else if(err.message === 'City not found' ){
      setfetcherror('City not found')
    }
   }
   
  }
   

  return (
    <div className="App-container">
      <p style={{textAlign:'center'}} className='error'>{emptyvalEroors ? 'Please Enter the city Name':''}</p>
      <p style={{textAlign:'center'}} className='error'>{fetcherror}</p>
    <div className='app-content'>
     <div>   
            <input 
            placeholder='Enter the city name' 
            className='input-box'
            value={inputval}
            onChange={(e)=>setInputval(e.target.value)}
            onClick={()=>{
              setemptyvalErrors(false)
              setfetcherror('')
            }}
            ></input>
            <div className='btn-div'>
                <button className='btn' onClick={()=>Checkfunc()}>Get Weather</button>
            </div>
     </div> 
      <div className='result-container'>
        <p className='city-name'>{cityval}</p>
            <img src={Imgsrc} alt='weather' width='100' height={''} className='IMG'></img>
            <p className='windspeed'>{}</p>
            <p className='weather'>{weather}</p>
            <p className='country'>{Country}</p>
            <p className='windspeed'>{windspeed}</p>
            <p className='humidity'>{Humidity}</p>
      </div>

    </div>
    
  </div>
  )
}

export default Weather