import { fetchLogin,getLogin,fetchWord,getWord } from "./services";
const dialog = document.querySelector('dialog');
const app = document.querySelector('#app');
onPageLoad();

// Collect the msg corresponding to different errors
function showError(err) {
  let message;

  switch (err.error) {
    case 'required-username':
      message = 'Username cannot be empty or contain special character besides underscore!';
      break;
    case 'auth-insufficient':
      message = 'Your password is not correct!';
      break;
    case 'required-word':
      message = 'Word cannot be empty!';
      break;
    case 'invalid-word':
      message = 'Word cannot contain any character besides lowercase or uppercase letters!';
      break;
  }
// Use dialogue to imform erorrs
  dialog.showModal();
  dialog.querySelector('p').textContent = message;
}

// generate name list in the chat room
function generateNameList(session){
  const recordName = [];
  
  Object.keys(session).map((sid)=>{ 
      const name = session[sid].username;
      
      if(recordName.indexOf(name)<0){
          recordName.push(name)}});
     
  
      return recordName.map((name)=>{
            return `<li>${name}</li>`
          }).join('');       
     
  }

//generate messages in the chat room

function generateMessageList(session,messages){

  const messageList = messages.map((message)=>{

    const sid = message[0];
    const word = message[1];
    return `<li>${session[sid].username}:${word}</li>`

  }).join(' ');

    return messageList;         

}

// load the page
function onPageLoad() {

getLogin()
.then(response=>{renderWord(app)})
.catch (error=>{
    renderLogin(app);
})
}

// login page
function renderLogin(container) {
container.innerHTML = `
  <form class='app__form' name='login'>
    <label>
      Username: 
      <input type='text' name='username'/>
    </label>
    <label>
      Password: 
      <input type='password' name='password'/>
    </label>
    <button type='submit'>
      Login
    </button>
  </form>
`;

const form = document.forms.login;

// submit the username
form.onsubmit =  (event) => {
  event.preventDefault();
  const username = form.username.value;

  fetchLogin(username)
  .then((response)=>renderWord(app))
  .catch(err=>showError(err))
}
}

// chat room
function renderWord(container) {

container.innerHTML = `
  <form name='word' class = "chat__form">
    <label>
      Current User:
      <ul class ='user'></ul>
    </label>
    <label>
      Saved Word:
      <ul class ='messages'></ul>
    </label>
    <label>
      Send Mesage: 
      <input class = "message"/>
    </label>
    <label>
      <button type='submit' name='submit'>
        Send
      </button>
      <button type='button' name='logout'>
        Log Out
      </button>
    </label>
  </form>
`;

const form = document.forms.word;
const user = document.querySelector(".user");
const messages = document.querySelector(".messages");

// Refresh the page
  function refresh(user,messages){
    getWord()
    .then((response)=>
    // show message lists and name lists
      {user.innerHTML = generateNameList(response.session);
       messages.innerHTML = generateMessageList(response.record,response.messages)         
      })
    .catch(error=>renderLogin(app))  
      
  }

// set the timeout as 5s and break it when it goes back to the login page  
   function refreshChatRoom(){

      refresh(user,messages);
      const timeout = setTimeout(refreshChatRoom,5000);
      
      if(!document.forms.word){
        clearTimeout(timeout);
      }
      
    }

      refreshChatRoom();
    
// log out 
form.onsubmit =  (event) => {

  event.preventDefault();
  const message = document.querySelector(".message").value; 
  fetchWord(message)
  // delete the session
  .then((response)=>messages.innerHTML = generateMessageList(response.record,response.messages))
  .catch(error=>showError(error))
}

form.logout.onclick =  (event) => {
  fetch('/api/session', { method: 'DELETE' });
  renderLogin(app); 
}
}
