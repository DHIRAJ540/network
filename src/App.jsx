import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const Card = ({ title, data }) => {
  const [closed, setClosed] = useState(true);
  return (
    <div className="card">
      <div className="card_header">
        <h3>{title}</h3>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setClosed(!closed);
          }}
          className={`close ${!closed ? "rotate" : ""}`}
        >
          <MdOutlineClose size={24} />
        </div>
      </div>
      <div className={`card_body ${closed ? "closed" : ""}`}>
        <div className="card_item">
          <h4>Temperature</h4>
          <p>{data.field1}</p>
        </div>
        <div className="card_item">
          <h4>Humidity</h4>
          <p>{data.field2}</p>
        </div>
        <div className="card_item">
          <h4>Current</h4>
          <p>{data.field3}</p>
        </div>
        <div className="card_item">
          <h4>Voltage</h4>
          <p>{data.field4}</p>
        </div>
        <div className="card_item">
          <h4>Lux Intensity</h4>
          <p>{data.field5}</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  let [mainData, setMainData] = useState({});
  let [subData1, setSubData1] = useState({});
  let [subData2, setSubdata2] = useState({});

  const getData = async () => {
    const data = await axios.get(
      `https://api.thingspeak.com/channels/1748949/feeds.json?results=2`
    );
    const data2 = await axios.get(
      `https://api.thingspeak.com/channels/1748954/feeds.json?results=2`
    );
    const data3 = await axios.get(
      `https://api.thingspeak.com/channels/1748955/feeds.json?results=2`
    );

    setMainData(data);
    setSubData1(data2);
    setSubdata2(data3);
  };

  useEffect(() => {
    getData();
    console.log(mainData);
    console.log("data2", subData1);
    console.log("data3", subData2);
  }, []);

  return (
    <div className="App">
      {mainData.data && (
        <div>
          <div className="lat">
            <p>TIME {mainData.data.channel.created_at}</p>
            <p>
              LAT {mainData.data.channel.latitude} LONG{" "}
              {mainData.data.channel.longitude}
            </p>
          </div>
          <div className="nav">
            <div className="logo">
              <h3>WSM-RCES</h3>
            </div>
            <div className="nav_list">
              <h5>About</h5>
              <h5>Hardware-Implementation</h5>
              <h5>Architecture</h5>
              <h5>Team</h5>
              <h5>Contact</h5>
            </div>
          </div>
          <div className="heading">
            <h3>
              Wireless sensor monitoring through radio and circuit stations
            </h3>
          </div>
          <div className="cards">
            <Card title="Base station 1" data={mainData.data.feeds[0]} />
            <div>
              <Card title="Sub station 1" data={subData1.data.feeds[0]} />
              <Card title="Sub station 12" data={subData2.data.feeds[0]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
