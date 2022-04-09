const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
const  url="https://testapi.io/api/DucVo177/Api music";
var songs=[]


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
            
         }
  }

app.start()
})
.catch(function(err){
  console.log(err)
})



const body=$("body"),
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
  player=$(".pause-play"),
  cd=$(".navbar .playing"),
  
  
  PLAYER_STORAGE_KEY='song';
  const artist=$$(".artist-onplay"),
  heading=$$(".title-onplay"),
  imageThumb= $$(".image-onplay");

 
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
 

  
