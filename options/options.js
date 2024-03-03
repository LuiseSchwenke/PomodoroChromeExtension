const timeOptions = document.getElementById("time-option")
timeOptions.addEventListener("change", (event) => {
    const value = event.target.value
    if (value < 1 || value > 60) {
        timeOptions.value = 25
    }
})

const saveButton = document.getElementById("save-btn")
saveButton.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        timeOptions: timeOptions.value,
        isRunning: false,
    })
})

chrome.storage.local.get(["timeOptions"], (res) => {
    timeOptions.value = res.timeOptions
})
