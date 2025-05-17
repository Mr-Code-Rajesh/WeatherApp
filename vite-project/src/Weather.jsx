import React, { useState,useEffect } from 'react'
// import "../Animation.css"
import mist from '../public/weather/mist1.jpg'
import snow from '../public/weather/snow1.jpg'
import snow2 from '../public/weather/snow2.jpg'
import thunderstorm from '../public/weather/thunder1.jpg'
import rain from '../public/weather/rain2.jpg'
import showerrain from '../public/weather/showerrain.jpg'
import showerrain2 from '../public/weather/showerrain2.jpg'
import brokenclouds from '../public/weather/broken clouds2.jpg'
import scatteredclouds from '../public/weather/scattered clouds1.jpg'
import scatteredclouds2 from '../public/weather/scattered_clouds01.jpg'
import fewclouds from '../public/weather/few clouds.jpg'
import fewclouds2 from '../public/weather/few clouds02.jpg'
import clearsky from '../public/weather/clear sky.jpg'
import wicon from '../public/weather/w-Icon.jpg'

/* react icons start*/
import { IoSearchSharp } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FiWind } from "react-icons/fi";
import { RiTimeZoneFill } from "react-icons/ri";
import { IoIosCloudOutline } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa";

/* Icons end*/


export const Weather = () => {
    let [city,setcity]      = useState("Russia");
    let [country,setcoutry] = useState("IN");
    let [img,setimg]        = useState("public/weather/weather-bg.jpg");
    let [temp,settemp]      = useState(0);
    let [lat,setlat]        = useState(0);
    let [log,setlog]        = useState(0);
    let [wave,setwave]      = useState(0);
    let [speed,setspeed]    = useState(0);
    let [des,setdes]    = useState("Clear Weather");
    let [mintemp,setmintemp]    = useState(0);
    let [maxtemp,setmaxtemp]    = useState(0);
    let [timezone,settimezone]    = useState(0);
    let [visibility,setvisibility]    = useState(0);
    let [winddegree,setwinddegree]    = useState(0);
    let [Iptext,SetIptext]  = useState("Russia");
    

   /*  Error Handling state */

    let [cityNotfound,SetcityNotfound] = useState(false);
    let [Loading,Setloading] = useState(false);
    let [error,setError]     = useState(false);
    let [alert,setAlert]            = useState(false);

    /*  Error Handling state */

let Icons = {
  "01d":clearsky,
  "02d":fewclouds2,
  "03d":scatteredclouds2,
  "04d":brokenclouds,
  "09d":showerrain,
  "10d":rain,
  "11d":thunderstorm,
  "13d":snow,
  "50d":mist,
  "01n":clearsky,
  "02n":fewclouds2,
  "03n":scatteredclouds2,
  "04n":brokenclouds,
  "09n":showerrain,
  "10n":rain,
  "11n":thunderstorm,
  "13n":snow,
  "50n":mist,
}; 

/* sample country name for App Testing 
 
Brazil
china
Thailand
india
Russia
United States
Spain
Egypt

*/

  async  function SearchWeather(){
    Setloading(true);
    // let UrlMain ="https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=b415cbc0f22e2ba825e295a8d8bcd729&units=Metric";
    // let APIkey =" b415cbc0f22e2ba825e295a8d8bcd729";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${Iptext}&appid=b415cbc0f22e2ba825e295a8d8bcd729&units=Metric`;

    try{
      let request = await fetch(URL);
      let data = await request.json();
      console.log(data);
      // console.log(data.weather[0].icon);
      // console.log(data.weather[0].description);


      if(data.cod ==='404' || data.cod ==="400"){
        console.error("City not found");
        SetcityNotfound(true);
        settemp(0);
        setcity("City not found")
        setAlert(true);
        setcoutry(" ");
        setdes("Weather not found");
        Setloading(false);
        return; 
      }

      setcity(data.name);
      settemp(data.main.temp);
      setcoutry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      setwave(data.main.humidity);
      setspeed(data.wind.speed);
      setdes(data.weather[0].description);
      setmintemp(data.main.temp_min);
      setmaxtemp(data.main.temp_max);
      settimezone(data.timezone);
      setvisibility(data.visibility);
      setwinddegree(data.wind.deg);

      let iconset = data.weather[0].icon;
      setimg(Icons[iconset] || clearsky);

      // const iconURL = `https://openweathermap.org/img/wn/${iconset}@2x.png`;
      // let iconset = data.weather[0].icon;
// setimg(iconURL);
      SetcityNotfound(false);
      setAlert(false);
     
    }catch(error){
      console.error(error);
      setError(true);
      Setloading(false);
    }finally{
      Setloading(false);
    }
    
  }

  function IPHandler(e){
    let set =e.target.value.trim();
    // console.log(set);
    
    SetIptext(set);
  }
  function IpkeydownHandler(e){
    if(e.key ==="Enter"){
      SearchWeather();
    }
  }


  useEffect(()=>{
    SearchWeather();
  },[])



return (
  <>
    <div className='w-full h-full flex lg:justify-between lg:flex-row lg:items-stretch md:justify-start md:items-start md:object-contain text-white md:flex-col sm:flex-col sm:justify-start sm:items-start bg-cover overflow-x-hidden 
     duration-200 animate-movingBackground bg-center font-poppins' style={{
        backgroundImage: `url(${img})`,      
      }}>

      
      <div className='flex lg:justify-start lg:items-start  md:justify-start md:flex-col md:items-center md:p-12 sm:flex-col sm:justify-center sm:items-center sm:p-14 w-full'>
        {/* <div className='text-center'>
           Zinov Nemili
         </div> */}
         <div className='flex relative w-full lg:-mt-5'>
                <input type="text"  placeholder='Search city here...' className='ring-2 ring-white text-white font-medium rounded-sm py-3 text-xl px-2 flex-1/2 focus:ring-gray-100 outline-none bg-white/10' value={Iptext} onChange={IPHandler} onKeyDown={IpkeydownHandler}/>
                <p className=' absolute right-3 lg:top-3.5 md:top-3.5 sm:top-3.5 text-xl cursor-pointer' onClick={SearchWeather}>
                   <IoSearchSharp />
                </p>
         </div>

         { alert && cityNotfound && <div className='mt-2'>
            <h2 className='text-white font-bold'>Please enter Valid city name... </h2>
          </div>}
      
        <div className=' flex flex-col gap-1'>
          <div className=' md:mx-15 lg:mt-10 lg:mx-0 md:mt-10 sm:mt-5 sm:mx-15'>
             <Timer/>  
           </div>
          <div>
             <GetDay/>
           </div>
        </div>

        <div className=' flex gap-2 md:mt-10 sm:mt-5'>
          <p className=' text-7xl lg:-ml-2 md:ml-0 sm:ml-7'>{temp}<span className=' animate-pulse'>°</span></p>
          <span className=' text-4xl'>{city}</span>
          <span className='text-xl font-medium'>{country}</span>
        </div>

        <div>
          <h2 className='text-3xl mt-3 capitalize md:text-center lg:text-left sm:text-center'>{des}</h2>
          <p className='my-5 font-medium text-xl'>"Feeling Hot or Cold? Get Instant Temperature Updates!"</p>
          <button className='my-2 border-2 py-1 px-4 rounded-sm text-black bg-white border-white font-medium cursor-pointer hover:bg-transparent transition hover:text-white md:mx-50 lg:m-0 sm:mx-45' onClick={SearchWeather}> Get Updates</button>
        </div>

     {/* Animation start  */}
    
 {/* Animaion end  */}

        {/* <div>
           <h2 className=' text-xl bg-blue-400 shadow-md  text-white font-medium py-2 px-4 text-center rounded-sm'> Please Enter valid city Name</h2>
        </div> */}
      </div>
       
     
      <div className=' w-full flex lg:justify-end lg:items-stretch md:justify-center md:items-center md:my-5 sm:justify-center sm:my-4 lg:m-0 '>
       <div className='w-md bg-black/15  shadow-2xl ring-1 ring-gray-100 border border-white/20 rounded p-5'>
            {/* <div className='flex relative'>
                <input type="text"  placeholder='Search city' className='ring-2 ring-white rounded-sm py-2 px-2 flex-1/2 focus:ring-gray-100 outline-none' value={Iptext} onChange={IPHandler} onKeyDown={IpkeydownHandler}/>
                <p className=' absolute right-3 top-2 text-xl cursor-pointer' onClick={SearchWeather}>
                   <IoSearchSharp />
                </p>
            </div> */}

            
            <div className=' flex flex-col gap-2 justify-center items-center my-3'>
            {Loading && <div className='font-medium'> Loading weather data...</div>}
             { error && <div className='text-xl text-gray-200'> API having error...</div>}
             { cityNotfound && <div className='text-xl text-gray-200'> <p>City Not found !!!</p></div>}
              
            </div>
            
           {!cityNotfound && !Loading && !alert && <Weatherdeatailes city={city} country={country} temp={temp} lat={lat} log={log} img={img} wave={wave} speed={speed} mintemp={mintemp} maxtemp={maxtemp} timezone={timezone} visibility={visibility} winddegree={winddegree} />}

           
           <div>
              <div className=' flex justify-center gap-2'> Developed by 
                <span className='my-1 animate-bounce'> <FaLaptopCode /> </span>
                <span className='font-semibold text-gray-100'>Code Saktrix</span></div>
            </div>

         </div>


       </div>
        
    </div>
    
  </>  
)

}


