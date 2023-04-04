import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, ImageList, ImageListItem, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logo from '../../assets/images/logo-bg.png'
// import Carousel from 'react-material-ui-carousel'
import Carousel from "nuka-carousel"



const PlaceDetails = ({ place, selected, refProp }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // selected is a boolean value that is passed in from the List component
    // if the place is selected, then the card will be highlighted
    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // get the first 100 characters of the description and replace any html tags with an empty string
    const description = place?.FacilityDescription.length > 100 && !showFullDescription
        ? `${place?.FacilityDescription.slice(0, 100).replace(/<[^>]+>/g, '')}...`
        : place?.FacilityDescription.replace(/<[^>]+>/g, '');

    const handleShowMore = () => setShowFullDescription(true);

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


                    // <ImageList sx={{ maxWidth: 550, maxHeight: 300 }} cols={1} variant='masonary'>
                    //     {place?.MEDIA.map((media) => (
                    //         <ImageListItem key={media.URL}>
                    //             <img
                    //                 src={`${media.URL}?w=164&h=164&fit=crop&auto=format`}
                    //                 srcSet={`${media.URL}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    //                 alt={media.Title}
                    //                 loading="lazy"
                    //             />
                    //         </ImageListItem>
                    //     ))}
                    // </ImageList>
                ) : (
                    <Box sx={{ backgroundColor: "#616756" }}>
                        <CardMedia
                            style={{ height: 150, width: 150, margin: 'auto', backgroundColor: '#F4A442' }}
                            image={Logo}
                            title={place?.FacilityName}
                        />
                    </Box>
                )}
                <CardContent>
                    <Typography gutterBottom variant="h6">{place?.FacilityName}</Typography>
                    <Chip size="small" label={place?.FacilityTypeDescription} sx={{ backgroundColor: "#F4A442", color: "white" }} />
                    <Box display="flex" flexDirection="column" my={2}>
                        <Typography variant='subtitle2' color={"#5b5b5b"}>
                            {description}
                        </Typography>
                        {place?.FacilityDescription.length > 100 && !showFullDescription && (
                            <Box mt={0}>
                                <Typography variant='overline' onClick={handleShowMore} style={{ cursor: 'pointer' }}>
                                    <Box display="flex" alignItems="center">
                                        Show more
                                        <KeyboardArrowDownIcon sx={{ width: 20, mb: "3px" }} />
                                    </Box>
                                </Typography>
                            </Box>
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
                    {/* <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
                    Website
                </Button> */}
                </CardActions>
            </Card>
        </Box>
    )
}

export default PlaceDetails;