import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box } from '@mui/material'
import PlaceDetails from "../PlaceDetails/PlaceDetails"

export const List = ({ places, childClicked, isLoading, facilityTypes, activities }) => {
    const [activity, setActivity] = useState()
    const [type, setType] = useState("")
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
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
                        <FormControl size="small" sx={{ m: 1, minWidth: 120, mb: '30px' }}>
                            <InputLabel id="typeInput">Type</InputLabel>
                            <Select
                                labelId="typeInput"
                                id="typeInput"
                                label="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {facilityTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* <FormControl size="small" sx={{ m: 1, minWidth: 120, mb: '30px' }}>
                            <InputLabel id="activityInput">Activity</InputLabel>
                            <Select
                                labelId="activityInput"
                                id="activityInput"
                                label="Activity"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {activities.map((activity) => (
                                    <MenuItem key={activity} value={activity}>
                                        {activity}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <Grid
                            container
                            spacing={3}
                            sx={{
                                height: '75vh',
                                overflow: 'auto',
                            }}
                        >
                            {places
                                ?.filter(
                                    (place) =>
                                        (!type || place.FacilityTypeDescription === type) 
                                        // this is the activities filter
                                        // &&
                                        // (!activity || place.ACTIVITY.some((a) => a.ActivityName === activity))
                                )
                                .map((place, i) => (
                                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                                        <PlaceDetails
                                            selected={Number(childClicked) === i}
                                            refProp={elRefs[i]}
                                            place={place}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </>
                )
            }
        </Box>
    )
}
