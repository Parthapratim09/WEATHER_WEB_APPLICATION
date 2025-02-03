let inp=document.querySelector('#search');
let form=document.querySelector('form');
let image=document.querySelector('.image');
let city_name;
let city=document.querySelector('.main-card .other-details .image h5 #city');
// console.dir(city);
let API_key='aa9311334122d5496432de1c79f1801e';
form.addEventListener('submit',(event) =>
    {
        event.preventDefault();
         city_name=inp.value;
         let url=`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
// console.log(url);
fetch(url)
.then(Response => {
    return Response.json();
})
.then((data) =>{
    console.dir(data);
    // console.log(data.cod);
    //Get SUnrise Time
    let unixTimestampRise = data.sys.sunrise;
    const Risedate = new Date(unixTimestampRise * 1000); // Convert to milliseconds

  // Get hours in 12-hour format
  let Risehours = Risedate.getHours();
  const Riseampm = Risehours >= 12 ? 'PM' : 'AM';
  Risehours = Risehours % 12;
  Risehours = Risehours ? Risehours : 12; // Convert 0 to 12

  // Get minutes and seconds
  const Riseminutes = Risedate.getMinutes().toString().padStart(2, '0');
  const Riseseconds = Risedate.getSeconds().toString().padStart(2, '0');

  // Format the time string
  const RisetimeString = `${Risehours}:${Riseminutes}:${Riseseconds} ${Riseampm}`;
   document.querySelector('.main-card .other-details .image .sun_rise .sunRise span').innerText=RisetimeString;
   //Get SUn Set time
   let unixTimestampSet = data.sys.sunset;
    const Setdate = new Date(unixTimestampSet * 1000); // Convert to milliseconds

  // Get hours in 12-hour format
  let Sethours = Setdate.getHours();
  const Setampm = Sethours >= 12 ? 'PM' : 'AM';
  Sethours = Sethours % 12;
  Sethours = Sethours ? Sethours : 12; // Convert 0 to 12

  // Get minutes and seconds
  const Setminutes = Setdate.getMinutes().toString().padStart(2, '0');
  const Setseconds = Setdate.getSeconds().toString().padStart(2, '0');

  // Format the time string
  const SettimeString = `${Sethours}:${Setminutes}:${Setseconds} ${Setampm}`;
    document.querySelector('.main-card .other-details .image .sun_rise .sunset span').innerText=SettimeString;

    if(data.cod!="200")
    {
      return alert("CITY NOT FOUND");
    }
    city.innerText=data.name;
    if(data.weather[0].main=="Clouds")
    {
      document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/cloudy.jpg')";
      document.querySelector('body').style.color="white";
    }
    else if(data.weather[0].main=="Rain")
      {
        document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/Rain.webp')";
      document.querySelector('body').style.color="white";

      }
      else if(data.weather[0].main=="Thunderstorm")
        {
          document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/Thunder.webp')";
      document.querySelector('body').style.color="white";

        }
      else if(data.weather[0].main=="Clear")
        {
          const date = new Date();
          let hours = date.getHours();
          // let ampm = hours >= 12 ? 'PM' : 'AM';
          // Convert to 12-hour format
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          console.log(hours)
          if(hours>Sethours)
          {
            document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/nightsky.gif')";
            document.querySelector('body').style.color="white";
          }
          else{
          document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/clear_sky1.jpg')";
          document.querySelector('body').style.color="black";
          }
        }
        else if(data.weather[0].main=="Sunny")
          {
            const date = new Date();
            let hours = date.getHours();
          // let ampm = hours >= 12 ? 'PM' : 'AM';
          // Convert to 12-hour format
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          if(hours>Sethours)
          {
            document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/night.gif')";
            document.querySelector('body').style.color="white";
          }
          else{
            document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/sunny.jpg')";
            document.querySelector('body').style.color="black";
          }
          }
      else if(data.weather[0].main=="Snow")
        {
          document.querySelector('.main-card .other-details').style.backgroundImage = "url('photo/snow.webp')";
      document.querySelector('body').style.color="black";

        }



    document.querySelector('.main-card .other-details .image h5 #country').innerText=data.sys.country;
    document.querySelector('.main-card .other-details .image .weather').innerText=data.weather[0].description;
    document.querySelector('.main-card .other-details .image .temp span').innerText=Math.floor(data.main.temp-273.15);
    document.querySelector('.main-card .other-details .image .feel_temp span').innerText=Math.floor(data.main.feels_like-273.15);
    document.querySelector('.main-card .other-details .details .max_min_temp .Max span').innerText=Math.floor(data.main.temp_max-273.15);
    document.querySelector('.main-card .other-details .details .max_min_temp .Min span').innerText=Math.floor(data.main.temp_min-273.15);
    document.querySelector('.main-card .other-details .details .pressure_humadity_wind .Pressure .pressure span').innerText=`${data.main.pressure} hPa`;
    document.querySelector('.main-card .other-details .details .pressure_humadity_wind .Humidity .humidity span').innerText=`${data.main.humidity}%`;
    function getWindDirection(deg, speed) {
      const windElement = document.querySelector('.main-card .other-details .details .pressure_humadity_wind .Wind .windspeed span');
    
      if (!windElement) {
        console.error("Wind element not found");
        return;
      }
    
      const directions = [
        "N", "N/NNE", "NNE", "NE", "E/NE", "E", "E/SE", "SE", "S/SE", "S", "S/SW", "SW", "W/SW", "W", "W/NW", "NW", "N/NW"
      ];
    
      const index = Math.round(deg / 22.5) % 16;
      windElement.innerText = `${speed}${directions[index]}`;
    }
    
    // Example usage:
    let deg = data.wind.deg;
    let speed = data.wind.speed;
    // console.log(deg);
    getWindDirection(deg, speed);
    
    if(data.clouds)
    {
      document.querySelector('.main-card .other-details .details .other #cloud').style.display='block';
      document.querySelector('.main-card .other-details .details .other #cloud p').innerText=`${data.clouds.all}%`
    }
    if(data.rain)
      {
        document.querySelector('.main-card .other-details .details .other #rain').style.display='block';
        document.querySelector('.main-card .other-details .details .other #rain p').innerText=`${data.rain['1h']}mm/h`
      }
      if(data.snow)
      {
        document.querySelector('.main-card .other-details .details .other #snow').style.display='block';
        document.querySelector('.main-card .other-details .details .other #snow p').innerText=`${data.snow['1h']}mm/h`
      }








    
})
// image.innerHTML=`<h1>${city_name}</h1>`;
});

// let val;

