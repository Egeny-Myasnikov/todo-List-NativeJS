"use strict";

function toDoShka() {
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
        }


        reRenderItems();
    }



    const getDataLst = () => {
        let newDataObj = [];

        for (let idx = 0; idx < lst.length; idx++) {
            let key = lst.key(idx);
            const data = lst.getItem(key);
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
            <button class="btn btn__form btn__delete">
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
            }
        })
        deleteTargetItem()
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
    clearTaskList();


    function deleteTargetItem() {
        const btnDeleteItem = document.querySelectorAll('.btn__delete');

        btnDeleteItem.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.target.closest('.task').dataset.taskId;


                const tasks = document.querySelectorAll('.task');

                // tasks.forEach((task) => {
                e.target.closest('.task').remove();
                lst.removeItem(targetId);

                // })
            })
        })
    }


}


toDoShka();