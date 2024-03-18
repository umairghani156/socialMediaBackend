
const signUpUserName = document.querySelector("#signUpUserName");
const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const exampleModal = document.getElementById("exampleModal");
const signUp = async () => {
    try {
        const axiosPost = await axios.post(`/api/v1/register`, {
            userName: signUpUserName.value,
            email: signUpEmail.value,
            password: signUpPassword.value,

        });
        console.log("axiosPost", axiosPost.data);
        exampleModal.classList.add("hidden");
        
    }
    catch (error) {
        console.log("Error!", error);
    }
}

const signUpPopUpBtn = document.getElementById("signUpPopUpBtn");
signUpPopUpBtn.addEventListener("click", signUp);

// LogIn here
const email = document.getElementById("email");
const password = document.getElementById("password");

const logIn = async () =>{
    try{
    //   if(!email.value || !password.value) return alert("Missing fields");

      const axiosLogIn = await axios.post("/api/v1/login", {
          email: email.value,
        password: password.value
      });

      console.log("axiosLogIn", axiosLogIn);
      const {data} =  axiosLogIn;
    //   console.log("data",data.data._id);
      if(data.status === true){
        const obj = {
            userId: data.data._id,
            userName: data.data.userName,
            email: data.data.email,
            
          }
          
          localStorage.setItem("user", JSON.stringify(obj));
          const lcStorage = JSON.parse(localStorage.getItem("user"))
          console.log("lcStorage", lcStorage);
          window.location.href = "./home.html"
      }else{
        console.log("Invalid Credentials");
      }
    }
    catch(error){
        console.log("Error!", error);
    }
}


const logInBtn = document.getElementById("logInBtn");
logInBtn && logInBtn.addEventListener('click', logIn)