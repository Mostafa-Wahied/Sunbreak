import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material'
import PlaceDetails from "../PlaceDetails/PlaceDetails"

export const List = ({ places, childClicked, isLoading }) => {
    const [type, setType] = useState("trails")

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <Box sx={{ padding: "25px" }}>
            <Typography variant="h5">Things to do around you</Typography>
            {
                isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
                        <CircularProgress size="5rem" />
                    </Box>
                ) : (
                    <>
                        <FormControl sx={{ m: 1, minWidth: 120, mb: "30px" }}>
                            <InputLabel>Type</InputLabel>
                            <Select value={''} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={''}>All</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid container spacing={3} sx={{
                            height: '75vh', overflow: 'auto',
                        }}>
                            {places?.map((place, i) => (
                                <Grid ref={elRefs[i]} key={i} item xs={12}>
                                    <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )
            }
        </Box>
    )
}
