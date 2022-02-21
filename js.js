/**
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 * A demonstration of:
 * checklist: 1Xeventlistener, functionX2
 * 1.data validation in captial letter, password length, confirm password check
 * 2.fetch of verified data to register.php by using a POST method
 * 3.writing a greeting message with username, so getusername() first fetch a request to getUsername.php, a php that retreive
 * username from database, and then getusername pass the username to success to do simple amendment on greeting msg and print it out
 */
window.addEventListener("load", function () {
    /**
     * simply receive user name from getusername() and add it to greeting msg
     * @param {*a username set from newly registered user} text  
     */
    function success(text) {
        let namedb = "";
        let passworddb = "";
        let email = "";
        let lastLoginTime = "";
        name = text[0].name;
        document.getElementById("confirm").innerHTML="<p>" + name + " welcome new user</p>";
    }

    /**
     * 1. this first confirm account is opened
     * 2. pass request username from getUsername.php and pass it to success(text) above.
     * @param {the indicator from register.php last row } accountOpened 
     */
    function getUsername(accountOpened){
        console.log(accountOpened);
        if(accountOpened==1) //if there are msg return from register.php last row,it means account opening procedure success 
        {
            let url = "getUsername.php";
            
            fetch(url, { credentials: 'include' })//after we know account opened, tell getUsername.php the username
            .then(response => response.json())
            .then(document.getElementById("confirm").innerText="")//in case people open multiple accounts, wipe last msg.
            .then(success)
        }
        else{
            $("#confirm").html("<p>unknown error</p>");
        }
	}

    /**
     * following part start first, mainly arrange when to launch function to 
     * 1.validate credentials
     * 2.pass credentials to register.php, where prepare to upload credentials to db
     * 3.activate fucntion getusername() written above, after upload credential to db,
     *  we have to notify user it is successful/not
     */
    let button = document.getElementById("clickme");
    button.addEventListener("click", function () {
        //create variables to represent different fields in html
        let nameInput = document.getElementById("nameInput").value;
        let emailInput = document.getElementById("emailInput").value;
        let passwordInput = document.getElementById("passwordInput").value;
        let confirmPasswordInput = document.getElementById("confirmPasswordInput").value;
        let confirm = document.getElementById("confirm");

        //from here to line 77, it checks if password contain uppercase, this is indicated by
        //variable hasUpperCase in line 59
        let i = 0;
        let letter = '';
        let hasUpperCase = false;

        while (i < passwordInput.length) {
            letter = passwordInput.charAt(i);
            let code = letter.charCodeAt(i);
            //test if this is a alphabet by seeing if password is either a-z/A-Z
            if (/[a-zA-Z]/.test(letter)) {
                //if alphabet is uppercase, then indicator=true and stop loop
                if (letter === letter.toUpperCase()) {
                    hasUpperCase = true;
                    break;
                }
            }
            i++;
        }

        //after uppercase verification, if all control on credential fulfill, move on to line 81
        if (passwordInput === confirmPasswordInput && passwordInput.length >= 8 && passwordInput.length <= 12 && hasUpperCase === true) {
            //set content to send to register.php
            let params = "name=" + nameInput + "&email=" + emailInput + "&password=" + passwordInput;

            // do the fetch
            fetch("register.php", {//register.php will pass credential to db if appropriate
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }, 
                    body: params 
                })

                .then(response => response.text())
                .then(getUsername)//active getUsername() written above

        //if credential control cant fulfill, show msg below
        } else if (passwordInput !== confirmPasswordInput) {
            confirm.innerHTML = "your password and confirm password not match";
        } else if (passwordInput.length < 8 || passwordInput.length > 12) {
            confirm.innerHTML = "password length must be 8-12";
        } else if (hasUpperCase === false) {
            confirm.innerHTML = "password must contain upper case letter";
        } else {
            confirm.innerHTML = "unknown error, please refresh";
        }

    });
});