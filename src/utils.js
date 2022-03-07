const request = require('postman-request');
const url = "http://api.weatherstack.com/current?access_key=ac3766a08e82ad770d89daffc09be353&query=37.8267,-122.4233";

// request({url:url, json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect to weather service")
//     }else if(response.body.error){console.log("Unable to find location")}
//         else{
//         console.log(`It is currently ${response.body.current.temperature}.There is a ${response.body.current.precip}% chance of rain`)

//     }
// })
//geocoding service

// const geocoding_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmFldCIsImEiOiJja3p6dnlxd3AwZTl4M2ptbDd5dWcybTV2In0.kNE2LWjgrabyYA5a7j1Nsg&limit=1";
// request({url:geocoding_url,json: true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect to location service")
//     }else if(response.body.features.length < 1){
//         console.log("Location not found")
//     }else{
//     console.log(response.body.features[0].center)

//     }
// })

const geocode = (address,callback)=>{
        const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFldCIsImEiOiJja3p6dnlxd3AwZTl4M2ptbDd5dWcybTV2In0.kNE2LWjgrabyYA5a7j1Nsg&limit=1";
        request({url,json:true},(error,response)=>{
                if(error){
                    callback("UNABLe to connect to location services",undefined)
                }else if(response.body.features.length === 0){
                    callback("Location not found",undefined)
                }else{
                    callback(undefined,{lat:response.body.features[0].center[1],long:response.body.features[0].center[0]  })
                }
        })

};
const forecast= (lat,long, callback)=>{
 const url = "http://api.weatherstack.com/current?access_key=ac3766a08e82ad770d89daffc09be353&query="+lat+","+long;
 request({url,json:true},(error,response)=>{
    if(error){
        callback("UNABLe to connect to weather services",undefined)
    }else if(response.body.error){
        callback("Location not found",undefined)
    }else{
        callback(undefined,response.body.current.temperature)
    }
})
};
module.exports = {geocode,forecast};