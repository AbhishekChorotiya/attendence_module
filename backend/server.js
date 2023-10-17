const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const getmac = require("getmac");
const os = require("os");

const app = express();
var cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

    res.json(ip)
});
app.post("/find", (req, res) => {
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

    res.json(ip)
});

app.get("/mac", (req, res) => {
  function getWifiMacAddress() {
    const networkInterfaces = os.networkInterfaces();
    const wifiInterface =
      networkInterfaces["Wi-Fi"] || networkInterfaces["wlan0"]; // Adjust interface name based on your operating system

    if (wifiInterface) {
      const macAddress = wifiInterface[0].mac;
      return macAddress;
    } else {
      return "WiFi interface not found on this device.";
    }
  }

  const wifiMacAddress = getWifiMacAddress();

  if (wifiMacAddress !== "WiFi interface not found on this device.") {
    console.log("WiFi MAC Address: " + wifiMacAddress);
  } else {
    console.log(wifiMacAddress);
  }

  res.send(wifiMacAddress)
});

app.listen(port,()=>{
    console.log('listing on 5000')
})