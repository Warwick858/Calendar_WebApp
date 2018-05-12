  /* Name: James LoForti 
	 UVID: 10675175
     Course: Web Programming 1
     Instructor: Dr. Brian Durney
     Date: 12/11/2015
     Final Project

	 I declare that the following code was written by me unless otherwise stated. 
	 I understand that copying source code from any other source constitutes cheating, 
	 and that I will receive a zero on this project if I am found in violation of this policy.
     ***************************************************************************  */
	 
	 //Create authentication_div
	 var authDiv = document.createElement("DIV");
	 
	 
	 //The createUserLogin function
	 //Purpose: To create the user login elements
	 //Parameters: None
	 //Return: None
	 function createUserLogin()
	 {
		 //Create & Set AUTHENTICATION DIV
		 var authDiv = document.createElement("DIV");
		 authDiv.setAttribute("id", "authDiv");
		 authDiv.className = "authentication_div";
		 document.body.insertBefore(authDiv, document.getElementById("top_content"));
		 
		 //Create authDivHeader
		 var authDivHeader = document.createElement("SPAN");
		 authDivHeader.setAttribute("id", "authDivHeader");
		 authDivHeader.setAttribute("class", "authDivHeader");
		 authDivHeader.className = "auth_div_header";
		 authDiv.appendChild(authDivHeader);
		 authDivHeader.innerHTML = "User Login";	
		 
		 //Create & Set LOGIN STATUS span
		 var loginStatus = document.createElement("SPAN");
		 loginStatus.setAttribute("id", "loginStatus");
		 loginStatus.className = "login_status";
		 authDiv.appendChild(loginStatus);
		 loginStatus.innerHTML = "Invalid Login";
		 loginStatus.style.visibility = "hidden";
		 
		 //Create & Set USER NAME text field
		 var userNameField = document.createElement("INPUT");
		 userNameField.setAttribute("type", "text");
		 userNameField.setAttribute("name", "uname");
		 userNameField.setAttribute("placeholder", "username...");
		 userNameField.setAttribute("id", "userNameField");
		 userNameField.className = "user_name_field";
		 authDiv.appendChild(userNameField);
		 //Configure userNameField
		 userNameField.required = true;
		 
		 //Create & Set PASSWORD text field
		 var passwordField = document.createElement("INPUT");
		 passwordField.setAttribute("type", "password");
		 passwordField.setAttribute("name", "pword");
		 passwordField.setAttribute("placeholder", "password...");
		 passwordField.setAttribute("id", "passwordField");
		 passwordField.className = "password_field";
		 authDiv.appendChild(passwordField);
		 //Configure userNameField
		 passwordField.required = true;
		 
		 //Create & Set LOGIN Button
		 var loginBtn = document.createElement("button");
		 loginBtn.setAttribute("id", "loginBtn");
		 loginBtn.className = "login_button";
		 var loginBtnText = document.createTextNode("Login");
		 loginBtn.appendChild(loginBtnText);
		 authDiv.appendChild(loginBtn);
		 loginBtn.onclick = loginClick;
		 
	 } // end function createUserLogin
	 
	 //The loginClick function
	 //Purpose: To submit the username and password to the server for authentication
	 //Parameters: None
	 //Return: None
	 function loginClick()
	 {
		 //Get userName & password
		 var userName = document.getElementById("userNameField").value;
		 var password = document.getElementById("passwordField").value;
		 
		 //Format the message to be sent to the server
		 var msg = "userName=" + userName + "&password=" + password;
		 
		 //Create a new ajax object
		 var ajax = new XMLHttpRequest();
		 
		 //Setup POST request using synch
		 ajax.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php", false);
		 //Set content-type HEADER
		 ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		 //Send the message to the server
		 ajax.send(msg);
		 
		 //Get span to display login status
		 var loginStatusSpan = document.getElementById("loginStatus");
		 
		 //Test server response
		 if (ajax.status == 200) // if response was good
		 {
			 //Parse responseText into object
			var response = JSON.parse(ajax.responseText); 
			
			//If authentication was SUCCESSFUL
			if (response.result == "valid")
			{
				var acceptedUser = response.userName; // save userName
				var timestamp = response.timestamp; // save timestamp
				var data = "Username: " + acceptedUser + " " + "Login Time: " + timestamp; // format & save as data
				
				//Save data to local storage
				localStorage.setItem("cs2550timestamp", data);
				
				//Hide error message on login page
				loginStatusSpan.style.visibility = "hidden";
				
				//Go to game
				window.location = "game_grid_js.html";
			} // end if
			else // authentication FAILED
			{
				loginStatusSpan.style.visibility = "visible";
			} // end else
		 } // end if		 
	 } // end function loginClick()
	 
		
	 //The storageEvent function
	 //Purpose: To handle events associated with storage object
	 //Parameters: The object generating the event
	 //Return: None
	 function storageEvent(e)
	 {
		 var testKey = e.key;
		 var testValue = e.newValue;
	 } // end function storageEvent()
	 
	 
	 //The init function
	 //Purpose: To initialize the authentication elements once the page is stable
	 //Parameters: None
	 //Return: None
	 function init()
	 {
		 authDiv.onsubmit = createUserLogin();
	 } // end function init()
	 
	 //Add event listener
	 window.addEventListener("storage", storageEvent, false);
	 
	 //Add event listener
	 window.onload = init;
	 
	 
	 
	 
	 
	 
	 