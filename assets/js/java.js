const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const  url="https://testapi.io/api/DucVo233/Api music";
var songs=[]
var onClick=0;





const body=$("body"),
  menu=$(".menu-links"),
  navLink=$$(".nav-link"),
  navbar=$(".navbar"),
  button=$$(".nav-link .button"),
  frame=$$("iframe"),
  sidebar=$(".sidebar"),
  toggle=$(".toggle"),
  searchBtn=$(".search-box"),
  modeSwitch=$(".toggle-switch"),
  moonSun=$(".moon-sun"),
  playPause=$(".pause-play"),
  modeText=$(".mode-text"),
  playBtn=$(".play"),
  btnRandom=$(".shuffle"),
  btnPrev=$(".prev"),
  btnNext=$(".next"),
  btnRepeat=$(".replay"),
  chooseSong=$(".list-item"),
  progress=$(".progress"),
  playlist=$(".list-song"),
  cdThumb=$(".song .image-onplay"),
  audio=$("#audio"),
  heart=$(".hover-layer .heart"),
  player=$(".pause-play"),
  cd=$(".navbar .playing"),
  home=$(".home.layer"),
  suggest=$(".suggest")
  listMV=$(".list-mv"),
  mv=$(".mv"),
  wrap=$(".wrapper"),
  
  PLAYER_STORAGE_KEY='song';
  const artist=$$(".artist-onplay"),
  heading=$$(".title-onplay"),
  imageThumb= $$(".image-onplay");

  //My-playlist active
  
    fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    const app={
      isPlaying: false,
      isRandom:false,     
      isRepeat:false,                                                                                                                                      
      currentIndex: 0,
      
      config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||{},
      songs:  data.songs ,
    setConfig: function(key,value) {
      this.config[key]=value;
      localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
         } , 
      //Hàm render
      render: function(){
        
        const htmls= this.songs.map((song, index) =>{
          
          return `
       <li class="list-item ${index ===this.currentIndex?'active':''} "data-index="${index } ">
       <div class="play-hover">
        <i class='bx bx-play'></i>
     </div>
       <img src="${song.image}" alt="" class="image">
     
       <div class="descib">
         <h1 class="title text">${song.name}</h1>
         <span class="artist text">${song.singer}</span>
     </div>
     <span class="time text" >${song.time}</span>
   </li>
  
       `
       
        })
        playlist.innerHTML =htmls.join('');
        },
        //Hàm render2
      render2: function(){
        
        const htmls= this.songs.map((song, index) =>{
          this.currentIndex=index
          return `
      
       `
       
        })
        playlist.innerHTML =htmls.join('');
        },
  
  
        defineProperties: function(){
          Object.defineProperty(this,'currentSong', {
            get: function(){
              return this.songs[this.currentIndex];
            }
          })  
        },
        
  
        handleEvents: function(){
          const _this=this
          //Xử lý CD quay/dừng
          const cdThumbanimate=cdThumb.animate([
            { transform: 'rotate(360deg)'}
          ],{duration: 10000,//10s
         interaction:Infinity 
         }
          )
          cdThumbanimate.pause()
          //Lắng nghe sự kiện click play
          playBtn.onclick= function(){
            if(_this.isPlaying){
             
              audio.pause()
             
            }else{
             
            audio.play()
             
            }
            audio.ontimeupdate= function(){
              if(audio.duration){
                const progressPercent=Math.floor(audio.currentTime/audio.duration*10000)
                progress.value=progressPercent
              }
              //Xử lý khi tua song 
              progress.onchange= function(e){
                const seekTime=e.target.value*(audio.duration /10000)
                audio.currentTime= seekTime
              }
            }
            //Xử lý khi pause
            audio.onpause= function(){
             _this.isPlaying=false;
             cdThumbanimate.pause()
             player.classList.remove("playing")
            }
            //Xử lý khi play
            audio.onplay=function(){
             _this.isPlaying=true;
             cdThumbanimate.play()
             player.classList.add('playing')
            }
            //Khi next song
            btnNext.onclick=function(){
              if(_this.isRandom){
                _this.playRandomSong()
              }else{
               _this.nextSong()
              }
            
              audio.play()
              _this.render()
              
            }
            //Khi prev song
            btnPrev.onclick=function(){
             if(_this.isRandom){
                _this.playRandomSong()
              }else{
               _this.prevSong()
              }
            
              audio.play()
              _this.render()
             
            }
            //Khi bật tắt ramdom song
            btnRandom.onclick=function(){
              _this.isRandom=!_this.isRandom        
              _this.setConfig('isRandom',_this.isRandom)                                                                                                                                   
              btnRandom.classList.toggle("active",_this.isRandom)
              
              
            }
            //Xử lý next song khi audio ended
            audio.onended=function(){
            
              if(_this.isRandom){
                _this.playRandomSong()
              }else{
                if(_this.isRepeat){
                  audio.play()
                }else{
                  _this.nextSong()
                }
               
              
            }
          
              
            
              audio.play()
            
            }
            //Xử lý repeat btn
            btnRepeat.onclick=function(){
              _this.isRepeat=!_this.isRepeat
              _this.setConfig('isRepeat',_this.isRepeat)  
              btnRepeat.classList.toggle("active",_this.isRepeat)
              
            }
            //Lắng nghe khi nhấn vào playlist 
            playlist.onclick=function(e){
              
             const songNote=e.target
             const data=songNote.getAttribute("data-index")
             
               _this.currentIndex=Number(data)
               _this.loadCurrentSong()
               _this.render()
               audio.play()
             
            }
          }
   
        
        },
  
        loadCurrentSong: function(){
          
          
          for(var i=0;i<heading.length;i++){
            heading[i].textContent= this.currentSong.name
          }
         
          for(var i=0;i<artist.length;i++){
            artist[i].textContent= this.currentSong.singer
          }
          for(var i=0;i<imageThumb.length;i++){
            imageThumb[i].src=`${this.currentSong.image}`
          }
         
          audio.src=this.currentSong.path
          },
          loadConfig: function(){
            this.isRandom=this.config.isRandom
            this.isRepeat=this.config.isRepeat
          },
          nextSong: function(){
            this.currentIndex++
            if(this.currentIndex>= this.songs.length -1){
              this.currentIndex=0
          }
          this.loadCurrentSong()
          this.render()
         },
         prevSong: function(){
           this.currentIndex--
           if(this.currentIndex<= 0){
             this.currentIndex=this.songs.length-1
           }
           this.loadCurrentSong()
         },
        playRandomSong:function(){
          let newIndex
          do{
             newIndex=Math.floor(Math.random() *this.songs.length);
          }while(newIndex ==this.currentIndex)
         this.currentIndex=newIndex
         this.loadCurrentSong()
        },
        
        playClickSong: function(){
            console.log(song)
        },
      
           start: function(){
             //Gán cấu hình vào app
             this.loadConfig()
             //Định nghĩa các thuộc tính cho Object
             this.defineProperties()
            
             //Lắng nghe/xử lý các sự kiện
             this.handleEvents()
             
             //Tải thông tin bài hát đầu tiên vào UI
             this.loadCurrentSong()
              //Render playlist
              this.render()
              
           },
          
    }
    if(button[0].classList.contains("active")){
      app.start()
    }
    mvToggle=function(){
      
    }
    //Xử lý khi click sidebar
    menu.onclick = function(e){
      if(e.target.getAttribute("index")!=undefined ){
        e.target.classList.toggle('active')
        button[onClick].classList.toggle('active')
        onClick=e.target.getAttribute("index")
        
      }
      if(e.target.getAttribute("index")=='0'){
        home.setAttribute("style","display:none;")
        navbar.setAttribute("style","display:block;")
        sidebar.setAttribute("style","height:85%;")
       }
      if(e.target.getAttribute("index")=='1'){
        navbar.setAttribute("style","display:block;")
        home.setAttribute("style","display:block;")
        sidebar.setAttribute("style","height:85%;")
        home.innerHTML=""
        home.innerHTML+=` <div class="slideshow-container">
        <div class="mySlides fade">
          <img src="/assets/slider/slider1.jpg" >
        </div>
        <div class="mySlides fade">
          <img src="/assets/slider/slider2.jpg" >
        </div>
        <div class="mySlides fade">
          <img src="/assets/slider/slider3.jpg" >
        </div>
        <div class="mySlides fade">
            <img src="/assets/slider/slider4.jpg" >
          </div>
        </div>
        <h1 class="describ text">Có Thể Bạn Muốn Nghe</h1>
   
       
    `
    //Slider
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  
  slides[slideIndex-1].style.display = "block"; 
  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
        var renderHome= function(){
          
          const htmls= data.playlist.map((play) =>{
           
            return `    
            <div class="suggest"> 
                            
            <div class="playlist">
              <div class="hover-layer">
              <i class='bx bxs-heart icon heart'></i>
                <i class='bx bx-play-circle plays' ></i>
                <i class='bx bx-dots-horizontal-rounded icon' ></i>
              </div>
              <div class="wrapper">
                <img src="${play.image}" alt="" class="image">
              </div>
           
              <h1 class="name text">${play.name}</h1>
              <p class="sub text">${play.describ}</p>
            </div>
            `   
          })
          home.innerHTML +=htmls;
          }
          renderHome()
         
       }
       if(e.target.getAttribute("index")=='2'){
        home.setAttribute("style","display:block;")
        navbar.setAttribute("style","display:block;")
        sidebar.setAttribute("style","height:85vh;")

       
       }
       if(e.target.getAttribute("index")=='3'){
        home.setAttribute("style","display:block;")
        navbar.setAttribute("style","display:none;")
        sidebar.setAttribute("style","height:100vh;")

        home.innerHTML=` <div class="tab">
        <h1 class="describ text">M/V</h1>
        <ul class="category">
          <li class="category-item text active">VIET NAM</li>
          <li class="category-item text">US-UK</li>
          <li class="category-item text">KPOP</li>
          
        </ul>
        
      </div>
      <iframe class="mv first" width="1500" height="750" src="https://www.youtube.com/embed/P8qEusQiwsw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="list-mv">
       <iframe class="mv" width="400" height="250" src="https://www.youtube.com/embed/DJN4SovWq7Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       <iframe class="mv" width="400" height="250" src="https://www.youtube.com/embed/Yw9Ra2UiVLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       <iframe class="mv" width="400" height="250" src="https://www.youtube.com/embed/exZfx7P8s5o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       <iframe class="mv" width="400" height="250" src="https://www.youtube.com/embed/rym-6cROUwk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

     </div>`
       }
       

      
      
     

    }
    
    
  })
  .catch(function(err){
    console.log(err)
  })
  
  //Home page

  toggle.addEventListener("click",()=>{
    sidebar.classList.toggle("close");
  })
  
    
  //Dark mode
  modeSwitch.addEventListener("click",()=>{
      body.classList.toggle("dark");
      if(body.classList.contains("dark")){
        modeText.innerHTML="Light mode";
        moonSun.innerHTML=`<i class='bx bx-moon icon moon' ></i>` 
      }
      else{
        modeText.innerHTML="Dark mode";
        moonSun.innerHTML=`<i class='bx bx-sun icon sun' ></i>`
      }
  });
 



