import { Box, CssBaseline, Grid, Typography } from '@mui/material'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'
import { Map } from './components/Map/Map'
import "./App.css"

import { getPlacesData, getWeatherData } from './api'
import { useEffect, useState } from 'react'

function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([])
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("")
  const [facilityTypes, setFacilityTypes] = useState([])

  // checking if the user has allowed location access
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => setLocationAllowed(true),
      () => setLocationAllowed(false)
    );
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(bounds)
        .then((data) => setWeatherData(data))
      console.log(`this is the weather data`);
      console.log(weatherData);
      getPlacesData(coordinates)
        .then((data) => {
          setPlaces(data);
          setIsLoading(false);
          const types = data?.map((place) => place.FacilityTypeDescription)
          setFacilityTypes([...new Set(types)]);
        })
    }
  }, [bounds]);

  return (
    <Box>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      {!locationAllowed && (
          <Typography sx={{paddingY: {xs: 15}, position: "absolute", px: 5}}>
            Please allow access to your location to see the data.
          </Typography>
        )}
      <Grid container spacing={0} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            facilityTypes={facilityTypes}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
