window.onload = function()
{
  // Isse browser sessionStorage.getItem("user") se key ko match krke user ko dusre page me profile page ke URl ko open krne se rokega kyuki dusre page me sessionStorage key nhi hogi.
  if(sessionStorage.getItem("user") == null)
  {
    window.location.replace("../index.html");
  }

  else{
    // lecture 50 Part 7

    //Profile name coding
    var user_email = sessionStorage.getItem("user");
    var json_text = localStorage.getItem(user_email);
    var obj_data = JSON.parse(json_text);
    var profile_name = document.getElementById("profile_name");
    //Isse user ka name profile ke niche aa jayega and yha pr atob mathod ka use isliye kiya h kyuki ye username ko fir se Human readable language me convert kr dega. 
    profile_name.innerHTML = atob(obj_data.username);
    // isse main profile page me profile pic ke niche username aa jayega
    document.getElementById("profile_username").innerHTML = atob(obj_data.username);

    // Profile_picture coding
    
      var img_url = localStorage.getItem(user_email+"image");
      var profile_picture = document.getElementById("profile_picture");
      profile_picture.style.backgroundImage = "url("+img_url+")";
      profile_picture.style.backgroundSize = "cover";
      profile_picture.style.backgroundPosition = "center";

      // Logout coding
      var logout = document.getElementById("logout");
      logout.onclick = function()
      {
        sessionStorage.clear();
        var logout_text = document.getElementById("logout_text");
        logout_text.innerHTML = "Please Wait...";
        setTimeout(function()
        {window.location = "../index.html";},2000);
      }
    
    
    if(localStorage.getItem(user_email+"image") != null)
    {
       var page_cover = document.getElementById("page_cover");
          page_cover.style.display = "none";
    }

    // Profile picture upload coding
    var profile_upload = document.getElementById("profile_upload");
    profile_upload.onchange = function()
    {
      var reader = new FileReader();
      // readAsDataURL iske use se reader variable me File ka URl chal jayega or isme ek auto files[] name ka array bhi create ho jata h.
      reader.readAsDataURL(profile_upload.files[0]);

      reader.onload = function()
      {
        var filename = reader.result; // isse reader me jo file aayegi vo filename me aajayegi.
        var profile_icon = document.getElementById("profile_icon");
        var profile_pic = document.getElementById("profile_pic");
        profile_pic.style.backgroundImage = "url("+filename+")";
        profile_pic.style.backgroundSize = "cover";
        profile_pic.style.backgroundPosition = "center";
        profile_icon.style.display = "none";
        var next_btn = document.getElementById("next");
        next_btn.style.display = "block";

        next_btn.onclick = function()
        {
          localStorage.setItem(user_email+"image",filename); // user_email ko isliye likha h kyuki her user ki image ke sath uski email bhi store ho jisse her user ke liye image ki key alag ho.
          var page_cover = document.getElementById("page_cover");
          page_cover.style.display = "none";
          // Isse page automatically reload ho jata h.
          window.location = location.href;
        }
      }
    }
  }
}