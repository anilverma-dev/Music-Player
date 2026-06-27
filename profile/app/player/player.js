var current_user = sessionStorage.getItem("user");

var video = document.getElementById("video_player");
// play btn coding
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
  if(play_btn.className == "fa-solid fa-circle-play")
  {
    video.play();
    play_btn.className = "fa-solid fa-circle-pause";
  }
  else if(play_btn.className == "fa-solid fa-circle-pause")
  {
    video.pause();
    play_btn.className = "fa-solid fa-circle-play";
  }

}

// Progress bar and Video Timing coding
// timing coding :- lecture 50 part 23 
video.ontimeupdate = function()
{
  var t_duration = this.duration;
  var c_duration = this.currentTime;
  var v_timing = document.getElementById("v_timing");
  var p_bar = document.getElementById("progress_bar");
  // Yha pr phele current time nikala gya h and then use minute me convert kiya gaya h and then use second me convrt kiya gya h and current second nikalne ke liye use current duration(time) me se minus kiya gya h
  var sec = c_duration - parseInt(c_duration/60)*60;
  var t_sec = t_duration - parseInt(t_duration/60)*60;
  v_timing.innerHTML = parseInt(c_duration/60)+":"+ parseInt(sec)+" / "+parseInt(t_duration/60)+":"+parseInt(t_sec);
  var slide_per = c_duration*100/t_duration;
  p_bar.style.width = slide_per+"%";

  if(c_duration == t_duration)
  {
    play_btn.className = "fa-solid fa-circle-play";
  }
  
}

var add = document.getElementById("open_video_add_btn");
var add_box = document.getElementById("add_video_box");

add.onclick = function(){
  if(add.className == "fa-solid fa-circle-plus")
  {
    add_box.style.display = "block";
    add.className = "fa-regular fa-circle-xmark";
  }

  else if(add.className == "fa-regular fa-circle-xmark")
  {
    add_box.style.display = "none";
    add.className = "fa-solid fa-circle-plus";
  }
}

// Add video in Local storage

var add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function()
{
  var v_name = document.getElementById("video_name");
  var v_link = document.getElementById("video_link");
  
  if(v_name.value != "" && v_link.value != "")
  {
  var v_obj = {name:v_name.value,link:v_link.value};
  var v_txt = JSON.stringify(v_obj);
  localStorage.setItem(current_user+"video"+v_name.value,v_txt);
  }
} 

// Fetch all videos from local storage

function load_video(){
  var i;
  for(i=0; i<localStorage.length; i++)
  {
    var all_keys = localStorage.key(i);
    if(all_keys.match(current_user+"video"))
    {
      v_data = localStorage.getItem(all_keys);
      video_obj = JSON.parse(v_data);
      
      var div = document.createElement("div");
      div.setAttribute("id","main_video_box");

      var p = document.createElement("p");
      p.setAttribute("id","playlist_video_name");
      p.setAttribute("class","all_v_name");
      p.innerHTML = video_obj.name;

      var play_bt = document.createElement("button");
      play_bt.setAttribute("id","video_play_btn");
      play_bt.setAttribute("type","button");
      play_bt.setAttribute("url",video_obj.link);
      play_bt.className = "v_play_btn";
      play_bt.innerHTML = "Play";

      var del_btn = document.createElement("button");
      del_btn.setAttribute("id","video_delete_btn");
      del_btn.setAttribute("type","button");
      del_btn.className = "delete_btn";
      del_btn.innerHTML = "Delete";

      div.appendChild(p);
      div.appendChild(play_bt);
      div.appendChild(del_btn);
      
      var buttom = document.getElementById("buttom");
      buttom.appendChild(div);
    }
  }
}

load_video();

// onclick video play button coding

