import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Logo from '../../assets/images/logo-bg.png'
// import Carousel from 'react-material-ui-carousel'
import Carousel from "nuka-carousel"

const PlaceDetails = ({ place, selected, refProp }) => {
    const [open, setOpen] = React.useState(false);

    // selected is a boolean value that is passed in from the List component
    // if the place is selected, then the card will be highlighted
    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // replace any html tags with an empty string
    const filteredDescription = place?.FacilityDescription?.replace(/<[^>]*>/g, '');


    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box style={{ paddingRight: '10px' }}>
            <Card elevation={6} sx={{ height: "auto" }}>
                {place?.MEDIA && place?.MEDIA.length ? (

                    <Carousel
                        defaultControlsConfig={{
                            pagingDotsStyle: {
                                fill: 'white', // Change the color of the dots here
                            },
                        }}
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
                    <Typography gutterBottom variant="h6" sx={{ fontSize: "1rem" }}>{place?.FacilityName}</Typography>

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

                    <Typography gutterBottom variant="subtitle2">{place?.FACILITYADDRESS[0]}</Typography>
                </CardContent>

                <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>

                        {place?.FacilityEmail && (
                            <Typography gutterBottom variant="body2" color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', mx: 1 }}
                            >
                                <EmailIcon sx={{ mr: 1 }} />{place?.FacilityEmail}
                            </Typography>
                        )}

                        {place?.FacilityPhone && (
                            <Typography variant="body2" color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', mx: 1 }}
                            >
                                <LocalPhoneIcon sx={{ mr: 1 }} /> {place?.FacilityPhone}
                            </Typography>
                        )}
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default PlaceDetails;