//Định nghĩa Rules

Validator.isRequired = function(selector){
  return {
      selector:selector,
      test: function(value){
        return value.trim()? undefined :'Vui lòng nhập trường này'
   
      }
  };
}
Validator.isEmail = function(selector){
 return {
      selector:selector,
      test: function(value){
          var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value) ?  undefined : "Vui lòng nhập email"
      }
  };
}
Validator.minLength= function(selector){
  return{
      selector:selector,
      test: function(value){
           var length=6;
           if(value.length<length){
               return "Vui lòng nhập mật khẩu dài hơn 6 ký tự";
           }
      }
  }
}
Validator.isComfirmed = function(selector,getConfirmValue,message){
  return{
      selector:selector,
      test: function(value){
    return value===getConfirmValue() ? message : "Giá trị nhập vào không chính xác";
      }
  }
}
//Login
Validator({
  form:'#form-1',
  errorSelector:'.form-message',
  rules:[
      Validator.isRequired('#fullname'),
      Validator.isEmail('#email'),
      Validator.isRequired('#email'),
      Validator.minLength('#password'),
      Validator.isComfirmed('#password_confirmation',function(){
        return document.querySelector('#form-1 #password').value;
      },'Mật khẩu nhập lại không chính xác')
  ],
  onSubmit:function(data){
  console.log(data);
  }
});
//Đối tượng Validator
function Validator(options) {
  var selectorRules={
  
  };

//Hàm thực hiện validate
  function validate(inputElement,rule){
  var errorMessage;
  var errorElement=inputElement.parentNode.querySelector(options.errorSelector);    
  //Lấy ra các rule của selector   
  var rules=selectorRules[rule.selector];       
  //Lặp ra từng rule và kiểm tra
  //Nếu có lỗi thì dừng kiểm tra
  for(var i=0;i < rules.length;++i){
     errorMessage= rules[i](inputElement.value);
     if(errorMessage) break;
  }
  if(errorMessage){
      errorElement.innerText=errorMessage;
      inputElement.parentElement.classList.add('invalid')
     
  }else{
      errorElement.innerText='';
      inputElement.parentElement.classList.remove('invalid')

  }
  return!! errorMessage;
 }


//Lấy elements của form cần validate
  var formElement=document.querySelector(options.form)
  if(formElement){    
      submit.onclick=function(){
        if(fullname.value=="dcm"&& password.value=="dcm"){
          window.location.href="index.html" 
         }
      }
      //Khi submit form
      formElement.onsubmit=function(e){
        e.preventDefault();
        
          var isFormValid= true;
          //Lặp qua từng rule và validate 
          options.rules.forEach(function(rule){
              var inputElement= formElement.querySelector(rule.selector);
              var isValid=validate(inputElement,rule)
              if(!isValid){
                  isFormValid=false;
              }
          });
         
         
          if(isFormValid){
              //Trường hợp submit với javascript
              if(typeof options.onSubmit==='function'){
                  var enableInputs=formElement.querySelectorAll('[name]');
                  var formValues=Array.from(enableInputs).reduce(function(values,input){
                  values[input.name]=input.value ;
                  
                   return values;
                
                },{});
                  options.onSubmit(formValues);
                  
              }
          }else{
             formElement.submit();
          }
          
      }
      //Lặp qua mỗi rule và xử lý
      options.rules.forEach(function(rule){
          var inputElement= formElement.querySelector(rule.selector);
          //Lưu lại rule cho mỗi input
          if(Array.isArray(selectorRules[rule.selector])){
              selectorRules[rule.selector].push( rule.test)
          }else{
          selectorRules[rule.selector]=[rule.test]
          }
          if(inputElement){
              //Xử lý trường hợp blur
              inputElement.onblur= function(){
                  validate(inputElement,rule)
              }
              //Xử lý mỗi khi người dùng nhập vào input
              inputElement.oninput= function(){
                  var errorElement=inputElement.parentNode.querySelector(options.errorSelector);    
                  errorElement.innerText='';
                  inputElement.parentElement.classList.remove('invalid')
              }
          }
      })
  }

  

}
