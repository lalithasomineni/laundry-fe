import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LaundryShops from "./laundryShop";
import { Grid } from "@material-ui/core";
import axios from "axios";
export default function NearByShops(props) {
  const [viewport, setViewport] = useState({
    latitude: props.lat,
    longitude: props.lng,
    width: "50vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedPark, setSelectedPark] = useState(null);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const [stores, setStores] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://laundrybackend.herokuapp.com/user/nearbyshops?lat=${props.lat}&lng=${props.lng}`
        // `https://laundrybackend.herokuapp.com/user/nearbyshops?lat=${17.4}&lng=${78.3}`
      )
      .then((res) => {
        // console.log(res);
        setStores(res.data);
      })
      .catch((e) => {
        // console.log();
      });
  });

  // const handleOnClick = () => {
  //   setViewport({
  //     latitude: childData.lat,
  //     longitude: childData.lng,
  //     width: "50vw",
  //     height: "100vh",
  //     zoom: 13,
  //   });
  //   console.log(childData);
  // };
  return (
    <div>
      {/* <button onClick={handleOnClick}>Current Location Button</button> */}
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <LaundryShops
            style={{
              padding: "20px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ReactMapGL
            style={{
              marginLeft: "20px",
            }}
            {...viewport}
            mapboxApiAccessToken={
              "pk.eyJ1IjoiYWRoaXNoMSIsImEiOiJja2VqeGN4ZjYwejR0MnFucDF0aWM1ZWNpIn0.ogjwjuHPdMyo_lMyotZXzw"
            }
            mapStyle="mapbox://styles/adhish1/ckejxvk9a0n3l1ar0h32ym0tx"
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            {stores.map((store) => (
              <Marker
                key={store._id}
                latitude={store.geometry.coordinates[0]}
                longitude={store.geometry.coordinates[1]}
              >
                <button
                  className="marker-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPark(store);
                    // console.log(childData);
                    console.log(props);
                  }}
                >
                  <img src="/washing.svg" alt="Icon" />
                </button>
              </Marker>
            ))}

            {selectedPark ? (
              <Popup
                latitude={selectedPark.geometry.coordinates[0]}
                longitude={selectedPark.geometry.coordinates[1]}
                onClose={() => {
                  setSelectedPark(null);
                }}
              >
                <div>
                  <h2>{selectedPark.name}</h2>
                  <p>{selectedPark.address}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </Grid>
      </Grid>
    </div>
  );
}