let Weatherdeatailes = ({city,temp,country,img,lat,log,wave,speed,mintemp,maxtemp,timezone,visibility,winddegree})=>{
    return(
        <div className='lg:mt-0'>
           <div className='flex flex-col justify-center items-center'>
                {/* <img src={img} alt="IMg" className='h-52'/>
                <div className='my-3 text-3xl'> <h2>{temp}*C</h2> </div> */}

                {/* <div className=' text-4xl uppercase'> {city} </div> */}
                {/* <div className=' text-xl'> {country} </div> */}
                <div>
                  <h2 className=' uppercase tracking-widest font-medium'>Today's Weather Forecast</h2>
                </div>
                <div className=' flex flex-col gap-4 my-3'>
                  <div className=' flex justify-evenly gap-32'>
                    <div> Temp max </div>
                    <div className=' flex gap-4'>
                      <span>{maxtemp}°</span>
                      <span className='mt-1 text-red-300  duration-500 ease-linear animate-pulse'> <FaTemperatureHigh/> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> Temp min </div>
                    <div className=' flex gap-4'>
                      <span>{mintemp}°</span>
                      <span className='mt-1 text-blue-200 animate-pulse'> <FaTemperatureHigh/> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> Humadity </div>
                    <div className=' flex gap-4'>
                      <span>{wave}%</span>
                      <span className='mt-1 text-white'> <MdOutlineWaterDrop /> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> Latitude </div>
                    <div className=' flex gap-4'>
                      <span>{lat.toFixed(2)}</span>
                      <span className='mt-1 text-white'> <TiWeatherWindyCloudy /> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> lontitude</div>
                    <div className=' flex gap-4'>
                      <span>{log.toFixed(2)}</span>
                      <span className='mt-1 text-white'> <TiWeatherWindyCloudy /> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> Speed </div>
                    <div className=' flex gap-4'>
                      <span>{speed}km/h</span>
                      <span className='mt-1 text-white'> <FiWind /> </span>
                    </div>
                  </div>

                  <div className=' flex justify-evenly gap-32'>
                    <div> Wind Deg</div>
                    <div className=' flex gap-4'>
                      <span>{winddegree}</span>
                      <span className='mt-1 text-white'> <FaTemperatureHigh/> </span>
                    </div>
                  </div>

                </div>
            </div>

            <div className='flex justify-between items-center my-10'>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex gap-2'>
                    <span>Timezone</span>
                    <span className='my-1 animate-pulse'><RiTimeZoneFill /></span>
                  </div>
                    <h2>{timezone}</h2>
                </div>

                <div className='flex flex-col justify-center items-center'>
                   <div className='flex gap-2'>
                     <span>Visibility</span>
                     <span className='my-1 animate-pulse'><IoIosCloudOutline /></span>
                   </div>
                   <h2>{visibility}</h2>    
                </div>

            </div>

        </div>
    )
}

