import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [ip, setIP] = useState("");
  const [mac, setMac] = useState("");
  const [attendanceDevices, setAttendanceDevices] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/mac")
      .then((response) => {
        setMac(response.data);
        console.log("Mac Address :", response.data);
      })
      .catch((error) => {
        console.error("Error in getting mac:", error);
      });
  }, []);

  const startAttendance = () => {
    axios
      .get("http://localhost:5000/start-attendance")
      .then((response) => {
        setAttendanceDevices(response.data.devices);
        console.log(
          "Attendance started. Detected devices:",
          response.data.devices
        );
      })
      .catch((error) => {
        console.error("Error starting attendance:", error);
      });
  };

  useEffect(() => {
    handleSubmit();
    const success = (pos) => {
      setLatitude(Math.floor(pos.coords.latitude * 1000));
      setLongitude(Math.floor(pos.coords.longitude * 1000));
      console.log(
        Math.floor(pos.coords.latitude * 1000),
        Math.floor(pos.coords.longitude * 1000)
      );
    };

    const err = () => {
      console.log("error");
    };

    navigator.geolocation.getCurrentPosition(success, err);
  }, []);

  const handleSubmit = async () => {
    const post_data = {
      latitude,
      longitude,
    };

    const res = await fetch("/find", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post_data),
    });

    const data = await res.json();
    console.log(data);
    // alert(data)
    setIP(data);
  };

  return (
    <div className="App">
      <div>
        <button onClick={startAttendance}>Start Attendance</button>
        <h1>{mac}</h1>
        <h2>Detected Devices:</h2>
        {attendanceDevices.map((a) => (
          <a>
            <br></br>
            {a[0]} {a[1]} {a[3]}
          </a>
        ))}
      </div>
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
        <h1>Mac {`: ${mac}`}</h1>
        {/* <button onClick={handleSubmit}>Get my geoCode</button> */}
      </header>
    </div>
  );
}

export default App;
