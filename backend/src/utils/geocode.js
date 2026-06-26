import axios from "axios";

const geocodeAddress = async(address)=>{
    // callig the  Nominatim api from the openstreet with the address text(string)
    const response = await axios.get("https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,           // address the user typed
                format: "json",       // we want JSON back
                limit: 1,             // only top result needed
                countrycodes: "in",   // limit to India only
            },
            headers: {
                // required by Nominatim — identifies your app
                "User-Agent": "StrayShield/1.0 (strayshield@gmail.com)"
            }
        }
    );

    if(!response.data || response.data.length === 0  ){
        throw new Error("Please Enter a valid Address")
    }

    // Nominatim returns coordinates as strings
    const lat = parseFloat(response.data[0].lat);
    const lng = parseFloat(response.data[0].lon); // this is naming convention of the naominatim that it return the lon and not lng
    
    return {lat,lng}
}
export default geocodeAddress;