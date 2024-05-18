
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

let editIndex = null; 
let dragStartIndex = null; 


inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; 
  if (userEnteredValue.trim() != 0) { 
    addBtn.classList.add("active"); 
  } else {
    addBtn.classList.remove("active");
  }
}

showTasks(); 

addBtn.onclick = () => { 
  let userEnteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if (getLocalStorageData == null) { 
    listArray = []; 
  } else {
    listArray = JSON.parse(getLocalStorageData);  
  }

  if (editIndex === null) {
    listArray.push({ text: userEnteredValue, completed: false }); 
  } else {
    listArray[editIndex].text = userEnteredValue; 
    editIndex = null; 
    addBtn.innerHTML = `<i class="fas fa-plus"></i>`; 
  }

  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
  addBtn.classList.remove("active"); 
}

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if (listArray.length > 0) { 
    deleteAllBtn.classList.add("active"); 
  } else {
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    let completedClass = element.completed ? 'completed' : '';
    let checkedAttr = element.completed ? 'checked' : '';
    newLiTag += `<li class="${completedClass}" draggable="true" ondragstart="dragStart(${index})" ondragover="dragOver(event)" ondrop="drop(${index})"><input type="checkbox" class="checkbox" onclick="toggleComplete(${index})" ${checkedAttr}><span class="text">${element.text}</span><span class="icon edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></span><span class="icon delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

function editTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  inputBox.value = listArray[index].text;
  editIndex = index; 
  addBtn.classList.add("active"); 
  addBtn.innerHTML = `<i class="fas fa-save"></i>`; 
}


function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


function toggleComplete(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray[index].completed = !listArray[index].completed; 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


deleteAllBtn.onclick = () => {
  listArray = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


function dragStart(index) {
  dragStartIndex = index;
  event.target.classList.add('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function drop(index) {
  const draggedElement = document.querySelector('.dragging');
  draggedElement.classList.remove('dragging');

  if (dragStartIndex !== null && dragStartIndex !== index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    const draggedItem = listArray[dragStartIndex];
    listArray.splice(dragStartIndex, 1);
    listArray.splice(index, 0, draggedItem);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); 
  }
}
