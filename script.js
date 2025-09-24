const todoApp = {
    init() {
        this.cacheDomElements();
        this.calculateItemsRemaining();
        this.listenForEvents();
    },
    cacheDomElements() {
        this.todoForm = document.querySelector('#todoForm');
        this.todoFormInput = document.querySelector('.todo-input');
        this.todoItem = document.querySelector('.todo-item-container');
        this.todoList = document.querySelector('.todo-list');
        this.itemsRemaining = document.querySelector('#itemsRemaining');
    },
    calculateItemsRemaining() {
        const todoItemLabels = document.querySelectorAll('.todo-item-label');

        this.itemsRemaining.textContent = Array.from(todoItemLabels).filter(todoItemLabel => {
            return !todoItemLabel.classList.contains('line-through');
        }).length;
    },
    listenForEvents() {
        this.todoForm.addEventListener('submit', this.addTodo.bind(this));
        this.todoList.addEventListener('click', this.checkOrDeleteTodo.bind(this));
    },
    checkOrDeleteTodo(event) {
        if (event.target.classList.contains('todo-check')) {
            this.checkTodo(event.target);
        }

        if (event.target.classList.contains('x-button')) {
            this.deleteTodo(event.target);
        }
    },
    checkTodo(element) {
        const todoItemToComplete = element.nextElementSibling;
        todoItemToComplete.classList.toggle('line-through');
        this.calculateItemsRemaining();
    },
    deleteTodo(element) {
        const todoItemToDelete = element.closest('.todo-item-container');
        todoItemToDelete.remove();
        this.calculateItemsRemaining();
    },
    addTodo(event) {
        event.preventDefault();

        const newTodoItem = this.todoItem.cloneNode(true);
        const todoItemLabel = newTodoItem.querySelector('.todo-item-label');

        todoItemLabel.textContent = this.todoFormInput.value;
        todoItemLabel.classList.remove('line-through');
        newTodoItem.querySelector('.todo-check').checked = false;

        this.todoList.append(newTodoItem);

        this.todoFormInput.value = '';
        this.calculateItemsRemaining();
    }
};

todoApp.init();