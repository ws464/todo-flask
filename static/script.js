
function addTask(){
    input = document.getElementById("new-task");
    text=input.value;
    //console.log(text);
    taskId = new Date().getMilliseconds().toString();
    listItem = document.createElement("li");
    listItem.setAttribute("id", taskId);

    html ='<input type="checkbox" onclick="completeTask(this.parentElement)">'+
    
    '<label>'+text+'</label>'+
    
    '<input type="text">'+
    
    '<button class="edit" onclick="editTask(this.parentElement)">Edit</button>'+
    
    '<button class="delete" onclick="deleteTask(this.parentElement)">Delete</button>'+
    
    '</li>';
    listItem.innerHTML=html;
    document.getElementById("incomplete-tasks").appendChild(listItem);
    document.getElementById("new-task").value="";
}

function editTask(element){
    listItem = element;
    if(listItem.className=="editMode"){
        input = listItem.getElementsByTagName("input")[1].value;
        listItem.getElementsByTagName("label")[0].innerText=input;
        listItem.className="";
    }
    else{
        listItem.className="editMode";
        input = listItem.getElementsByTagName("input")[1];
        text = listItem.getElementsByTagName("label")[0].innerText;
        input.value=text;
    }
}

function deleteTask(element){
    //console.log(element);
    listItem = document.getElementById(element.id);
    listItem.remove();
}

function completeTask(element){
    completedTask = element;
    element.remove();
    checkbox = completedTask.getElementsByTagName("input")[0];
    checkbox.disabled=true;
    document.getElementById("completed-tasks").appendChild(element);
}

function clearAll(){
    document.getElementById("incomplete-tasks").innerHTML="";
    document.getElementById("completed-tasks").innerHTML="";
}

