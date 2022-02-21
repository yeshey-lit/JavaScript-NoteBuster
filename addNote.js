
/**
 * Name:Yeshey Dema
 * Date:4 Dec 2020
 * this js 
 * 1. control logic of addNote.php, which is an user interface to note management platform
 * 2. when user first enter addNote.php, system tries to load some note, this is first implemented by
 * 3. usually user first click on textarea on top of addNote.php, and save its first note, this
 */
window.addEventListener("load", function () {
   /**
    * when page load, below function try call the loadNote() to implement notes of designated user.
    */
   $("#displayNote").ready(function () {
      loadNotes();
   })
   /**
    * ------update button-------
    *  after edit is pressed, the stored existing note appear in the textarea, user can amend it and
    * press down a newly popup button called update, this tells the system to update, instead of create new note
    */
   $("#update").click(function () {

      let id = $(this).attr('update-id');//retrieve note id from button attribute-"update-id"
      let url = "updateNote.php";//destination
      let params = "id=" + id+ "&content=" + $("#note").val() ;//content and id pass to destination
      fetch(url, {
         method: 'POST',
         credentials: 'include',
         headers: {
            "Content-Type": "application/x-www-form-urlencoded"
         }, 
         body: params 
      })
      .then(response => response.text())
      .then(whetherLoadNote)//after we get reply from throwNote.php, let whetehrLoadNote to decide if show it on page
      .then(function(){
         $("#update").hide();//after that remember to make things back to normal, hide update button and show save button
         $("#save").show();
      })
   });
   /**
    * -----edit button in the table is pressed------
    * 1.once this is pressed, it pass the current stored message(which is stored in attribute content-id)
    *  to the top page textarea.
    * 2. hide the save button, instead put on a new button called update specialise for update use
    */
   $(document).on("click", ".edit", function () {

      let id = $(this).attr('edit-id');//there was attribute called edit-id which store id no of designated note up db
      $("#save").hide();//save button is for create new note, you no longer need it

      $("#note").val($(this).attr('content-id'));//retreive last updated content that store 
      $("#update").show();//now to show update button desingated for update function
      $("#update").attr("update-id",id);//create an attribute for update button, this will use to pass the id to updateNote.php
   });

   /**
    * ------delete note-------
    * this is function raise after delete button pressed, similarly delete-id store the id of the note
    * then when we pass the id to deleteNote.php, they know which to delete
    */
   $(document).on("click", ".delete", function () {

      let id = $(this).attr('delete-id');//id of the note in db
      let url = "DeleteNote.php";//destination
      let params = "id=" + id;//which note to delete
      fetch(url, {
         method: 'POST',
         credentials: 'include',
         headers: {
            "Content-Type": "application/x-www-form-urlencoded"
         }, 
         body: params 
      })
      .then(response => response.text())
      .then(whetherLoadNote);//after we get reply from throwNote.php, let whetehrLoadNote to decide if show it on page
   });

   /**
    * -----create new note-----
    * save button is shown when there is a chance to add a note on top of page addnote.php
    */
   $("#save").click(function () {
      let message = $("#note").val();//store the stuff u wrote
      let url = "ThrowNote.php";//destination
      let params = "message=" + message;//content
      fetch("throwNote.php", {
            method: 'POST',
            credentials: 'include',
            headers: {
               "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body: params 
         })
         .then(response => response.text())
         .then(whetherLoadNote);//after we get reply from throwNote.php, let whetehrLoadNote to decide if show it on page
   });
   /**
    * it showed up in procedures after pressing 3 different buttons, 
    * -"save" (when u add a new note, this button shows)
    * -"delete"
    * -"update" 
    * everyone pass them 1/0 receive from php pages, whetherloadNote(signal)will decide whether to 
    * allow loadNote() to active, if the signal =1, it allows 
    * @param {a signal received depends on which function it connects, it is either 1/0} signal 
    */
   function whetherLoadNote(signal) {
      if (signal == 1)
         loadNotes();
      else
      $("#note").val(" ");
   }
   /**
    * *Name:Shing Kit WAN, no:000826521
 * Date:4 Dec 2020
    * this is a function that used by various function above to load note, 
    * this function ask getNote.php, and then getNote.php give him the note
    * id and content, and pass these 2 data to sucess(text) for further processing
    */
   function loadNotes() {
      let url = "getNote.php";

      fetch(url, {
            credentials: 'include'
         })
         .then(response => response.json())
         .then(success);//after they receive fields from getNote.php, pass on to success(text)
   };


   /**
    * this crack down the array into one piece of data, and assign them to field in tables
    * also produce table and button, place them to proper positions
    * @param {the array received} text 
    */
   function success(text) {
      let id = "";
      let content = "";
      let dataOutput = `<table>
            <tr>
              
                <th>Notes</th>
                <th>edit</th>
                <th>delete</th>
            </tr>`;// record the table heading first

      for (let i = 0; i < text.length; i++) {
         id = text[i].id;
         content = text[i].content;

         dataOutput += `<tr>
         <td>` + content + `</td> 
         <td><input class='edit' type='button' value='edit' content-id='`+content+`' edit-id='` + id + `'> </input></td>
         <td><input class='delete' type='button' value='delete' delete-id='` + id + `'> </input></td>
         </tr>`;//stack up the rows accordingly, these attributes is useful
         //1. edit-id is used to record the id of each note, later it is used to search in db to find right note, and update it
         //2. content-id is used to store the whole content of the note, it works as a convinent way to transfer data 
         //3. delete-id works the same way as edit-id, it helps the search in db to find right note to delete. 
      }

      dataOutput += `</table>`;

      $("#dispalyNote").html(dataOutput);//now print above html code
   }
})


