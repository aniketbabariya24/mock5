let freeData;
let page=1;
let url="https://mock5-05mv.onrender.com"

async function getFree(freeData){
    let res= await fetch(`${url}/freelancers?_page=${page}&_limit=4`)
     freeData= await res.json();

    appendData(freeData)
}
getFree(freeData);

let prev= document.getElementById("prev");
let next= document.getElementById("next");

prev.addEventListener("click", function prevPage(){
 page--;
 getFree(freeData);

})
next.addEventListener("click", function nextPage(){
 page++;
 getFree(freeData);

})

let mainDiv= document.getElementById("container");

function appendData(myData){
mainDiv.innerHTML=null;

myData.forEach((el, index)=>{
    let card= document.createElement("div");

    let image= document.createElement("img");
    image.src= el.profile_picture

    let name= document.createElement("h3");
    name.textContent=el.name;
    let email= document.createElement("p");
    email.textContent=`email: ${el.email}`;
    let profession= document.createElement("p");
    profession.textContent=`profession: ${el.profession}`;
    let skills= document.createElement("p");
    skills.textContent=`skills: ${el.skills.join(",")}`;
    let hourly_rate= document.createElement("p");
    hourly_rate.textContent=`hourly rate: ${el.hourly_rate}`;
    let isBooked= document.createElement("p");
    isBooked.textContent=`isBooked: ${el.isBooked}`;

    let editBtn= document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.style.backgroundColor="blue";
    editBtn.onclick=(event)=>{
        event.preventDefault();
        console.log("yes")
    
        myFun(el);

      }

    let deleteBtn= document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.style.backgroundColor="red"
    deleteBtn.onclick= async()=>{
        let bookId= el.id;
        let res= await fetch(`${url}/freelancers/${bookId}`,{
          method:'DELETE',
          headers:{
            'Content-Type': 'application/json'
          }
        });
         freeData= await res.json();
         getFree(freeData);

      }

    let hireBtn= document.createElement("button");
    hireBtn.innerText="Hire Me";
    hireBtn.className="hme"
    hireBtn.style.backgroundColor="green"
    hireBtn.onclick=()=>{
      
        console.log("hire")
    
        myFun2(el);

      }


    card.append(image,name,email,profession,skills,hourly_rate,isBooked,editBtn,deleteBtn,hireBtn)
    mainDiv.append(card);
})

}

function myPFChange(){
   
let myPf= document.getElementById("myPf").value;


    if(myPf==""){
        getFree(freeData);

    } 
    else if(myPf!="" ){

        let getData2=async(freeData)=>{
            apiUrl=`${url}/freelancers?profession=${myPf}`
            
                try {
                    let res= await fetch(apiUrl);
        
            freeData=await res.json();

                    appendData(freeData)
                } catch (error) {
                    console.log("Error while fetching data");
                }
            }
            
            getData2(freeData);

    }
}

async function mysort(){
    try {
        let res= await fetch(`${url}/freelancers?_sort=hourly_rate&_order=asc`);

    freeData=await res.json();

        appendData(freeData)
    } catch (error) {
        console.log("Error while fetching data");
    }
}
async function mysort2(){
    try {
        let res= await fetch(`${url}/freelancers?_sort=hourly_rate&_order=desc`);

    freeData=await res.json();

        appendData(freeData)
    } catch (error) {
        console.log("Error while fetching data");
    }
}

//Update Data
let mid= document.getElementById("mid");
let upName = document.getElementById("upName");
let upEmail = document.getElementById("upEmail");
let upImage = document.getElementById("upImage");
let upPro = document.getElementById("upPro");
let upSkills = document.getElementById("upSkills");
let upRate = document.getElementById("upRate");
let upBook = document.getElementById("upBook");
let update = document.getElementById("update-btn");

function myFun(el){
  mid.value=el.id;
  upName.value=el.name;
  upEmail.value=el.email;
  upImage.value=el.profile_picture;
  upPro.value=el.profession;
  upSkills.value=el.skills.join(", ");
  upBook.value=el.isBooked
  upRate.value=el.hourly_rate;
}

update.onclick=()=>{
  updateFree();
  }
  
  const updateFree= async()=>{
    let id= mid.value;
    let name= upName.value;
    let email= upEmail.value;
    let profile_picture= upImage.value;
    let profession= upPro.value;
    let skills= upSkills.value.split(",");
    let hourly_rate= +upRate.value;
    let isBooked= upBook.value;
  
    let sendData= {name,email,profile_picture,profession,skills,hourly_rate,isBooked};
  
    let res= await fetch(`${url}/freelancers/${id}`, {
      method:'PATCH',
      body: JSON.stringify(sendData),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    freeData= await res.json();
    getFree(freeData);

  }

  const myFun2= async(el)=>{
    let hme= document.getElementsByClassName("hme");
    hme.disabled=true;
    let id= el.id;
    let isBooked= true;
  
    let sendData= {isBooked};
  
    let res= await fetch(`${url}/freelancers/${id}`, {
      method:'PATCH',
      body: JSON.stringify(sendData),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    freeData= await res.json();
    getFree(freeData);
  }

  function check(freeData){
    for(let i=0;i<=freeData.length-1;i++){
        if(freeData[i].isBooked==true){

        }
    }
  }