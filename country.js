//clear map


const display= (lon,lat,zoom) =>{

    document.querySelector("#map").innerHTML ="";

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });
}

//null,null,null => world map

const success = (response) => {
    return response.json();
}

const handleData = (data) =>{
    console.log(data);
    return data[0];
}

const init = (countryData) =>{
    console.log(countryData.name);
    display(countryData.latlng[1],countryData.latlng[0],6);
    displayInfo(countryData.name,countryData.capital,countryData.flag,countryData.population );
}

const fail = (error) => {
    console.error("fetch error",error)
};

//test
const displayInfo = (name,capital,image,population) =>{
    const countryName = document.querySelector("#name") ;
    const countryCapital= document.querySelector("#capital");
    const countryImage=document.querySelector("#image");
    const countryPopulation=document.querySelector("#population");

    countryName.textContent = `Name: ${name}`;
    countryCapital.textContent = `Capital: ${capital}`;
    countryImage.setAttribute("src", image);
    countryPopulation.textContent=`Population: ${population}`;
}

const getCountry = (country) =>{
    fetch("https://restcountries.eu/rest/v2/name/"+country).then(success).then(handleData).then(init).catch(fail);
}

//handle input
const handleInputCountry= () =>{
    const input = document.querySelector("#country");
    const country = input.value.trim();
    if(country !== ""){
        getCountry(country);
        input.value="";
    }
}

//get Input
const getInfoBtn = document.querySelector("#get-info-btn");
getInfoBtn.addEventListener("click",handleInputCountry);




