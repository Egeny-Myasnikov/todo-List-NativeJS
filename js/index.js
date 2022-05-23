"use strict";

function toDoShka() {
    const todoForm = document.querySelector('.todo-form');
    const todoFormInput = todoForm.querySelector('.input__task');
    const todoTasks = document.querySelector('.todo-tasks');
    const resetList = document.querySelector('.btn__form__clear');
    const ls = window.localStorage;
    let i = +(ls.length);
    const objArr = [];

    const sortID = () => objArr.sort((a, b) => a.id - b.id);
    const listItem = (id, value) => `<li class="task"><span class="task__id"> ${id}. </span> ${value} <span class="task__controls"></span></li>`


    for (let idx = 0; idx < ls.length; idx++) {
        const obj = {};
        obj.id = ls.key(idx);
        obj.value = ls.getItem(obj.id);
        objArr.push(obj);
    }
    sortID();
    objArr.forEach(({
        id,
        value
    }) => {
        todoTasks.innerHTML += listItem(id, value);

    })

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (todoFormInput.value) {
            i++

            ls.setItem(i.toString(), todoFormInput.value);

            todoTasks.innerHTML += listItem(i, ls.getItem(i.toString()));

            todoFormInput.value = '';
        } else {
            alert('заполни поле задачи');
        }
    })

    resetList.addEventListener('click', () => {
        ls.clear();
        i = +(ls.length);
        todoTasks.innerHTML = '';

    })
}

// toDoShka();

function toDoShka2() {
    const todoForm = document.querySelector('.todo-form');
    const todoFormInput = todoForm.querySelector('.input__task');
    const todoTasks = document.querySelector('.todo-tasks');
    const resetList = document.querySelector('.btn__form__clear');

    const ls = window.localStorage;
    let i = ls.length;
    const objArr = [];

    let isComplited = false;


    const sortID = () => objArr.sort((a, b) => a.id - b.id);


    const listItem = (id, value, complited = false) => `
    <li class="task${complited === true ? ' complite': ''}">
    <span class="task__id"> ${id}) ${value} </span>
    <span class="task__controls">
    <button class="btn btn__form btn__complite">Выполнено</button>
    </span>
    </li>
    `

    const renderItems = () => {
        for (let idx = 0; idx < ls.length; idx++) {
            const obj = {};
            obj.id = ls.key(idx);
            const {
                value,
                complited
            } = JSON.parse(ls.getItem(obj.id));
            obj.value = value;
            obj.complited = complited;
            objArr.push(obj);
        }
        sortID();
        objArr.forEach(({
            id,
            value,
            complited
        }) => {
            todoTasks.innerHTML += listItem(id, value, complited);

        })
    }

    renderItems();


    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (todoFormInput.value) {
            i++;
            const body = {
                value: todoFormInput.value,
                complited: isComplited
            };
            console.log(body);


            ls.setItem(i, JSON.stringify(body));

            const {
                value,
                complited
            } = JSON.parse(ls.getItem(i));

            console.log(value);
            console.log(complited);

            todoTasks.innerHTML += listItem(i, value, complited);

            todoFormInput.value = '';
        } else {
            alert('заполни поле задачи');
        }
    })

    resetList.addEventListener('click', () => {
        ls.clear();
        i = ls.length;
        todoTasks.innerHTML = '';

    })
}

// toDoShka2();


function toDoShka3() {
    const todoForm = document.querySelector('.todo-form');
    const todoFormInput = todoForm.querySelector('.input__task');
    const todoTasks = document.querySelector('.todo-tasks');
    const btnClearList = document.querySelector('.btn__form__clear');

    const lst = window.localStorage;

    function taskChanged(event) {

        const id = this.closest('.task').dataset.taskId;

        if (event.target.closest('.btn__complite')) {
            const targetTask = JSON.parse(lst.getItem(id));
            targetTask.completed ? targetTask.completed = false : targetTask.completed = true;
            const modifiedTargetTask = JSON.stringify(targetTask);
            lst.setItem(id, modifiedTargetTask);
        } else if (event.target.closest('.btn__delite')) {
            lst.removeItem(id);
            // console.log(id);
        }


        reRenderItems();
    }



    const getDataLst = () => {
        let newDataObj = [];
        for (let idx = 0; idx < lst.length; idx++) {
            const data = lst.getItem(idx);
            const dataObj = JSON.parse(data);
            newDataObj.push(dataObj);
        }
        return newDataObj;
    }

    const createTask = ({
        id,
        value,
        completed
    }) => {
        const completedClass = `${completed === true ? ' complite': ''}`;
        return `
    <li class="task"  data-task-id="${id}">
        <span class="task__value ${completedClass}"> ${id + 1}) ${value} </span>
        <span class="task__controls">
            <button class="btn btn__form btn__complite">${completed === true ? '-': '+'}</button>
            <button class="btn btn__form btn__delite">
                <svg class="svg svg-trash">
                    <use xlink:href="assets/svg/svgSprite.svg#trash"></use>
                </svg>
            </button>
        </span>
    </li>
    `
    }

    const renderItems = () => {
        const dataArr = getDataLst();
        dataArr.forEach(data => {
            todoTasks.innerHTML += createTask(data);
        })

        document.querySelectorAll('.btn').forEach(el => {
            if (el.closest('.btn__complite')) {
                el.addEventListener('click', taskChanged)
            } else if (el.closest('.btn__delite')) {
                el.addEventListener('click', taskChanged)
            }


        })
    }

    const reRenderItems = () => {
        todoTasks.innerHTML = '';
        renderItems();
        todoFormInput.value = '';
    }

    const addNewTask = () => {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (todoFormInput.value !== '') {
                const todoBody = {
                    id: lst.length,
                    value: todoFormInput.value,
                    completed: false,
                }


                const jsonBody = JSON.stringify(todoBody);

                lst.setItem(todoBody.id, jsonBody);

                reRenderItems();
            } else {
                alert('Напиши, пожалуйста, задачу!');
            }


        })
    }

    const clearTaskList = () => {
        btnClearList.addEventListener('click', () => {
            const question = confirm('Внимание! Отчистить ВЕСЬ список!?');
            if (question) {
                lst.clear();
                reRenderItems();
            }
        })
    }






    addNewTask();
    renderItems();
    // taskComplete();
    clearTaskList();
}


toDoShka3();