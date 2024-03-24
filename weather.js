import { callAPI } from "./fetch.js";

const options = {
   
}

let a=document.getElementById("btn");
a.addEventListener('click',getWeather);

function getWeather(){
    const parent=document.getElementById("parent");
    parent.innerHTML="";
    let inputCity=document.getElementById( "city" ).value;
    if(inputCity==''){
        alert('Please Enter a valid Location');
        return false;
    }
    const k=getUrl(inputCity);
    const request=callAPI(k,options);
    request.then((data)=>{
        renderUI(data);
    });
   
}
function getUrl(inputCity){
    const url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}/?key=42TNNCKTJ244S44MHLM83RCUJ`;
    return url;
}


function renderUI(data){
    
    const parent=document.getElementById("parent");
    parent.classList.add("root");

    data.days.forEach((item) => {
        const divEle=document.createElement("div");
        // date
        divEle.setAttribute("class","child");
        
        const h2=document.createElement('h2');
        let newDate =new Date(item.datetime);
        const options={
            "weekday":"short",
            "day":"2-digit"
        }
        h2.innerText=newDate.toLocaleDateString("en-IN",options);
        divEle.appendChild(h2);
        //ucon
        divEle.appendChild(createDivIcon(item.icon));

        //max-temp
        let h3Max=document.createElement('h3');
        h3Max.innerHTML="Max "+`<strong>${convert(item.tempmax)}</strong>`+"°C";
        divEle.appendChild(h3Max);

        //min temp

        let h3Min=document.createElement('h3');
        h3Min.innerHTML="Min "+`<strong id="min">${convert(item.tempmin)}</strong>`+"°C";
        divEle.appendChild(h3Min);

        
        parent.appendChild(divEle);
        



    });
    const root = document.getElementById('parent');
    const children = root.querySelectorAll('.child');
    children.forEach(item=>{
        item.addEventListener("mouseenter",()=>{
            children.forEach(other=>{
                if(other!==item){
                    other.classList.add("filter");
                }
            })
        })
        item.addEventListener("mouseleave",()=>{
            children.forEach(other=>{
                other.classList.remove("filter");
            })
        })
    })
}


function convert(t){
    return Math.trunc(((t-32)*5/9));
}


function createDivIcon(text){
   const div=document.createElement('div');
    const img= document.createElement('img');
    if(text=="partly-cloudy-day"){
        img.src="https://www.iconbunny.com/icons/media/catalog/product/4/8/484.10-partly-cloudy-i-icon-iconbunny.jpg";
        img.style="border-radius:50% background-color:#f5f6fe height:48px;";
        img.setAttribute('class','icon');
    
        return img;
    }
    else if(text=="clear-day"){
        img.src="https://cdn0.iconfinder.com/data/icons/season-outline-filled/614/12_-_Sunny-1024.png ";
        img.style="border-radius:50% background-color:#f5f6fe height:48px;";
        div.appendChild(img);
        img.setAttribute('class','icon');
        return div;
    }
    else if(text=="cloudy"){
        img.src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png";
        img.style="border-radius:50% background-color:#f5f6fe height:48px ;";
        div.appendChild(img);
        img.setAttribute('class','icon');
        return div;
    }
    else{
        img.src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png";
        img.style="border-radius:50% background-color:#f5f6fe height:48px ;";
        div.appendChild(img);
        img.setAttribute('class','icon');
        return div;
    }
   
   

}
