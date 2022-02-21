/**
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 * 1. base on information receive from login.html, package it and send to login.php, a place to check credential
 * 2. after login.php decide to allow/not allow login, getVerify act accordingly to pass user to note platform (addnote.php)
 * or notify with error msg.
 */

window.addEventListener("load", function () {
/**
 * 
 * @param {the indicator in login.php,shows login successful} login 
 */
function getVerify(login){
        debugger;
        if(login==1)
        {//if login successful, bring user to addnote.php
            window.location='addNote.php'
        }
        else{
           $('#loginMessage').html('Invalid login credential');
        }
	}
/**
 * once login button is clicked, below procedure start.
 * send credential to login.php
 * and active getVerify() stated above, this analyse if login, we should pass user to addnote.php, where a platform to add/delete,edit note 
 */
$("#login").click(function(){
    //simplify the html element value location directory
    let email=$("#email").val();
    let password=$("#password").val();
    //it tells login.php what are the information to receive
    let params = "email=" + email + "&password=" + password;
    //send fetch to login.php
    fetch("login.php", {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/x-www-form-urlencoded" }, 
        body: params
    })
    .then(response => response.text())
    .then(getVerify)//proceed getVerify(), it analysis feedback from login.php
});

});