let form= document.getElementById("addUser");
let url="https://mock5-05mv.onrender.com/"
form.onsubmit= async (event)=>{
event.preventDefault();

let name= form.name.value;
let profile_picture= form.image.value;
let email= form.email.value;
let password= form.password.value;
let profession= form.prof.value;
let skills= form.skills.value.split(",");
let hourly_rate= +form.rate.value;
let isBooked= false;

let obj={name,profile_picture,email,password,profession,skills,isBooked,hourly_rate};
// console.log(obj);
let res= await fetch(`${url}/freelancers`, {
    method:'POST',
    body:JSON.stringify(obj),
    headers:{
        'Content-Type':'application/json'
    }

   });
    let data= await res.json();
    window.alert("Successfully registered.")
}