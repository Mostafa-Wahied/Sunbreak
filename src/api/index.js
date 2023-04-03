
import axios from "axios";
import * as turf from '@turf/turf'

// export const getBoundingBox = (longitude, latitude, distance) => {
//     const center = turf.point([longitude, latitude])
//     const options = { units: 'kilometers' }

//     const bottomLeft = turf.destination(center, distance, -135, options)
//     const topRight = turf.destination(center, distance, 45, options)

//     const bbox = [
//         bottomLeft.geometry.coordinates[0],
//         bottomLeft.geometry.coordinates[1],
//         topRight.geometry.coordinates[0],
//         topRight.geometry.coordinates[1]
//     ]

//     const bottomLeftLongitude = bbox[0]
//     const bottomLeftLatitude = bbox[1]
//     const topRightLongitude = bbox[2]
//     const topRightLatitude = bbox[3]

//     return {
//         bottomLeftLongitude,
//         bottomLeftLatitude,
//         topRightLongitude,
//         topRightLatitude
//     };
// }


const URL = "https://ridb.recreation.gov/api/v1/facilities?&apikey=faae047e-5eb1-4226-b5ce-465e75e682bc";
// const URL = "https://developer.nps.gov/api/v1/thingstodo?api_key=3iXj8cG372YDR8zIWRwqMaEYimddiy65PK2dXaMS";

export const getPlacesData = async (coordinates) => {

    // const { bottomLeftLongitude, bottomLeftLatitude, topRightLongitude, topRightLatitude } = getBoundingBox(coordinates.lng, coordinates.lat, 0.5)

    try {
        const { data: { RECDATA } } = await axios.get(URL, {
            params: {
                // bl_latitude: bottomLeftLatitude,
                // bl_longitude: bottomLeftLongitude,
                // tr_latitude: topRightLatitude,
                // tr_longitude: topRightLongitude,
                longitude: coordinates.lng,
                latitude: coordinates.lat,
                limit: 50,
                radius: 50,
            },
        });
        console.log(`This is the lat: ${coordinates.lat}`)
        console.log(`this is the long: ${coordinates.lng}`)
        return RECDATA;
    } catch (error) {
        console.log(error);
    }
};


// To calculate the bottom-left and top-right coordinates of a bounding box for a location with longitude -109.419421087026 and latitude 38.4787588233655, you can use the same approach as in the previous example. Here’s an example using Turf.js:

// import * as turf from '@turf/turf'

// const center = turf.point([-109.419421087026, 38.4787588233655])
// const distance = 0.5 // in kilometers
// const options = { units: 'kilometers' }

// const bottomLeft = turf.destination(center, distance, -135, options)
// const topRight = turf.destination(center, distance, 45, options)

// const bbox = [
//   bottomLeft.geometry.coordinates[0],
//   bottomLeft.geometry.coordinates[1],
//   topRight.geometry.coordinates[0],
//   topRight.geometry.coordinates[1]
// ]

// const bottomLeftLongitude = bbox[0]
// const bottomLeftLatitude = bbox[1]
// const topRightLongitude = bbox[2]
// const topRightLatitude = bbox[3]
// In this example, we’re using the destination function from Turf.js to calculate the coordinates of the bottom-left and top-right corners of the bounding box. The distance variable specifies the distance from the center point to these corners, and the options object specifies the units for this distance.

// The bbox array contains the coordinates of the bottom-left and top-right corners in the format [minX, minY, maxX, maxY]. We’re then extracting these values into separate variables for clarity.

// You can adjust the distance variable to change the size of the bounding box and the bearing values (-135 and 45) to change its orientation.