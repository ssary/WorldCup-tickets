var flags = [
        {name: "Ecuador", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/1200px-Flag_of_Ecuador.svg.png"},
        {name: "Wales", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/2560px-Flag_of_Wales_%281959%29.svg.png"},
        {name: "SaudiArabia", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/2000px-Flag_of_Saudi_Arabia.svg.png"},
        {name: "Tunisia", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/2560px-Flag_of_Tunisia.svg.png"},
        {name: "Poland", url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png"},
        {name: "Australia", url: "https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg"},
        {name: "Croatia", url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Flag_of_Croatia_at_the_UN.svg"},
        {name: "Netherlands", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1200px-Flag_of_the_Netherlands.svg.png"},
        {name: "Iran", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tricolour_Flag_of_Iran_%281886%29.svg/2560px-Tricolour_Flag_of_Iran_%281886%29.svg.png"},
        {name: "Canada", url: "https://cdn.britannica.com/68/7068-004-7848FEB4/Flag-Canada.jpg"},
        {name: "Cameroon", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/2560px-Flag_of_Cameroon.svg.png"},
        {name: "KoreaRepublic", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/2560px-Flag_of_South_Korea.svg.png"},
        {name: "Ghana", url: "https://cdn.britannica.com/54/5054-004-A09ABCDF/Flag-Ghana.jpg"},
        {name: "Serbia", url: "https://cdn.britannica.com/39/94839-004-EEB20F36/Flag-Serbia.jpg"},
        {name: "Senegal", url: "https://cdn.britannica.com/70/5070-004-2963C5E1/Flag-Senegal.jpg"},
        {name: "USA", url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"},
        {name: "Denmark", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/800px-Flag_of_Denmark.svg.png"},
        {name: "Mexico", url: "https://cdn.britannica.com/73/2573-004-29818847/Flag-Mexico.jpg"},
        {name: "Japan", url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png"},
        {name: "Morocco", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Morocco_%28unbordered_light_green%29.svg/1200px-Flag_of_Morocco_%28unbordered_light_green%29.svg.png"},
        {name: "CostaRica", url: "https://cdn.britannica.com/25/7225-004-65F33B16/Flag-Costa-Rica.jpg"},
        {name: "Germany", url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Flag_of_germany_800_480.png"},
        {name: "Switzerland", url: "https://cdn.britannica.com/43/4543-004-C0D5C6F4/Flag-Switzerland.jpg"},
        {name: "Uruguay", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Flag_of_Uruguay_%281828-1830%29.svg/2560px-Flag_of_Uruguay_%281828-1830%29.svg.png"},
        {name: "England", url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png"},
        {name: "Qatar", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_Qatar_%283-2%29.svg/1200px-Flag_of_Qatar_%283-2%29.svg.png"},
        {name: "Argentina", url: "https://cdn.britannica.com/69/5869-004-7D75CD05/Flag-Argentina.jpg"},
        {name: "France", url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png"},
        {name: "Belgium", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/1200px-Flag_of_Belgium.svg.png"},
        {name: "Spain", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png"},
        {name: "Portugal", url: "https://cdn.britannica.com/88/3588-004-E0E45339/Flag-Portugal.jpg"},
        {name: "Brazil", url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png"}
]
function getFlag(flag){
    var str = flag.replaceAll(" ","");
    for(var i =0; i<flags.length; i++){
        if(flags[i].name === str){
            return flags[i].url
        }
    }
    return("TBA");
    
}
export default getFlag;