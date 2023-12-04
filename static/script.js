
const PATH = "http://127.0.0.1:5000"

async function addTask(){
    input = document.getElementById("new-task");
    text=input.value;
    //console.log(text);
    taskId = new Date().getMilliseconds().toString();
    const rawResponse = await fetch(PATH+"/create", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date: taskId, text: text})
  });
  const content = await rawResponse.json();
  window.location.reload()
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
  window.location.reload()
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
    window.location.reload()
}

async function completeTask(element){
    const response = await fetch(PATH+"/complete/"+element.id)
    window.location.reload()
}

async function clearAll(){
    const response = await fetch(PATH+"/clear")
    window.location.reload()
}

