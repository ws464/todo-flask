
const PATH = "http://127.0.0.1:5000"
const cookieName = "darkMode=";

async function addTask(){
    input = document.getElementById("new-task");
    text=input.value;
    //console.log(text);
    taskId = new Date().getTime().toString();
    const rawResponse = await fetch(PATH+"/create", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date: taskId, text: text})
  });
  const content = await rawResponse.json();
  await updateTasks();
}

async function editTask(element){
    listItem = element;
    if(listItem.className=="editMode"){
        text = listItem.getElementsByTagName("input")[1].value;
        date = element.id
    const rawResponse = await fetch(PATH+"/edit/"+date, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: text})
  });
  const content = await rawResponse.json();
  await updateTasks();
    }
    else{
        listItem.className="editMode";
        input = listItem.getElementsByTagName("input")[1];
        text = listItem.getElementsByTagName("label")[0].innerText;
        input.value=text;
    }
}

async function deleteTask(element){
    //console.log(element);
    const response = await fetch(PATH+"/delete/"+element.id)
    await updateTasks();
}

async function completeTask(element){
    const response = await fetch(PATH+"/complete/"+element.id)
    await updateTasks();
}

async function clearAll(){
    const response = await fetch(PATH+"/clear")
    await updateTasks();
}

function toggleDarkMode(){
    cookieValue = "light"
    cookie = decodeURIComponent(document.cookie);
    cookieArray = cookie.split(";");
    for(c of cookieArray){
      c = c.trim();
      if(c.indexOf(cookieName)==0){
        cookieValue=cookie.substring(cookieName.length, cookie.length);
        cookieValue=((cookieValue=="light")?"dark":"light");
        //console.log(cookieValue)
        break;
      }
    }
    document.cookie=cookieName+cookieValue+";";
    loadDarkMode();
}

function loadDarkMode(){
  cookie = decodeURIComponent(document.cookie);
  //console.log(cookie);
  cookieArray = cookie.split(";");
  cookieValue = "light"
  for(c of cookieArray){
    c = c.trim();
    if(c.indexOf(cookieName)==0){
      cookieValue=cookie.substring(cookieName.length, cookie.length);
      break;
    }
}
//console.log(cookieValue)
if(cookieValue=="dark"){
  document.body.className="dark"
}
else{
  document.body.className="";
}
}

async function loadPage(){
  await updateTasks();
  loadDarkMode();
}

async function updateTasks(){
  const completedTasksReq = await fetch(PATH+"/completed-tasks");
  const incompleteTasksReq = await fetch(PATH+"/incomplete-tasks");
  completedTasks = await completedTasksReq.json()
  incompleteTasks =  await incompleteTasksReq.json()  
  completedList = completedTasks['data']
  incompleteList = incompleteTasks['data']
  
  document.getElementById('completed-tasks').innerHTML = completedList.map(t => ` 
  <li id="${t[0]}">
  <input type="checkbox" checked disabled>
  <label>${t[1]}</label>
  <input type="text">
  <button class="edit" onclick="editTask(this.parentElement)">Edit</button>
  <button class="delete" onclick="deleteTask(this.parentElement)">Delete</button>
</li> 
  `).join(" ");

  
  document.getElementById('incomplete-tasks').innerHTML = incompleteList.map(t => ` 
  <li id="${t[0]}" draggable="true">
  <input type="checkbox" onclick="completeTask(this.parentElement)">
  <label>${t[1]}</label>
  <input type="text">
  <button class="edit" onclick="editTask(this.parentElement)">Edit</button>
  <button class="delete" onclick="deleteTask(this.parentElement)">Delete</button>
</li> 
  `).join(" ");

  dropArea = document.getElementById('completed-tasks');

  for(dragElement of document.getElementById('incomplete-tasks').getElementsByTagName('li')){
    dragElement.addEventListener('dragstart', function (event) {
      //console.log('started dragging');
      event.dataTransfer.setData('text/plain', dragElement.id);
      document.getElementById('completed-tasks').classList.add('droppable');
    });
    dragElement.addEventListener('dragend', function (event) {
      dropArea.classList.remove('droppable');   
    });
  }

  dropArea.addEventListener('dragenter', function (event) {
    event.preventDefault();
    dropArea.classList.remove('droppable');
    dropArea.classList.add('highlight');
  });

  dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('highlight');
    dropArea.classList.add('droppable');
  });

  dropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  dropArea.addEventListener('drop', async function (event) {
    console.log('dropped');
    event.preventDefault();
    dropArea.classList.remove('highlight');
    console.log('updating!')
    await completeTask(event.dataTransfer.getData('text/plain'));
    await updateTasks();
    return true;
  });

}
