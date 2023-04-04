import { CssBaseline, Grid } from '@mui/material'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'
import { Map } from './components/Map/Map'

import { getPlacesData, getWeatherData } from './api'
import { useEffect, useState } from 'react'

function App() {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([])
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("")
  const [activity, setActivity] = useState()
  const [activities, setActivities] = useState([])
  const [facilityTypes, setFacilityTypes] = useState([])


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
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={0} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            activities={activities}
            setActivities={setActivities}
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
    </>
  )
}

export default App
