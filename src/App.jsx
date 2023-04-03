import { CssBaseline, Grid } from '@mui/material'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'
import { Map } from './components/Map/Map'

import { getPlacesData } from './api'
import { useEffect, useState } from 'react'

function App() {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(coordinates)
      .then((data) => {
        console.log(data);
        setPlaces(data);
        setIsLoading(false);
      })

  }, [coordinates, bounds])


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
