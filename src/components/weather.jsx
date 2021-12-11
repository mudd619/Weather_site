import "./weather.css";
import ApexCharts from 'apexcharts'
import App11 from "./chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton, Stack } from "@mui/material"

var id;
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]


function Weather(){

    const [inp,setInp] = useState("");
    const [dat,setData] = useState([""]);
    const [flex,setFlex] = useState([]);
    const [flexChange,setFlexChange] = useState([]);

    const [loading , setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [dayNo , setDayNo] = useState(new Date());
    const [sunset , setSunset] = useState("");
    const [sunrise , setSunrise] = useState("");

    //Function to add border onfocus on the input box
    const handleFocus = ()=>{
        let inpu = document.getElementById("div-one");

        inpu.style.border = "2px solid rgb(91,179,231)";
        inpu.style.padding = "7px 9px"
    }

    //function to remove border when not focused ont the input box
    const handleBlur = ()=>{
        let inpu = document.getElementById("div-one");

        inpu.style.border = "1px solid rgb(231,231,232)";
        inpu.style.padding = "8px 10px";
    }

    //to add and remove borders flex component and maintain the main section
    const handleBorder = (i,el)=>{
        let bor = document.querySelectorAll(".div-two-sub");
        bor.forEach((el)=>{
            el.style.border = "1px solid rgb(242, 242, 243)";
            el.style.padding = "5px 10px";
        })

        let borDiv = document.getElementById(i);
        borDiv.style.border = "2px solid rgb(91,179,231)";
        borDiv.style.padding = "4px 9px";

        setFlexChange([el]);
        
        var time = new Date(el.sunset)
        var hours  = ( time.getHours());
        var minutes = ( time.getMinutes());
        setSunset(`${hours}:${minutes}pm`);
        var time1 = new Date(el.sunrise);
        var hours1  = (time1.getHours());
        var minutes2 = ( time1.getMinutes());
        setSunrise(`${hours1}:${minutes2}am`)
    }

    const update = ()=>{
        var sun = document.querySelector('.sun');
        var x = Math.random() * 180;
        var y = Math.random() * 40;
        
        sun.style.transform="rotateX("+y+"deg) rotate("+x+"deg)"
    }


    const handleInp = (e)=>{
        let change = document.getElementById("chan");
        let changing = document.getElementById("changing");
        changing.style.display = "none"
        change.style.display = "block"
        setInp(e.target.value)
    }

    function showPosition(position) {
        handleInpData("","",position.coords.latitude,position.coords.longitude)
    
    }

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            return alert("Geolocation not supported on this browser")
        }
    },[])

    //to find name of the places
    useEffect(()=>{
        let drop_down = document.getElementById("drop-down");
        if(inp.length < 2){
            drop_down.style.display = "none"
            return
        }
        drop_down.style.display = "block"
        if(id){
            return
        }
        id = setTimeout(()=>{
            place();
            id = undefined
        },500)
    },[inp])


    function place(){
        let change = document.getElementById("chan");
        let changing = document.getElementById("changing");
        let input_value = document.getElementById("input-box").value
        axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input_value}&apiKey=${process.env.REACT_APP_FIRST_KEY}`)
        .then((res)=>{
            setData(res.data.features);
            
            change.style.display = "none"
            changing.style.display = "block";
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleInpData = (city,state,lat,lon)=>{
        setLoading(true)
        let input_box = document.getElementById("input-box");
        let changing = document.getElementById("changing");
       
        changing.style.display = "none"
        input_box.value = city ? state ?  `${city} , ${state}` : `${city}` : ""
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${process.env.REACT_APP_SECOND_KEY}`)
        .then((res)=>{
            setLoading(false)
            
            setFlex(res.data.daily);
            setFlexChange([res.data.daily[0]])
          
            var time = new Date(res.data.daily[0].sunset)
            var hours  = ( time.getHours());
            var minutes = ( time.getMinutes());
            setSunset(`${hours}:${minutes}pm`);
            var time1 = new Date(res.data.daily[0].sunrise);
            var hours1  = (time1.getHours());
            var minutes2 = ( time1.getMinutes());
            setSunrise(`${hours1}:${minutes2}am`)
            // console.log([ time.getFullYear(), mnth, day, hours, minutes ].join("-"))
            // //current day
            // var d = new Date()
            // console.log(days[Number(d.getDay())])

        })
        .catch((err)=>{
            setLoading(false);
            setError(true);
            console.log(err)
        })
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
      function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
      }
    
      const {  width, height } = useWindowDimensions()
   


    return <div className="container">
    <div id="div-one">
        <img className="img1" src="https://as2.ftcdn.net/v2/jpg/02/72/89/67/1000_F_272896745_tlTivOH81qWIVzz34KqFGm8LO3N9hMYQ.jpg"/>
        <input autoComplete="off" id="input-box" onChange={handleInp} onBlur={handleBlur} onFocus={handleFocus} placeholder="Enter Location"/>
        <img style={{cursor:"pointer"}} src="https://as1.ftcdn.net/v2/jpg/03/25/73/68/1000_F_325736897_lyouuiCkWI59SZAPGPLZ5OWQjw2Gw4qY.jpg"/>    
    </div>
    <div id="drop-down">
        
        <div id="changing">
            {
                dat[0] ? dat.map((el,i)=>{
                        if(!el.properties.name){
                            return
                        }
                    return <div onClick={()=>handleInpData(el.properties.name,el.properties.state,el.properties.lat,el.properties.lon)} key={i} className="drop all"><span style={{fontWeight:"700"}}>{el.properties.name}</span>{el.properties.state ? ` , ${el.properties.state}` : ""}</div>
                    }) : 
                <div id="change" className="drop">No Places Found</div>
            }
        </div>
        <div id="chan" className="drop">...Loading</div>
    </div>
    {
        loading ? <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
      </Stack> : error ? "...error" : <div>
        <div className="div-two">
            {
                flex.map((el,i)=>{
                    if(i>=7){
                        return
                    }
                    return <div style={i===0 ? {fontWeight:"700",border:"2px solid rgb(91,179,231)",padding:"4px 9px"} : {}} key={i} id={i} onClick={()=>handleBorder(i,el)} className="div-two-sub">
                        <span>{days[(Number(dayNo.getDay())+i)%7]}</span><br/>
                        <span>{(el.temp.day-273.15).toFixed(2).split(".")[0]}°</span><span style={{color:"rgb(150,150,151)",marginLeft:"5px"}}>{(el.temp.day-273.15).toFixed(2).split(".")[1]}°</span><br/>
                        <img src={el.weather[0].main==="Clouds" ? "https://t4.ftcdn.net/jpg/01/15/96/61/240_F_115966155_JYIkOiNCvtqejjp9Zcz9KkV7JV75DIWN.jpg" : el.weather[0].main==="Rain" ? "https://t4.ftcdn.net/jpg/02/76/10/21/240_F_276102172_sEJktLJElRTXnp00tskBzHwXIcJuOc97.jpg" : el.weather[0].main==="Snow" ? "https://t4.ftcdn.net/jpg/01/26/18/77/240_F_126187797_CWWtNWjIe2yEOMqx0GApOeQFr1IWzo52.jpg" : "https://cdn-icons.flaticon.com/png/512/3073/premium/3073665.png?token=exp=1639062613~hmac=2c982de046b19fa19314de8612cb3a64"}/>
                        <br/><span className="font1" style={{color:"rgb(150,150,151)"}}>{el.weather[0].main}</span>
                    </div>
                })
            }
        </div>
        {
            flexChange[0] ? <div className="div-three">
            <div style={{display:"flex"}}>
                <span id="div-three-degree">{(flexChange[0].temp.day-273.15).toFixed(2).split(".")[0]}° C</span>
                <img src={flexChange[0].weather[0].main==="Clouds" ? "https://t4.ftcdn.net/jpg/01/15/96/61/240_F_115966155_JYIkOiNCvtqejjp9Zcz9KkV7JV75DIWN.jpg" : flexChange[0].weather[0].main==="Rain" ? "https://t4.ftcdn.net/jpg/02/76/10/21/240_F_276102172_sEJktLJElRTXnp00tskBzHwXIcJuOc97.jpg" : flexChange[0].weather[0].main==="Snow" ? "https://t4.ftcdn.net/jpg/01/26/18/77/240_F_126187797_CWWtNWjIe2yEOMqx0GApOeQFr1IWzo52.jpg" : "https://cdn-icons.flaticon.com/png/512/3073/premium/3073665.png?token=exp=1639062613~hmac=2c982de046b19fa19314de8612cb3a64"}/>
            </div>
            <div id="chart">
                <App11 dim={[width,height]} vall={[flexChange[0].temp]}/>
            </div>
            <div className="div-three-sub">
                <div className="sub-1">
                    <span style={{fontWeight:"700",color:"black"}}>Pressure</span><br/>
                    {flexChange[0].pressure} hpa
                </div>
                <div className="sub-1">
                    <span style={{fontWeight:"700",color:"black"}}>Humidity</span><br/>
                    {flexChange[0].humidity} %
                </div> 
            </div>
            
            <div>
                <div className="contain">
                    <div className="div-above">
                        <div style={{width:"10%"}} className="sub-1 sub-3">
                            <span style={{fontWeight:"700",color:"black"}}>Sunrise</span><br/>
                            {sunrise}
                        </div>
                        <div style={{width:"10%"}} className="sub-1 sub-2">
                            <span style={{fontWeight:"700",color:"black"}}>Sunset</span><br/>
                            {sunset}
                        </div> 
                    </div>
                    <div className="sun">

                    </div>
                </div>
                {/* <button onClick={update}>update</button> */}
            </div>
        </div> : ""
        }
    </div>
    }
</div>
}

export {Weather};
