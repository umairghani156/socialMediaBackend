import { app, auth, storage,ref,uploadBytesResumable, getDownloadURL } from "./utils/firebaseConfig.js";


// displayUserProfile
const displayUserProfile = document.getElementById('displayUserProfile');
const sectionC = document.querySelector('.sectionC-A');
const sectionA = document.getElementById('sectionA');
window.myHandle1 = () => {
  sectionC.classList.remove('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle2()')
}
window.myHandle2 = () => {
  sectionC.classList.add('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle1()')
}
window.myHandle3 = () => {
  sectionC.classList.remove('hide');
  displayUserProfile.setAttribute('onclick', 'myHandle4()')
}
window.myHandle4 = () => {
  sectionC.classList.add('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle3()')
}

// searchBar 

const searchBar = document.querySelector('.searchBar');
const postCard2 = document.getElementById('postCard2')
searchBar.addEventListener('click', function () {
  postCard2.style.display = 'block';
  console.log('chl rha hn');
})

// Upload Image 

const imageUploadBtn = document.getElementById("imageUploadBtn");

// Cross Icon
const crossIconHidden = document.getElementById('crossIconHidden');
crossIconHidden.addEventListener('click', function () {
  sectionA.style.display = 'none'
});

// Close Post Upload PopUp
const closePostUploadPopUp = ()=>{
     console.log("chl rha hn");
     postCard2.style.display ="none"
}
const crossHandler = document.getElementById("crossHandler");
crossHandler.addEventListener("click", closePostUploadPopUp);
// Post Image Handler
// Profile image using data storage
const imgInput = document.getElementById('input-file');
const uploadImgSample = document.getElementById("uploadImgSample")
const spinner = document.getElementById("spinner")
const uplaodImageByBtn =  (file) => {
  return new Promise((resolve, reject)=> {

     const fileName = file.name;
     const storageRef = ref(storage, `post/umair123${fileName.slice(fileName.lastIndexOf("."))}`);
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on('state_changed', 
     (snapshot) => {
  
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
  //  circle.style.background = `conic-gradient(#042e04 ${progress.toFixed() * 3.6}deg, #ededed 0deg)`;
  //  circlValue.innerHTML = progress + "%"
  spinner.style.display = "flex"

   switch (snapshot.state) {
     case 'paused':
       console.log('Upload is paused');
       break;
     case 'running':
       console.log('Upload is running');
       break;
   }
 }, 
 (error) => {
   reject(error)
 }, 
 () => {
   
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     resolve(downloadURL);
   });
 }
);
  })
}


// Render Posts

const postCard = document.querySelector(".postCard");
const lcStorage = JSON.parse(localStorage.getItem("user"));
console.log("lcStorage", lcStorage.userId);
const renderPosts = async () => {
  try {
    const userId = lcStorage.userId;

    axios.post(`http://localhost:3001/api/posts/timeline/all`, {
      userId: userId
    })
      .then((response) => {
        console.log("postHTML", response.data);
        const {data} = response;
        myPostHandler(data)

       
      })
      .catch((error) => {
        console.error('Axios Error:', error);
      });
    // const posts = await axios.get("/api/posts/timeline/all", {
    //   userId: "65bab87393c264ee1aa4febb",
    // }).then(function(response){
    //    console.log("response", response);
    // })
    //console.log("posts", posts);
  }
  catch (error) {
    console.log("error", error);
  }
};
renderPosts()
// Post Function
const postHandler = async () => {
  const lcStorage = JSON.parse(localStorage.getItem("user"))
  const postInput = document.getElementById("postInput").value;
  const axiosPost = await axios.post("/api/posts/", {
    userId: lcStorage.userId,
    userName: lcStorage.userName,
    desc: postInput,
    userEmail: lcStorage.email,
    img: await uplaodImageByBtn(imgInput.files[0])

  });
  console.log("axiosPost", axiosPost);
  renderPosts()
  window.location.reload()
 
}


const postBtn = document.getElementById('postBtn');
postBtn.addEventListener("click", postHandler);

// Post HTML Tags

async function myPostHandler(textPass) {

  console.log(textPass, 'UserDetals I got');
  postCard.innerHTML = ''
  textPass.forEach(element => {
    let card;
    if (element?.img) {
      card = `
        <div class="card" id="postCard">
        <div class="displayPost">
            <div class="post">
            <img src="" alt="" style="border-radius: 50%; width: 30px; height: 30px; margin-right: 5px" >
                <p></p>
            </div>
            <div class="postIcon">
            ${lcStorage.email == element.userEmail ? `<i class="fa-solid fa-ellipsis" id="editBtn" onclick="editBtnHandler('${element._id}')"></i>
            <i class="fa-solid fa-xmark" id="dltBtn" onclick="dltHandler('${element._id}')"></i>` : ''}  
                
            </div>
        </div>
        <p class="postPara">${element.desc}</p>
        <div class="postPic m-2">
            <img class="userImg" id="imgUser" src="${element?.img}" alt=""  >
        </div>
        <p style="margin-left:10px;" class='likeBtn'></p>
        <!-- Like, comment and share -->
        <div class="likeAndComments m-2">
            <div class="thumb" id="likeBtn2">
                <i class="fa-regular fa-thumbs-up"></i>
                <p>Like</p>
            </div>
            <div class="thumb">
                <i class="fa-regular fa-comment"></i>
                <p>Comment</p>
            </div>
            <div class="thumb">
                <i class="fa-solid fa-square-arrow-up-right"></i>
                <p>Send</p>
            </div>
        </div>
    </div> `

    }
    else {
      card = `
                  <div class="card" id="postCard">
                            <div class="displayPost">
                                <div class="post">
                                <img src="${element.img}" alt="" style="border-radius: 50%; width: 30px; height: 30px; margin-right: 5px">
                                <p>${element.userName}</p>
                                </div>
                                <div class="postIcon">
                                ${lcStorage.email == element.userEmail ? `<i class="fa-solid fa-ellipsis" id="editBtn" onclick="editBtnHandler('${element._id}')"></i>
                                <i class="fa-solid fa-xmark" id="dltBtn" onclick="dltHandler('${element._id}')"></i>` : ''}  
                                    
                                </div>
                                
                            </div>
                            <p class="postPara">${element.desc}</p>
                            <!-- Like, comment and share -->
                            <p style="margin-left:10px;" class='likeBtn'></p>
                            <div class="likeAndComments m-2">
                                <div class="thumb" id="likeBtn2">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                    <p>Like</p>
                                </div>
                                <div class="thumb">
                                    <i class="fa-regular fa-comment"></i>
                                    <p>Comment</p>
                                </div>
                                <div class="thumb">
                                    <i class="fa-solid fa-square-arrow-up-right"></i>
                                    <p>Send</p>
                                </div>
                            </div>
                        </div> `
    }
    postCard.innerHTML += card
    postInput.value = '';

    window.dltHandler = async (postId)=>{
      console.log("hello", postId);
      try{
        const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`, {
          data: {
            userId: lcStorage.userId,
          }

        });
        console.log("Post deleted successfully:", response.data);
        
      }
      catch(error){
        console.log("Error deleting post:", error);
      }
    }
  });
}
