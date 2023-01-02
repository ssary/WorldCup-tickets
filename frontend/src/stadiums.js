var stadiums = [
    {name: "Stadium974", url: "https://digitalhub.fifa.com/m/243fb48390a8f249/original/974_EN.png"},
    {name: "AlBaytStadium", url: "https://digitalhub.fifa.com/m/7f849b1386a726fc/original/ABS_EN.png"},
    {name: "AlThumamaStadium", url: "https://digitalhub.fifa.com/m/5934fa5f0ff139ec/original/ATS_EN.png"},
    {name: "AlJanoubStadium", url: "https://digitalhub.fifa.com/m/22816dcc3fd7daba/original/AJS_EN.png"},
    {name: "EducationCityStadium", url: "https://digitalhub.fifa.com/m/75fe2016cbe52fcf/original/ECS_EN.png"},
    {name: "AhmadBinAliStadium", url: "https://digitalhub.fifa.com/m/4d160f3b0ed11fa4/original/AAS_EN.png"},
    {name: "KhalifaInternationalStadium", url: "https://digitalhub.fifa.com/m/1d1f5667934d7a2d/original/KIS_EN.png"},
    {name: "LusailStadium", url: "https://digitalhub.fifa.com/m/5ac6b6b7a44368cf/original/LUS_EN.png"}
]

function getStadium(stadium){
    var str = stadium.replaceAll(" ","");
    for(var i =0; i<stadiums.length; i++){
        if(stadiums[i].name === str){
            return stadiums[i].url
        }
    }
    return("TBA");
    
}

export default getStadium;