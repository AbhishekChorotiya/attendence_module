import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [ip,setIP] = useState('');

  useEffect(()=>{
    handleSubmit()
    const success = (pos)=>{
      setLatitude(Math.floor(pos.coords.latitude*1000))
      setLongitude(Math.floor(pos.coords.longitude*1000))
      console.log(Math.floor(pos.coords.latitude*1000),Math.floor(pos.coords.longitude*1000))
    }
  
    const err = () =>{
      console.log("error")
    }
  
    navigator.geolocation.getCurrentPosition(success,err);

  },[])



  const handleSubmit = async ()=>{

    const post_data = {
      latitude,longitude
    }

    const res = await fetch('/find',{
      method:'post',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post_data)
    })

    const data = await res.json()
    console.log(data)
    // alert(data)
    setIP(data);

  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Testing Geocoding and IP
        </a>
        <h1>{`Latitude: ${latitude}`}</h1>
        <h1>{`longitude: ${longitude}`}</h1>
        <h1>{`IP: ${ip}`}</h1>
      {/* <button onClick={handleSubmit}>Get my geoCode</button> */}
      </header>
    </div>
  );
}

export default App;
