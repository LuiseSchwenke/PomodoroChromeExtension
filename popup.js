let tasks = []

function updateTime() {
  chrome.storage.local.get(["timer", "timeOptions"], (res) => {
    const time = document.getElementById("time")
    const minutes = `${Math.floor(res.timeOptions - res.timer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.timer % 60 != 0) {
      seconds = `${60 - res.timer % 60}`.padStart(2, "0")
    }
    time.textContent = `${minutes}:${seconds}`
  })
}

updateTime()
setInterval(updateTime, 1000)

const startTimerBtn = document.getElementById("start-btn")
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({
      isRunning: !res.isRunning,
    },() => {
      startTimerBtn.textContent = !res.isRunning? "Pause timer" : "Start Timer"
    })
  })
})

const resetTimeBtn = document.getElementById("reset-btn")
resetTimeBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false
  }, () => {
    startTimerBtn.textContent = "Start Timer"
  })
  
})

const addTaskButton = document.getElementById("task-btn")
addTaskButton.addEventListener("click", () => addTask())

chrome.storage.sync.get(["tasks"], (result) => {
tasks = result.tasks? result.tasks : []
renderTasks()
})

function saveTasks() {
  chrome.storage.sync.set ( {
    tasks,
  })
}

function renderTask (taskLength) {
  const taskRow = document.createElement("div")

  const text = document.createElement("input")
  text.type = "text"
  text.placeholder = "Please type a task"
  text.value = tasks[taskLength]
  text.className = "task-input"
  text.addEventListener("change", () => {
    tasks[taskLength] = text.value
    saveTasks()
  })

  const deleteBtn = document.createElement("input")
  deleteBtn.type = "button"
  deleteBtn.value = "x"
  deleteBtn.className ="delete-btn"
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskLength)
    
  })

  taskRow.appendChild(text)
  taskRow.appendChild(deleteBtn)

  const taskContainer = document.getElementById("task-container")
  taskContainer.appendChild(taskRow)
}

function addTask() {
  const taskLength = tasks.length
  tasks.push("")
  renderTask(taskLength)
  saveTasks()
}

function deleteTask(taskLength) {
  tasks.splice(taskLength, 1)
  renderTasks()
  saveTasks()

}

function renderTasks() {
  const taskContainer = document.getElementById("task-container")
  taskContainer.textContent = ""
  tasks.forEach((taskText, taskLength) => {
    renderTask(taskLength)
  })

}