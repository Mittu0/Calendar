//DARK MODEE TOGGLE
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
}

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May',
                     'June', 'July', 'August', 'September', 'October',
                     'November', 'December']

//CHECK LEAP YEAR
isLeapYear = (y) => {
    return (y%4===0 && y%100!==0) || (y%400===0)
}

getFebDays = (y) => {
    return isLeapYear(y) ? 29 : 28
}

let month_select = document.querySelector('#month-select')

//GENERATE CALENDAR
generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30 ,31]
    
    let curr_date = new Date()

    calendar_days.innerHTML = ''
    month_select.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    //Get first day of month    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')

        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`
            if(i - first_day.getDay() + 1 === curr_date.getDate() && 
               year === curr_date.getFullYear() && 
               month === curr_date.getMonth()) {
                day.classList.add('currDate') //currDate is used in CSS
            }
        }
        calendar_days.appendChild(day)     
    }
}

let month_list = calendar.querySelector('.month-list')

//for changing Months
month_names.forEach((e,index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    }
    month_list.appendChild(month)
})

month_select.onclick = () => {
    month_list.classList.add('show')
}

//for Changing Year
document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let curr_date = new Date()

let curr_month = {value: curr_date.getMonth()}
let curr_year = {value: curr_date.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)
