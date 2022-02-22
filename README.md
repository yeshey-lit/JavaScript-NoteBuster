<h2>Operation of Notebuster</h2>
The project aims to develop a web application that works like Evernote. 
<ul>
<li>Used PHP to create maintainable code and MySQL for database design and development </li>
<li>Call JavaScript & jQuery to control content like note content after pressing the del button.  </li>
<li>Designed UI using HTML5, CSS3, jQuery, AJAX, and JavaScript </li>
<li>CRUD features on both accounts and notes section. </li>
<li>Involved in all the stages of Software Development Life Cycle</li>
  </ul>
<br>
============================================================ <br>
<h3>Below video demonstrate the function of Notebuster:</h3>
============================================================ <br>
<a href="https://youtu.be/unS30nkaLnI">
         <img alt="Qries" src="https://user-images.githubusercontent.com/20102987/155016388-6d2d857e-7a4e-4fd6-ae71-6e8d822bb687.png"
         width=450" height="225">
      </a>

============================================================ <br>

<h3>Below passages show introduction to each files</h3>

============================================================ <br>
HTML file

•index.html <br>
1.Registration page user interface.

•login.html<br>
1.Login page.

============================================================ <br>
JavaScript file

•login.js	<br>
after login, 
1.	send credential to login.php
2.	active getVerify(), if login, we should pass the user to addnote.php, where a platform to add/delete, edit note

•addNote.js	
1.	the control logic of addnote.php, which is a user interface to note management platform
2.	CRUD and presentation of the note are controlled from here use for loop to generate HTML code that presents the notes and buttons underneath in a dynamic way

js.js
1.	data validation in capital letter, password length, confirm password check
2.	fetch of verified data to register.php by using a POST method
3.	writing a greeting message with username, so getusername() first fetch a request to getUsername.php, a PHP that retrieves username from the database, and then getusername() pass the username to success to do a simple amendment on greeting msg and print it out


============================================================ <br>

PHP file<br>

•connect.php<br>
it is a PDO that connect the database

•login.php
1.	Filter the incoming message
2.	validate if there is any matching email and password in the database, if match, throwback message to login.js
3.	if verification success, assign an email to the session 

•addnote.php <br>	
Credentials are bought from login.js,l verified as a user.
1. This is a platform to manage your notes. It shows an HTML interface for the user. AddNote.js control buttons’ logic
2. PHP part of the code open session and verify the session validity


•Register.php	
1.	filter the incoming msg
2.	To validate any matching email in the database before inserting credentials into the database.
3.	writing a greeting message with username, so getusername() first fetch a request to getUsername.php, a PHP that retrieves username from the database, and then getusername() pass the username to success to do simple amendment on greeting msg and print it out

•getUsername.php	
1.	after receiving the request from js.js, use SQL command to inquire the database for username
2.	send username after JSON encode

•throwNote.php	<br>
PHP part verify the session is correct, then starts. this page receive a message from addNote.js, line 78, a fetch function active after the save button is pressed, then we throw newly created note to the database and reply

•updateNote.php	<br>
1.session verification and then find the matching note to update

•Logout.php	<br>
Log out and end the session

•getNote.php	
1. to retrieve existing id and content by searching notes all under the email in session
2. throwback the notes in [] to loadNotes() in addNote.js, where raise the request


•DeleteNote.php	<br>
Delete the note according to the id received vs. id in the database.
