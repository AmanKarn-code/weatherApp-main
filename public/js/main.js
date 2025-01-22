const searchbtn=document.getElementById("searchbtn");
const cityName=document.getElementById("cityName");
const searchStatus=document.getElementById("searchStatus");
const temp=document.getElementById("temp");
const tempStatus=document.getElementById("tempStatus");
const hide=document.getElementById("hide")


const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    // console.log(cityVal);
    if(cityVal === ""){
        hide.classList.add("hide")
        searchStatus.innerHTML="please enter a valid city"
    }else{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=59373e6d80a2123494ade7c0f0bbfd15`
            const response=await fetch(url);
            // console.log(response);
            const data=await response.json()
            const arrData=[data]
            // console.log(arrData)

            searchStatus.innerText=`${arrData[0].name},${arrData[0].sys.country}`
            temp.innerText=`${arrData[0].main.temp}`;
            const tempMode=arrData[0].weather[0].main;

            if (tempMode =="Clear") {
                tempStatus.innerHTML='<i class="fa fa-sun-o" style="color: #ffff00;"></i>'
            } 
            else if (tempMode =="Clouds"){
                tempStatus.innerHTML='<i class="fa fa-cloud" style="color: #ffff;"></i>'
            }
            else if (tempMode =="Rain"){
                tempStatus.innerHTML='<i class="fa fa-tint" style="color: #4ddce3"></i>'
            }else{
                tempStatus.innerHTML='<i class="fa fa-sun-o" style="color: #ffff00"></i>'
            }
            hide.classList.remove("hide")
        } catch {
            searchStatus.innerText="please enter a valid city"
            hide.classList.add("hide")
        }
    }
}
searchbtn.addEventListener("click",getInfo)