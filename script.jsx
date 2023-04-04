const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

const script = document.createElement('script');
script.src = googleMapsUrl;
document.head.appendChild(script);