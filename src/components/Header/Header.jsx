import React from 'react'
import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import SearchIcon from '@mui/icons-material/Search';

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: "flex", justifyContent: "space-between", backgroundColor: "#125C13"
            }}>
                <Typography variant="h6" sx={{
                    display: { xs: "none", sm: "block" }
                }}>
                    Sunbreak
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" sx={{
                        display: { xs: "none", sm: "block" }
                    }}>
                        Explore new places
                    </Typography>
                    {/* <Autocomplete> */}
                    <Box sx={{
                        position: "relative",
                        borderRadius: "4px",
                        backgroundColor: "#2d762e",
                        '&:hover': { backgroundColor: "#348735" },
                        marginLeft: 0,
                        marginRight: 2,
                        width: "100%",
                        marginLeft: 3, width: "auto",
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
                                width: "100%",
                                color: "white",
                                width: { md: "20ch" },
                                fontSize: "0.9rem",
                            }} />
                    </Box>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
