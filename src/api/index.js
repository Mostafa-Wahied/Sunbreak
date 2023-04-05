
import axios from "axios";
import * as turf from '@turf/turf'

const URL = `https://ridb.recreation.gov/api/v1/facilities?&apikey=${import.meta.env.VITE_RECREATION_GOV_API_KEY}`;

export const getPlacesData = async (coordinates) => {

    try {
        const { data: { RECDATA } } = await axios.get(URL, {
            params: {
                longitude: coordinates.lng,
                latitude: coordinates.lat,
                limit: 250,
                radius: 100,
            },
        });
        console.log(`this is the RECDATA`)
        console.log(RECDATA);
        return RECDATA;
    } catch (error) {
        console.log(error);
    }
};

export const getWeatherData = async (bounds) => {
    const { sw, ne } = bounds;
    const URL = `https://api.openweathermap.org/data/2.5/box/city?bbox=${sw.lng},${sw.lat},${ne.lng},${ne.lat},10&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`;

    try {
        const { data } = await axios.get(URL);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getPlaceWeatherData = async (coordinates) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
    // // const URL = `api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
    try {
        const { data } = await axios.get(URL);
        console.log(`this is the place weather data`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


