import { nanoid } from "nanoid"
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
        edit.onclick = () => this.editTasks(task)
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
    editTasks(task) {
        taskEdited = this.createModal()
        task.update(taskEdited)
    }
    createModal() {
        console.log('hola')
    }
}

export default ThingsToDo