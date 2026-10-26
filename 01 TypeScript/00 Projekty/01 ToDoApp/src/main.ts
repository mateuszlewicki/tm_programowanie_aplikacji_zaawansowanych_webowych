import TodoEntry from "./TodoEntry.js";


const addButton: HTMLButtonElement|null = document.querySelector("#todoAddButton");
const inputTextField: HTMLInputElement|null = document.querySelector("#todoInputField") ;
const todosContainer: HTMLDivElement = document.querySelector("#todoContainer")!;



let arrayOfTodos: TodoEntry[] = [];

if (addButton && inputTextField && todosContainer){
    
    addButton?.addEventListener('click',(e) =>{
        
        arrayOfTodos.push(new TodoEntry(arrayOfTodos.length,inputTextField?.value));
        inputTextField.value='';
        buildList();
    })
}

function buildList(){
    todosContainer.innerHTML = "";
    arrayOfTodos.forEach(element => {



        todosContainer.innerHTML += element.render();
        
    });
}

function removeElement(element: HTMLElement) {}