let input = document.getElementById("input")
let inputBtn = document.getElementById("inputBtn")
let tasks = document.getElementById("tasks")
let trim = document.getElementById("trim")
let habits = JSON.parse(localStorage.getItem('habits')) || []

inputBtn.addEventListener('click', function(){
    let valueNone = input.value.trim()

     if (valueNone === "") {
        trim.textContent = "Введите текст"
    } else { 
        trim.textContent = ""
        createHabit(input.value, 0, true)
        input.value = ""
    }
})
input.addEventListener('keydown', function(event){
    if (event.key === "Enter") {
        let valueNone = input.value.trim()

        if (valueNone === "") {
            trim.textContent = "Введите текст"
        } else { 
            trim.textContent = ""
            createHabit(input.value, 0, true)
            input.value = ""
        }
    }
})

function createHabit(name, streak, isNew = false){

    if (isNew) {
        habits.push({ name: name, streak: 0})
        localStorage.setItem('habits', JSON.stringify(habits))
    }

    let valueNone = input.value.trim()


        let taskText = document.createElement("span")
        let addTask = document.createElement("li")
        let doneTask = document.createElement("input")
        let delTask = document.createElement("button")
        let streakTask = document.createElement("span")

        doneTask.className = "done"
        taskText.className = "taskText"
        streakTask.className = "streakTask"
        delTask.className = "taskDel"
        addTask.className = "habbitItem"

        let count = streak
        doneTask.type = "checkbox"
        
        addTask.appendChild(taskText)
        addTask.appendChild(doneTask)
        addTask.appendChild(streakTask)
        addTask.appendChild(delTask)
        tasks.appendChild(addTask)
        trim.textContent = ""
        
        streakTask.textContent = "🔥"  + count
        delTask.textContent = "X"
        taskText.textContent = name

        let index = habits.findIndex(h => h.name === name)
        
        doneTask.addEventListener('change', function(){
            if (this.checked) {
                count++
            } else {
                count--
            }
            streakTask.textContent = "🔥"  + count
            habits[index].streak = count
            localStorage.setItem('habits', JSON.stringify(habits))
        })

        delTask.addEventListener('click', function(){
            this.parentElement.remove()
            let currentIndex = habits.findIndex(h => h.name === name)
            habits.splice(currentIndex, 1)
            localStorage.setItem('habits', JSON.stringify(habits))
        })

    
    input.value = ""
}
habits.forEach(habit => createHabit(habit.name, habit.streak, false))