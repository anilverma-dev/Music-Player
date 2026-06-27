var sign_btn = document.getElementById("signup_link");
var log_btn = document.getElementById("login_link");
var log = document.getElementById("login");
var sign = document.getElementById("signup");

sign_btn.onclick = function()
{
  log.style.display = "none";
  sign.style.display = "block";  
}

log_btn.onclick = function()
{
  sign.style.display = "none";
  log.style.display = "block";
}