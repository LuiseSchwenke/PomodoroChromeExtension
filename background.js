chrome.alarms.create("pomodoroTimer", {
  periodInMinutes : 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOptions"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1
        let isRunning = true
        if (timer === 60 * res.timeOptions) {
          console.log("finished")
          const options = {
            type: 'basic',
            iconUrl: 'time_icon.png',
            title: 'Pomodoro Timer',
            message: `${res.timeOptions} minutes Pomodoro finished :)`,
          };
          chrome.notifications.create(options);

      timer = 0
      isRunning = false
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        })
      }
    })
  }
})

chrome.storage.local.get(["timer", "isRunning", "timeOptions"], (res)=> {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOptions: "timeOptions" in res ? res.timeOptions : 25,
    isRunning: "isRunning" in res? res.isRunning : false,
  })
})