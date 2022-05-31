import { nanoid } from "nanoid"
import { Modal } from "bootstrap"
import isTheInputEmpty from "../helpers/isTheInputEmpty"
import NewTask from "./NewTask"
class ThingsToDo {
    constructor() {
        this.allTasks = [
            {
                id: nanoid(),
                task: "Irme al parque a pasear",
                isCompleted: true,
            }
        ]
        this.input = document.querySelector('.inputTask')
        this.box = document.querySelector('.box')
        this.pendingTasks = document.querySelector('.boxPending')
        this.input.onkeyup = (e) => this.handleSubmit(e)
        this.printTasks(this.allTasks)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (e.key !== 'Enter') return
        if (isTheInputEmpty(this.input)) return
        const newTask = new NewTask(this.input.value)
        this.allTasks = [...this.allTasks, newTask]
        this.printTasks()
    }
    printTasks(array = this.allTasks) {
        this.box.innerHTML = ''
        array.forEach((task) => {
            const newTask = this.createTask(task)
            this.box.append(newTask)
        })
    }
    createTask(task) {
        const article = document.createElement('article')
        article.className = 'mb-1 bg-white p-2 mx-auto md:w-[50%] w-[80%] border hover:border-blue-300 shadow-xl rounded-lg flex gap-2'
        const completed = document.createElement('i')
        completed.onclick = () =>  this.completed(task)
        completed.classList = `bi ${task.isCompleted ? 'bi-check-circle' : 'bi-circle'} ${task.isCompleted ? 'text-green-700' : 'text-green-500'} `
        article.innerHTML = `<h5 class="">${task.task} </h5>`
        const edit = document.createElement('i')
        edit.onclick = () => this.createModal(task)
        edit.classList = 'bi bi-pen ml-auto mr-1 text-blue-700'
        const remove = document.createElement('i')
        remove.onclick = () => this.deleteTasks(task)
        remove.classList = 'bi bi-trash text-red-500'
        article.prepend(completed)
        article.append(edit, remove)
        return article
    }
    completed(task) {
        if (!task.isCompleted) task.completed()
         else if (task.isCompleted) task.unCompleted()
        this.printTasks()
    }
    deleteTasks(task) {
        this.allTasks = [...this.allTasks.filter((value) => {
            if (task.id === value.id) return false
            return true
        })]
        this.printTasks(this.allTasks)
    }
    editTasks(task, newTask) {
        task.update(newTask)
        this.printTasks()
    }
    createModal(task) {
        console.log(task)
        const modal = document.createElement('div')
        modal.className = 'modal fade'
        modal.setAttribute('tabindex', '-1')
        const day = task.date.getDate() < 10 ? `0${task.date.getDate()}` : task.date.getDate()
        const month = task.date.getMonth() < 10 ? `0${task.date.getMonth() + 1}` : task.date.getMonth() + 1
        const hours = task.date.getHours() < 10 ? `0${task.date.getHours()}` : task.date.getHours()
        const minutes = task.date.getMinutes() < 10 ? `0${task.date.getMinutes()}` : task.date.getMinutes()
        const seconds = task.date.getSeconds() < 10 ? `0${task.date.getSeconds()}` : task.date.getSeconds()
        modal.innerHTML = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-blue-600 p-3">
                <div>
                <h5 class="modal-title px-3 text-3xl font-bold text-white container my-auto">Modo edición</h5>
                <p class="mt-3 px-3 text-white container my-auto">Tarea creada: ${day}/${month}/${task.date.getFullYear()} a las ${hours}:${minutes}:${seconds}</p>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body bg-blue-50">
                <input class="form-control p-2 border shadow-xl rounded-lg inputEdit" type="text" value="${task.task}">
                <p class="d-block mt-3 px-2 text-sm">
                Última modificación: ${task.lastModification.getDate() < 10 ? `0${task.lastModification.getDate()}` : task.lastModification.getDate()}/${task.lastModification.getMonth() < 10 ? `0${task.lastModification.getMonth() + 1}` : task.lastModification.getMonth() + 1}/${task.lastModification.getFullYear()} a las ${task.lastModification.getHours() < 10 ? `0${task.lastModification.getHours()}` : task.lastModification.getHours()}:${task.lastModification.getMinutes() < 10 ? `0${task.lastModification.getMinutes()}` : task.lastModification.getMinutes()}:${task.lastModification.getSeconds() < 10 ? `0${task.lastModification.getSeconds()}` : task.lastModification.getSeconds()}
                </p>
            </div>
            <div class="d-flex modal-footer bg-blue-50">
            <di>
            
                <button type="button" class="btn btn-red-500 bg-red-700 me-2 text-white" data-bs-dismiss="modal">Cancelar</button>
                <button id="btnEdit" type="button" class="btn btn-green-700 bg-green-500 text-white">Guardar</button>
            </div>
        </div>
    </div>`
        const newTask = modal.querySelector('.inputEdit')

        const bootstrapModal = new Modal(modal)
        bootstrapModal.show()

        const btnEdit = modal.querySelector('#btnEdit')
        btnEdit.addEventListener('click', () => {
            if (!isTheInputEmpty(newTask)) {
                bootstrapModal.hide()
                this.editTasks(task, newTask.value)
            }
        })

        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove()
        })
    }
}

export default ThingsToDo