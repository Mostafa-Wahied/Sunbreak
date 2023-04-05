import React, { useState } from 'react'
import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

export const Header = ({ setCoordinates }) => {
    const [autocomplete, setAutocomplete] = useState(null)


    const onLoad = (autoC) => setAutocomplete(autoC)

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({ lat, lng })
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: "flex", justifyContent: "space-between", backgroundColor: "#616756"
            }}>
                <Link to="/" style={{ textDecoration: 'none', color: "#fff" }}>
                    <Box display={"flex"}>
                        <img src={Logo} alt="Logo" height="50" />
                        <Typography variant="h6" sx={{
                            display: { xs: "none", sm: "block" },
                            alignSelf: "center",
                        }}>
                            Sunbreak
                        </Typography>
                    </Box>
                </Link>
                <Box display="flex">
                    <Typography variant="h6" sx={{
                        display: { xs: "none", sm: "block" }
                    }}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <Box sx={{
                            position: "relative",
                            borderRadius: "4px",
                            backgroundColor: "#42463B",
                            '&:hover': { backgroundColor: "#777E6A" },
                            marginRight: 2,
                            // width: "100%",
                            marginLeft: 3,
                            width: "auto",
                        }}>
                            <Box>
                                <SearchIcon sx={{
                                    padding: "2px 1px",
                                    height: "100%",
                                    position: "absolute",
                                    pointerEvents: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: "1rem",
                                }} />
                            </Box>
                            <InputBase placeholder="Search…"
                                sx={{
                                    padding: "1px 1px 1px 0",
                                    paddingLeft: `calc(3rem + ${1}px)`,
                                    transition: "width 0.5s",
                                    // width: "100%",
                                    color: "white",
                                    width: { md: "20ch" },
                                    fontSize: "0.9rem",
                                }} />
                        </Box>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
