const calendar = document.getElementById('calendar');
const title = calendar.querySelector('.current_wrap > h1');
const days = calendar.querySelectorAll('.date_wrap table thead th');
const tbody = calendar.querySelector('.date_wrap table tbody');

let curYear = new Date().getFullYear();
let curMonth = new Date().getMonth() + 1;
let curDate = new Date().getDate();
let curDay = new Date(curYear, curMonth - 1, 1).getDay();
let firstDate = new Date(curYear, curMonth - 1, 1).getDate();
let lastDate = new Date(curYear, curMonth, 0).getDate();

function moveDate(year, month) {
    let targetDate = `${year}-${month}`;
    curDay = new Date(year, month - 1, 1).getDay();
    lastDate = new Date(year, month, 0).getDate();
    title.innerText = `${year}년 ${month}월`;
    
    for (let i = 0; i < 6; i++) {
        let row = tbody.insertRow();
        for (let j = 0; j < 7; j++) {
            cell = row.insertCell();
        }
    }
    
    let dates = calendar.querySelectorAll('td');
    
    for (let i = curDay; i < lastDate + curDay; i++) {
        const date = `${year}-${month}-${i - (curDay - 1)}`;
        const day = new Date(date).getDay();
        dates[i].innerHTML = `<span>${i - (curDay - 1)}</span>`;
        dates[i].setAttribute('data-label', date);
        if (day === 0) dates[i].querySelector('span').style.color = 'red';
    }
}

moveDate(curYear, curMonth);
// moveDate(2023, 5)