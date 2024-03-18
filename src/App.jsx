import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './index.css'

const App = () => {
const [countries, setCountries]=useState([])
const [countryName, setCountryName]=useState(null)
const [value, setValue]=useState('')
const [countryInfo, setCountryInfo]=useState({flag:null,capital:null})
const [weather, setWeather]=useState({temp:'', code:null})
const api_key = import.meta.env.VITE_SOME_KEY

useEffect(() => {
Axios
.get('https://studies.cs.helsinki.fi/restcountries/api/all')
.then(response=>{ setCountries(response.data)})

},[])

let result=[]
result=countries.filter(country=>country.name.common.toLowerCase().startsWith(value.toLowerCase()))

useEffect(()=>{
if(result.length===1){
  
  setCountryName(result[0].name.common)
  
}else{
  setCountryName(null)
  }
},[countries, value])
useEffect(()=>{
if(countryName){
  Axios
  .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
     
  .then(response=>{
     const flag=response.data.flags.png
    const capital= response.data.capital[0]
    setCountryInfo({flag:flag,capital:'Capital city:'+ capital})
  })
    
}else{
  setCountryInfo({flag:null,capital:null})
}
},[countryName])


    

useEffect(()=>{
  if(value){
Axios
.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryInfo.capital}&units=Metric&appid=${api_key}`)
 .then(response=>{console.log(response.data)
 const temp=response.data.main.temp+'°C'
 const code=response.data.weather[0].icon
 setWeather({temp:temp, code:code})
 
})
  }else{
    setWeather({temp:'',code:null})
    setCountryInfo({flag:null,capital:null})
  }
},[countryInfo.capital, value])
console.log(weather.code)
const handleValue=(e)=>{ 
setValue(e.target.value)

}
return (
<div>
 <form >
 
 select:<input type="text" placeholder='country name' value={value} onChange={handleValue} />
 </form>
 
  {result.map(country => (
        <div key={country.name.common} >
        <span>{result.length<10?country.name.common:null}</span>
        
    {result.length < 10 && <button onClick={()=>setCountryName(country.name.common)}>Select</button>}
        </div>
      ))}

<div>
<img src={`${countryInfo.flag}`} alt="" />

</div>
<div> {countryInfo.capital}</div>

<div className='container'>
    <div className='weather'>
        <img src={`https://openweathermap.org/img/wn/${weather.code}@2x.png`} alt="Weather Icon" />
        <div className="data">
            <div className='element'>
                <div className="temp">{weather.temp}</div>
            </div>
            <div className='element'>
                <div className="humidity">{weather.temp}</div>
            </div>
        </div>
    </div>
</div>
</div>
     

)  
}
export default App