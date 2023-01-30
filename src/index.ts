import { v4 as uuidV4 } from "uuid"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

let tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const removeButton = document.createElement("button")
  
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  removeButton.addEventListener("click", e => {
    console.log("remove task: "+task.id)
    removeTask(task.id)
    window.location.reload()
  })
  
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  removeButton.textContent = "🗑️"
  label.append(checkbox, task.title, removeButton)
  item.append(label)
  list?.append(item)
  console.log(task)
  saveTasks()
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function removeTask(id: string) {
  tasks = tasks.filter(x => {if(x.id != id) return x})
  saveTasks()
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}