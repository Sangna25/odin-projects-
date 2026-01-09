import locationIcon from './assets/output-onlinegiftools (4).gif';
import sunnyIcon from './assets/output-onlinegiftools (2).gif';
import cloudySunIcon from './assets/output-onlinegiftools (5).gif';
import moonIcon from './assets/output-onlinegiftools (3).gif';
import cloudyMoonIcon from './assets/output-onlinegiftools (9).gif';
import rainyIcon from './assets/output-onlinegiftools (6).gif';
import snowyIcon from './assets/output-onlinegiftools (8).gif';
import stormyIcon from './assets/output-onlinegiftools (7).gif'

export function renderWeather(data,currentUnit){

    console.log(data);
    const div=document.querySelector('#weatherCard');
    const weatherSticker =document.querySelector('#weatherSticker');
    if(div) div.innerHTML='';
    if(weatherSticker) weatherSticker.innerHTML='';

    const container=document.querySelector('#tempContainer');
    const description = document.createElement('p');
    const temp= document.createElement('p');
    temp.classList.add('mainTemp');
    const address=document.createElement('div');
   const extraInfo = document.createElement('p');
   extraInfo.classList.add('extraInfo');
   const temperature = 
     currentUnit === 'C'
      ? convertTemp(data.currentConditions.temp, 'C')
      : data.currentConditions.temp;
   
 
   temp.textContent=`${temperature} °${currentUnit}`;
   description.textContent=data.description;
   address.innerHTML=`
     <div id="location">
     <img src="${locationIcon}" alt="location Icon ">
     <span><strong>${data.address}</strong></span>
     </div>`;

    const {hottestObj,coldestObj,avg } = getExtraInfo(data);
    const cold = 
      currentUnit === 'C' 
      ? convertTemp(coldestObj.temp,'C')
      : coldestObj.temp;

    const hot =
      currentUnit ==='C'
      ? convertTemp(hottestObj.temp,'C')
      : hottestObj.temp;
     
      const average =
      currentUnit=== 'C'
      ? convertTemp(avg,'C')
      : avg

    extraInfo.textContent=`${cold} °${currentUnit} / ${hot} °${currentUnit}, Feels like ${average} °${currentUnit}`;
    
    const iconName = data.currentConditions.icon;
    const theme = getTheme(iconName);
    renderThemes(theme);
    div.append(temp,address,description,extraInfo);
    container.appendChild(div);
}


export function getExtraInfo(data){
    
    const nextSevenDays= data.days.slice(1,8);
    const total = nextSevenDays.reduce((sum,day) => sum+ day.feelslike,0);
    const avg=Math.round( total / nextSevenDays.length);
    const hottestObj = nextSevenDays.reduce((prev,curr)=>{
        return (curr.temp>prev.temp) ? curr : prev;
    });
    const coldestObj = nextSevenDays.reduce((prev,curr)=>{
        return  (curr.temp<prev.temp) ? curr : prev;
    });

    return {hottestObj,coldestObj,avg};
    
}



export function convertTemp(temp,toUnit){
    if(toUnit==='C'){
       return Math.round((temp - 32)* 5 / 9) ;
        
    } else if(toUnit==='F'){
        return  Math.round(temp * (9 / 5) + 32);
    } else {
        return temp;
    }
}

const weatherThemes ={
    sunny:{
        color:'linear-gradient(135deg, #FFD194 0%, #D1913C 100%)',
        sticker: sunnyIcon,
        textColor: '#3B2F1E'
    },
    cloudy:{
        color:'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
        sticker:cloudySunIcon,
        textColor: '#2E3440',  
    },
    cloudyNight:{
        color: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
        sticker:cloudyMoonIcon,
        textColor: '#E5E9F0',
    },
    rainy:{
        color:'linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)',
        sticker : rainyIcon,
        textColor: '#F1F5F9',
    },
    stormy: {
        color:'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        sticker:stormyIcon,
        textColor: '#E6EDF3',   
    },
    snowy:{
        color: 'linear-gradient(135deg, #E6E6E6 0%, #FFFFFF 100%)',
        sticker : snowyIcon,
        textColor: '#1F2933'
    }, 
    night:{
        color : 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
        sticker: moonIcon,
        textColor: '#E0F2FF',
    }
 }

function getTheme(icon){
    if (icon.includes('cloudy') && icon.includes('fog') && icon.includes('day')){
        return weatherThemes.cloudy;
    } else if(icon.includes('storm') && icon.includes('thunder')){
        return weatherThemes.stormy;
    } else if(icon.includes('rain') && icon.includes('shower')){
        return weatherThemes.rainy;
    } else if(icon.includes('snow') && icon.includes('sleet') && icon.includes('hail')){
        return weatherThemes.snowy;
    } else if(icon.includes('night') && icon.includes('clear')){
        return weatherThemes.night;
    } else if(icon.includes('night') && icon.includes('cloudy')){
        return weatherThemes.cloudyNight;
    } else{
        return weatherThemes.sunny;
    }
}

function renderThemes(theme){
    const activeTheme = theme;
    const body = document.querySelector('body');
    const sticker = document.createElement('img');
    sticker.classList.add('weatherStickers');
    const weatherSticker = document.querySelector('#weatherSticker');
   const tempContainer = document.querySelector('#tempContainer');
    if(activeTheme){
        weatherSticker.innerHTML='';
        body.style.background=activeTheme.color;
        body.style.color = activeTheme.textColor;
        sticker.classList.add('weatherSticker');
        sticker.src=activeTheme.sticker;
        sticker.alt="Apt weather Sticker";
        weatherSticker.appendChild(sticker);
        tempContainer.appendChild(weatherSticker)
       
    } 
}
