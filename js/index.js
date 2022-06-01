"use strict";

function toDoShka() {
    const todoForm = document.querySelector('.todo-form');
    const todoFormInput = todoForm.querySelector('.input__task');
    const todoTasks = document.querySelector('.todo-tasks');
    const btnClearList = document.querySelector('.btn__form__clear');
    const lst = window.localStorage;

    let taskArr = lst.tasks ? JSON.parse(lst.getItem('tasks')) : [];
    const pushTask = () => {
        const task = {
            text: todoFormInput.value,
            completed: false
        }
        taskArr.push(task);
        todoFormInput.value = '';
    }

    const setTask = () => {
        lst.setItem("tasks", JSON.stringify(taskArr));
    }

    const switchComplete = () => {
        const btnComplete = document.querySelectorAll('.btn__complite');
        btnComplete.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                taskArr[i].completed = !taskArr[i].completed;
                setTask();
                renderTask();
            })
        });
    }
    const deleteTask = () => {
        const btnDelete = document.querySelectorAll('.btn__delete');
        btnDelete.forEach((btn, i) => {
            btn.addEventListener("click", () => {
                taskArr.splice(i, 1);
                setTask();
                renderTask();
            })
        });
    }


    const createTask = (task, i) => {
        const completedClass = `${task.completed === true ? ' complite': ''}`;
        return `
    <li class="task">
        <span class="task__value ${completedClass}"> ${i + 1}) ${task.text} </span>
        <span class="task__controls">
            <button class="btn btn__form btn__complite">${task.completed === true ? '-': '+'}</button>
            <button class="btn btn__form btn__delete">
                <svg class="svg svg-trash">
                    <use xlink:href="assets/svg/svgSprite.svg#trash"></use>
                </svg>
            </button>
        </span>
    </li>
    `
    }

    const renderTask = () => {
        const noTasks = () => todoTasks.innerHTML = '<p>Задач нет! Дабавьте задачу</p>';
        todoTasks.innerHTML = '';
        if (lst.tasks) {
            taskArr.forEach((task, i) => {
                todoTasks.innerHTML += createTask(task, i);
                switchComplete();
                deleteTask();
            })
            if (lst.tasks.length < 4) {
                noTasks();
            }
        } else {
            noTasks();
        }
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (todoFormInput.value !== '') {
            pushTask();
            setTask();
            renderTask();
        } else {
            alert('Напишите задачу...');
        }
    })
    btnClearList.addEventListener('click', () => {
        const question = confirm('Вы уверены, что хотите полностью отчистить список задач!?');
        if (question) {
            lst.clear();
            taskArr = [];
            renderTask();
        }
    })

    renderTask();
}


toDoShka();