const Timer =()=>{
    const [time, setTime] = useState(new Date()); // time
    // time start 

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date()); 
      }, 1000);
  
      return () => clearInterval(interval); 
    }, []);

    // time end 


    const formatTime = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";
  
      hours = hours % 12 || 12; 
      minutes = minutes.toString().padStart(2, "0");
      seconds = seconds.toString().padStart(2, "0");

      return (
        <div className='flex gap-1 font-bold'>
          <span className=' text-2xl'> {hours} : </span> 
          <span className=' text-2xl'> {minutes} : </span> 
          <span className=' text-2xl'> {seconds} </span> 
          <span className=' text-sm leading-11'> {ampm}</span>
        </div>
      )
    };
  
    return (
      <>
        <div>
          <div>{formatTime(time)}</div>  
       </div>  
      </>
    );
};

const GetDay =()=>{
  const [date, setDate] = useState("");    

    // date useeffect 
    useEffect(() => {
      const today = new Date();
      const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
      setDate(today.toLocaleDateString("en-US", options));
    }, []);
  
    // date useeffect  end

  return(
    <div className=' text-xl font-medium'>{date}</div>
  )
}




/*

Day icon	Night icon	Description
01d.png 	01n.png 	clear sky
02d.png 	02n.png 	few clouds
03d.png 	03n.png 	scattered clouds
04d.png 	04n.png 	broken clouds
09d.png 	09n.png 	shower rain
10d.png 	10n.png 	rain
11d.png 	11n.png 	thunderstorm
13d.png 	13n.png 	snow
50d.png 	50n.png 	mist

  words bg-white/10 backdrop-blur-md shadow-lg border border-white/20 rounded-xl  

*/










 