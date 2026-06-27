// Start signup coding
var  signup_form = document.getElementById("signup_frm");

signup_form.onsubmit = function()
{
  // btoa() method ka use code ko machine langunage me convert krne ke liye krte h jisse another user uss code ka use na kr paye.
  var user = btoa(document.getElementById("username").value);
  var email = btoa(document.getElementById("email").value);
  var phone = btoa(document.getElementById("phone").value);
  var password = btoa(document.getElementById("pass").value);

  var user_object_data = {username:user,email:email,phone:phone,pass:password};

  var user_text_data = JSON.stringify(user_object_data); // JSON.stringfy ka use data ko text me save krne ke liye krte h.

  if(user != "" && email != "" && phone != "" && password != "")
  {
    localStorage.setItem(email,user_text_data); // Yha pr email ko key ke roop me isliye likha h kyuki email sabki different different hoti h.
    var signup_btn = document.getElementById("signup_btn");
    signup_btn.style.background = "#14b129";
    signup_btn.innerHTML = "<i class='fa-solid fa-circle-check'></i> Sign up Successfully !";

    setTimeout(reset,3000);
    function reset(){
      signup_btn.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
      signup_btn.innerHTML = "Sign up";
      signup_form.reset();       
    }
     return false;
  }
}

// End signup coding

// Start email validation coding
// This function is used for check the reused email, if reused email is matched so show warning notice. 
var email_input = document.getElementById("email");
email_input.onchange = function()
{
  // yha pr btoa() method ka use isliye kiya h kyuki input box me hi email encoded hoker localStorage se check kre
  var email = btoa(document.getElementById("email").value);
  var warning = document.getElementById("email_notice");
  var signup_btn = document.getElementById("signup_btn");
  
    if(localStorage.getItem(email) != null)
    {
      warning.style.display = "block";
      email_input.style.borderBottomColor = "red";
      signup_btn.disabled = true;
      signup_btn.style.background = "#ccc";

      email_input.onclick = function()
      {
      warning.style.display = "none";
      email_input.style.borderBottomColor = "#ccc";
      email_input.value = "";
      signup_btn.disabled = false;
      signup_btn.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
      }
    }
}

// End email validation coding


// Start login coding
var login_form = document.getElementById("login_frm");
login_form.onsubmit = function()
{
  var email = document.getElementById("login_email");
  var pass = document.getElementById("login_pass");
  var login_email_war = document.getElementById("login_email_warning");
  var login_password_war = document.getElementById("login_password_warning");

  if(localStorage.getItem(btoa(email.value)) == null)
  {
   login_email_war.style.display = "block";
   email.style.borderBottomColor = "red";

   email.onclick = function()
   {
    email.value = "";
    login_email_war.style.display = "none";
    email.style.borderBottomColor = "#ccc";
   }
  }

  else
    {
    var text_data = localStorage.getItem(btoa(email.value));
    // parse is used for extract object data means ye object ke sare data ko alag alag krta h
    var obj_data = JSON.parse(text_data);
    // isme first uss variable ka name aayega jisme hamne parse ka use kiya h and second wale me uss property ka name aayega jo jiski value dikhani h or ye property upar object me h.
    var correct_email = obj_data.email;
    var correct_pass = obj_data.pass;
    
    if(btoa(email.value) == correct_email)
    {
      if(btoa(pass.value) == correct_pass)
      {
        sessionStorage.setItem("user",btoa(email.value));
        // location.replace se login button ko click krne pr profile wala page open ho jayega or fir vapas login wale page pr nhi ja payega.
        window.location.replace("profile/profile.html");
      }
      
      else{
          login_password_war.style.display = "block";
          pass.style.borderBottomColor = "red";

          pass.onclick = function()
          {
            pass.value = "";
            login_password_war.style.display = "none";
            pass.style.borderBottomColor = "#ccc";
          }
      }
    }

  }
  return false;
}

// End login coding