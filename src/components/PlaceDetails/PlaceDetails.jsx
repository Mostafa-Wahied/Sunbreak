import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Tooltip, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Logo from '../../assets/images/logo-bg.png'
import Carousel from 'react-material-ui-carousel'
// import Carousel from "nuka-carousel"
import { getPlaceWeatherData } from "../../api/index.js"
import './styles.css'

const PlaceDetails = ({ place, selected, refProp }) => {
    const [open, setOpen] = React.useState(false);
    const [placeWeatherData, setPlaceWeatherData] = useState()

    const coordinates = { lat: place?.FacilityLatitude, lng: place?.FacilityLongitude }

    useEffect(() => {
        getPlaceWeatherData(coordinates)
            .then((data) => setPlaceWeatherData(data))
    }, [place])


    // selected is a boolean value that is passed in from the List component
    // if the place is selected, then the card will be highlighted
    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // replace any html tags with an empty string
    const filteredDescription = place?.FacilityDescription?.replace(/<[^>]*>/g, '');

    // to capitalize the first letter of each word in the weather description
    const capitalize = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box style={{ paddingRight: '10px' }}>
            <Card elevation={6} sx={{ height: "auto" }}>
                {place?.MEDIA && place?.MEDIA.length ? (

                    <Carousel
                        animation="slide"
                    // defaultControlsConfig={{
                    //     pagingDotsStyle: {
                    //         fill: 'white', // Change the color of the dots here
                    //     },
                    // }}
                    >
                        {place?.MEDIA.map((media) => (
                            <CardMedia
                                style={{ height: 250, width: '100%', backgroundColor: '#F4A442' }}
                                image={media.URL}
                                title={place?.FacilityName}
                            />
                        ))}
                    </Carousel>

                ) : (
                    <Box sx={{ backgroundColor: "#616756" }}>
                        <CardMedia
                            style={{ height: 170, width: 150, margin: 'auto', backgroundColor: '#F4A442' }}
                            image={Logo}
                            title={place?.FacilityName}
                        />
                    </Box>
                )}
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm>
                            <Typography gutterBottom variant="h6" sx={{ fontSize: "1rem" }}>{place?.FacilityName}</Typography>
                        </Grid>
                        <Grid item>
                            {/* showing each location's weather data */}
                            {placeWeatherData && (
                                <Box sx={{ display: "flex", justifyContent: "end" }}>
                                    <Tooltip
                                        title={
                                            <>
                                                <div>
                                                    {placeWeatherData.name}: {placeWeatherData.main.temp}°C
                                                </div>
                                                <div>
                                                    {capitalize(placeWeatherData.weather[0].description)}
                                                </div>
                                            </>
                                        }
                                    >
                                        <img
                                            src={`http://openweathermap.org/img/w/${placeWeatherData.weather[0].icon}.png`}
                                            height="60px"
                                            style={{ position: "relative", bottom: "10px" }}
                                        />
                                    </Tooltip>
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    <Chip size="small" label={place?.FacilityTypeDescription}
                        sx={{ backgroundColor: "#F4A442", color: "white" }} />

                    <Box display="flex" flexDirection="column" my={2}>
                        {filteredDescription && (
                            <Typography variant='subtitle2' color={"#5b5b5b"} sx={{ fontSize: "0.8rem" }}>
                                {open ? filteredDescription : `${filteredDescription.slice(0, 100)}...`}
                                <Button onClick={handleClick} sx={{ fontSize: "0.7rem" }}>
                                    {open ? 'Show less' : 'Show more'}
                                </Button>
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>

                        {place?.FacilityEmail && (
                            <Typography gutterBottom variant="body2" color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', mx: 1 }}
                            >
                                <EmailIcon sx={{ mr: 1 }} />
                                {place?.FacilityEmail}
                            </Typography>
                        )}

                        {place?.FacilityPhone && (
                            <Typography variant="body2" color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', mx: 1 }}
                            >
                                <LocalPhoneIcon sx={{ mr: 1 }} />
                                {place?.FacilityPhone}
                            </Typography>
                        )}

                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default PlaceDetails;