function play_video()
{
  var all_v_play_btn = document.getElementsByClassName("v_play_btn");
  var i;
  for(i=0; i<all_v_play_btn.length; i++)
  {
    all_v_play_btn[i].onclick = function()
    {
      clear();
      var v_url = this.getAttribute("url");
      var src_tag = document.getElementById("video_src");
      src_tag.setAttribute("src",v_url);
      video.load();
      video.play();
      play_btn.className = "fa-solid fa-circle-pause";  
      this.innerHTML = "Playing...";
      
    }

  }
}

play_video();

function clear()
{
  var all_v_play_btn = document.getElementsByClassName("v_play_btn");
  var i;
  for(i=0; i<all_v_play_btn.length; i++)
  {
    all_v_play_btn[i].innerHTML = "Play";
  }
}

// next button coding

function next_button()
{
  var next_btn = document.getElementById("right_btn");
  next_btn.onclick = function()
  {
    var all_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0; i<all_play_btn.length; i++)
    {
     if(all_play_btn[i].innerHTML == "Playing...")
     {
      var next_element = all_play_btn[i].parentElement.nextElementSibling;
      var next_play_btn = next_element.getElementsByClassName("v_play_btn")[0];
      next_play_btn.click();
      return false;
     }
    }
  }
}

next_button();

// Previous button coding

function previous_button()
{
  var previous_btn = document.getElementById("left_btn");
  previous_btn.onclick = function()
  {
    var all_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0; i<all_play_btn.length; i++)
    {
     if(all_play_btn[i].innerHTML == "Playing...")
     {
      var previous_element = all_play_btn[i].parentElement.previousElementSibling;
      var previous_play_btn = previous_element.getElementsByClassName("v_play_btn")[0];
      previous_play_btn.click();
      return false;
     }
    }
  }
}

previous_button();

// Delete Button coding

function delete_song()
{
  var all_del_btn = document.getElementsByClassName("delete_btn");
  var i;
  for(i=0; i<all_del_btn.length; i++)
  {
    all_del_btn[i].onclick = function()
    {
      var parent = this.parentElement;
      var  vid_name = parent.getElementsByTagName("p")[0].innerHTML;
      localStorage.removeItem(current_user+"video"+vid_name);
      
      parent.className = "animate__animated animate__bounceOut";
      setTimeout(function()
    {
      parent.remove();
    },1000);
    }
  }
  
}

delete_song();
 
// volume icon coding

function volume(){
  var vol_icon = document.getElementById("volume");
  vol_icon.onclick = function()
  {
    var range = document.getElementById("vol_control");
    if(range.style.display == "none")
    {
      range.style.display = "block";
      range.oninput = function()
      {
        video.volume = this.value;
      }
    }
    else
    {
      range.style.display = "none";
    }

  }
}

volume();

// video forword and backword by progress bar coding

var p_box = document.getElementById("progress_box");

// yha event ek variable ki trah kaam kr rha h jisme mouse event store ho rha h
p_box.onclick = function(event)
{
  // offsetX ek property h jisse progress bar pr click krne wale point tak ki width h
  // offsetWidth se video ki full width nikal jati h.
  var per = event.offsetX/this.offsetWidth;
  video.currentTime = per*video.duration;
}

// fullscreen coding

var full = document.getElementById("full_screen");
full.onclick = function()
{
  video.requestFullscreen();
}

// speed ya seeting icon coding

var speed = document.getElementById("setting");
speed.onclick = function()
{
  var speed_silder = document.getElementById("speed_control");
  if(speed_silder.style.display == "none")
  {
    speed_silder.style.display = "block";
    speed_silder.oninput = function()
    {
      video.playbackRate = this.value;
    }
    
  }
  else
  {
    speed_control.style.display = "none";
  }
}

// Functionallity of Search Bar


  var search = document.getElementById("search");

search.oninput =  function()
{
  var all_video_name = document.getElementsByClassName("all_v_name");

  var i;
  for(i=0; i<all_video_name.length; i++)
  {
    if(all_video_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase()))
    {
      all_video_name[i].parentElement.style.display = "block";
    }    
    else
    {
      all_video_name[i].parentElement.style.display = "none";
    }
  }

}

