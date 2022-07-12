"use strict";
//Get elements from login.html
let elForm = document.querySelector(".login__form");
let elUserName = document.querySelector(".user__name");
let elUserPassword = document.querySelector(".user__password");

//Listen form to sign up
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  //Create variables and get values
  let userNameValue = elUserName.value;
  let userPasswordValue = elUserPassword.value;



  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userNameValue,
      password: userPasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
        if (data?.token) {
            window.localStorage.setItem("token", data.token);

            window.location.replace("index.html");
        } else{
          swal ( "Oops" ,  "The login or password was entered incorrectly" ,  "error" )
        }
    });

});