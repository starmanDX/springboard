const todoForm = document.querySelector('#todo-form'),
    todoFormInput = document.querySelector("#todo-form-input"),
    addTodoButton = document.querySelector("#add-todo-button"),
    todoList = document.querySelector("#todo-list"),
    savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

let indexArr = [];

//initialize loop
for (let i = 0; i < savedTodos.length; i++) {

    //creates items from localstorage
    let newTodoItem = document.createElement("li");
    newTodoItem.innerText = savedTodos[i].task;
    newTodoItem.isCompleted = savedTodos[i].isCompleted ? true : false;
    newTodoItem.id = parseInt(savedTodos[i].id);

    let removeTodoButton = document.createElement("button");
    removeTodoButton.innerText = "X";

    //appends items to list
    todoList.append(newTodoItem);
    newTodoItem.append(removeTodoButton);
    todoList.append(newTodoItem);

    //pushes item indexs to index array
    indexArr.push(parseInt(savedTodos[i].id));

    //toggles line-through if true
    if (newTodoItem.isCompleted) {
        newTodoItem.classList.toggle('done');
    };
};

//adds listener to item submit button
addTodoButton.addEventListener("click", e => {

    //prevents form button from POSTing
    e.preventDefault();

    //loop if there are no current items in the list
    if (todoList.children.length === 0) {

        //creates new item
        let newTodoItem = document.createElement("li");
        newTodoItem.innerText = todoFormInput.value;
        newTodoItem.id = 0;

        let removeTodoButton = document.createElement("button");
        removeTodoButton.innerText = "X";

        //appends item to list
        todoList.append(newTodoItem);
        newTodoItem.append(removeTodoButton);

        //adds item to localstorage
        savedTodos.push({
            task: todoFormInput.value,
            isCompleted: false,
            id: 0
        });
        localStorage.setItem('todos', JSON.stringify(savedTodos));

        //pushes item index to index array
        indexArr.push(0);

        //loop if there are items in the list
    } else {

        //creates new item
        let newTodoItem = document.createElement("li");
        newTodoItem.innerText = todoFormInput.value;
        newTodoItem.id = Math.max(...indexArr) + 1;

        let removeTodoButton = document.createElement("button");
        removeTodoButton.innerText = "X";

        //appends item to list
        todoList.append(newTodoItem);
        newTodoItem.append(removeTodoButton);

        //adds item to localstorage
        savedTodos.push({
            task: todoFormInput.value,
            isCompleted: false,
            //id is set to one greater than the highest number in the index array
            id: Math.max(...indexArr) + 1
        });
        localStorage.setItem('todos', JSON.stringify(savedTodos));

        //pushes item index to index array
        indexArr.push(Math.max(...indexArr) + 1);
    };
    //clears form input
    todoForm.reset();
});

//adds listeners to list items
todoList.addEventListener("click", function (e) {

    //toggles line-through on clicked item
    if (!e.target.isCompleted && e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
        e.target.isCompleted = true;
    } else if (e.target.isCompleted && e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
        e.target.isCompleted = false;
    };

    //delete button proc
    if (e.target.tagName === "BUTTON") {
        
        //loops through localstorage
        for (let i = 0; i < savedTodos.length; i++) {

            //matches clicked item to localstorage item
            if (savedTodos[i].id === parseInt(e.target.parentElement.id)) {

                //removes item from list and localstorage
                savedTodos.splice(i, 1);
                e.target.parentElement.remove();
                localStorage.setItem("todos", JSON.stringify(savedTodos));
            };
        };
    };

    //loops through localstorage
    for (let i = 0; i < savedTodos.length; i++) {

        //matches clicked item to localstorage item
        if (savedTodos[i].id === parseInt(e.target.id)) {

            //sets line-through proc in localstrorage
            savedTodos[i].isCompleted = e.target.isCompleted;
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        };
    };
});