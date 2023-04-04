import React from 'react';
import GoogleMapReact from 'google-map-react'
import { Box, Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData, setWeatherData }) => {
    const isMobile = useMediaQuery('(min-width:600px)');

    return (
        <Box sx={{
            height: '85vh', width: '100%',
        }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
                google={window.google}
            >
                {places?.map((place, i) => (
                    <Box sx={{
                        position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
                    }}
                        lat={Number(place?.FacilityLatitude)}
                        lng={Number(place?.FacilityLongitude)}
                        key={i}
                    >
                        {
                            !isMobile ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} sx={{
                                    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
                                }}>
                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                        {place?.FacilityName}
                                    </Typography>
                                    <img style={{ cursor: 'pointer' }}
                                        src={
                                            place?.MEDIA && place?.MEDIA.length
                                                ? place?.MEDIA[0].URL
                                                : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                        }
                                        alt={place?.FacilityName}
                                    />
                                </Paper>
                            )
                        }
                    </Box>
                ))}

                {weatherData?.list?.map((data, i) => (
                    <Box
                        key={i}
                        lat={data.coord.Lat}
                        lng={data.coord.Lon}
                    >
                        <img
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            height="70px"
                        />
                    </Box>
                ))}
            </GoogleMapReact>
        </Box>

    )
}
