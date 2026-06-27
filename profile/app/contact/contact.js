
if(sessionStorage.getItem("user") ==  null){
  window.location.replace("../../../index.html");
}

else
{
  var current_user= sessionStorage.getItem("user");

  function profile()
  {
    var profile_pic = document.getElementById("profile_pic");
  var url = localStorage.getItem(current_user+"image");
  profile_pic.style.backgroundImage = "url("+url+")";
  profile_pic.style.backgroundSize = "cover";
  profile_pic.style.backgroundPosition = "center";

  }

  profile();
  // open contact coding start

  var plus = document.getElementById("new_contact");
  plus.onclick = function()
  {
    var bg = document.getElementById("contact_bg");
    bg.style.display = "block";
    
  }

  //  close add_contact_box coding start 

  var close = document.getElementById("close_btn");
  close.onclick = function()
  {
    var contact_bg = document.getElementById("contact_bg");
    contact_bg.style.display = "none";
  } 

  // Add coding start

  var add = document.getElementById("add_btn");
  add.onclick= function()
  {
    var c_name = document.getElementById("c_name");
    var c_num = document.getElementById("c_num");

    if(c_name.value != "" && c_num.value != "")
    {
      var new_contact = {name:c_name.value,number:c_num.value}
      var json_text = JSON.stringify(new_contact);
// current_user session ki key h jo uper h and _contact manually bnai gyi string h.
      localStorage.setItem(current_user+"_contact"+c_name.value,json_text);
    }

    else{
      var c_name = document.getElementById("c_name");
      var c_num = document.getElementById("c_num");
      var warning = document.getElementById("name_num_warning");

      c_name.style.border = "2px solid red";
      c_num.style.border = "2px solid red";
      warning.style.display = "block";

      c_name.onclick = function()
      {
        warning.style.display = "none";
        c_name.style.border = "1px solid purple";
        c_name.style.borderLeft = "5px solid purple";
      }

      c_num.onclick = function()
      {
        warning.style.display = "none";
        c_num.style.border = "1px solid purple";
        c_num.style.borderLeft = "5px solid purple";
      }
      
      return false;
    }
  }

  function all_contact(){
    var i;
    for(i=0; i<localStorage.length; i++)
    {
      var all_keys = localStorage.key(i);

      // By ChatGPT
     if(all_keys && all_keys.startsWith(current_user + "_contact"))


      {
        var json_txt = localStorage.getItem(all_keys);
        var obj = JSON.parse(json_txt);
        

        // Create HTML element in JS

        var contact_box = document.createElement("div");
        var name_p = document.createElement("p");
        var name_i = document.createElement("i");
        var tool = document.createElement("div");
        var edit_i = document.createElement("i");
        var del_i = document.createElement("i");
        var line = document.createElement("hr");
        var num_p = document.createElement("p");
        var num_i = document.createElement("i");

        // Create Parent Element
        name_p.appendChild(name_i);
        // Niche wali line ChatGPT se li gyi h hmari line name_p.innerHTML += " "+obj.name me icon ka error aa rha tha.
        name_p.appendChild(document.createTextNode(" " + obj.name));

        tool.appendChild(edit_i);
        tool.appendChild(del_i);

        num_p.appendChild(num_i);
        num_p.appendChild(document.createTextNode(" " + obj.number));


        contact_box.appendChild(name_p);
        contact_box.appendChild(tool);
        contact_box.appendChild(line);
        contact_box.appendChild(num_p);

        // Set Attribute in Element
        contact_box.setAttribute("id","contact");
        name_i.setAttribute("class","fas fa-user");
        tool.setAttribute("id","tool");
        edit_i.setAttribute("class","fas fa-edit edit");
        del_i.setAttribute("class","fas fa-trash del");
        line.setAttribute("color","purple");
        line.setAttribute("width","75%");
        num_i.setAttribute("class","fas fa-mobile-alt");
        name_p.setAttribute("class","contact_name");

        var all_contact_box = document.getElementById("all_contact_box");
        all_contact_box.appendChild(contact_box);

      }
    }
  }

  all_contact();

  // Functionality of Search box
  function demo(){
  var search = document.getElementById("search");  
  var all_contact_name = document.getElementsByClassName("contact_name");
  var i;
  for(i=0; i<all_contact_name.length; i++)
  {
    if(all_contact_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase()))
    {
      all_contact_name[i].parentElement.style.display = "block";
    }
    else
    {
      all_contact_name[i].parentElement.style.display = "none";
    }
  }
}

// Funtionality of Delete icon
// Lecture 50 part 18

function del()
{
  var del = document.getElementsByClassName("del");
  var i;
  for(i=0; i<del.length;i++)
  {
    del[i].onclick = function(){
      // this = del[i]
      // Yha pr do bar parentElement isliye likha h kyuki ye pehle apna parent div dega and fir parent div ka parent div dega(all_contact_box).
      var parent = this.parentElement.parentElement;
      // p_element me indexing number 0 isliye diya kyuki isme only one element tha(only name).
      var p_element = parent.getElementsByClassName("contact_name")[0];
      // replace ka use isliye kiya kyuki hame <i> tag nhi chahiye hame only name chahiye.
      var username = p_element.innerHTML.replace('<i class="fas fa-user"></i>',"");
      // trim() se jo bhi space hota h vo remove ho jata h.
      // localStorage se data parmanent delete ho jata h
      localStorage.removeItem(current_user+"_contact"+username.trim());
      parent.className = "animate__animated animate__bounceOut";
      setTimeout(function(){
      parent.remove();
    },1000)
    }
  }

}

del();

function edit()
{
  edit_icon = document.getElementsByClassName("edit");
  var i;
  for(i=0; i<edit_icon.length; i++)
  {
    edit_icon[i].onclick = function()
    {
      var parent = this.parentElement.parentElement;
      var para = parent.getElementsByTagName("P");
      var name = para[0].innerHTML.replace('<i class="fas fa-user"></i>',"").trim();
      var num = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>',"").trim();
      var c_name = document.getElementById("c_name");
      var c_num = document.getElementById("c_num");
      var close = document.getElementById("close_btn");

      c_name.value = name;
      c_num.value = num;
      
      var plus_icon = document.getElementById("new_contact");
      plus_icon.click();

      var c_heading = document.getElementById("c_heading");
      c_heading.innerHTML = "Edit Contact";

      var edit_btn = document.getElementById("add_btn");
      edit_btn.innerHTML = "Update";
      close.style.display = "none";

      localStorage.removeItem(current_user+"_contact"+name);
     
      

    }
  }
}

edit();
}