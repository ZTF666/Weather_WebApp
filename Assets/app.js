window.addEventListener('load',()=>{
    //variables
    let long ;
    let lat;
    let tempdesc=document.querySelector('.tempdesc');
    let tempdeg=document.querySelector('.tempdeg');
    let locationtimezone=document.querySelector('.location-timezone');
    let degreesection=document.querySelector('.degreesection');
    const degspan=document.querySelector('.degreesection span');
    

//checks if the geoloc is activated by the user or not and prompts it
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            //the proxy bypasses a problem with darksky api which doesnt allow us to display data on localhost
            const proxy='https://cors-anywhere.herokuapp.com/';
            const api =`${proxy}https://api.darksky.net/forecast/dee992e5be227c27a6a6e28321f3e8ee/${lat},${long}`;
            fetch(api)
            .then(response=>{
            return response.json();
             })
            .then(data=>{
            //console.log(data);
            const{temperature,summary,icon}=data.currently;
            //set DOM elements from darksky api
                tempdeg.textContent=temperature;
                tempdesc.textContent=summary;
                locationtimezone.textContent=data.timezone;
                //Celsius
                let celsius=(temperature - 32) * (5/9);
                //icon
                setIcons(icon,document.querySelector('.icon'));

                //switch between F and C
                degreesection.addEventListener('click',()=>{
                    if(degspan.textContent==="F"){
                        degspan.textContent="C";
                        tempdeg.textContent=Math.floor(celsius);
                    }else{
                        degspan.textContent="F";
                        tempdeg.textContent=temperature;
                    }
                });

             });
             });   
    }

    function setIcons(icon,iconId){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]);
    }
});