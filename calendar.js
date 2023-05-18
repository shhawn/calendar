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
    addEvents();
}

// 현재 날짜 기준
moveDate(curYear, curMonth);
// moveDate(2023, 6);

// 다음 달로 이동
function prevMonth() {
    if (curMonth === 1) {
        curYear--;
        curMonth = 13;
    }
    tbody.innerHTML = '';
    curMonth--;
    moveDate(curYear, curMonth);
}

// 이전 달로 이동
function nextMonth() {
    if (curMonth === 12) {
        curYear++;
        curMonth = 0;
    }
    tbody.innerHTML = '';
    curMonth++;
    moveDate(curYear, curMonth);
}

// 일별 이벤트 :: moveDate()를 할 때 작동되는 함수
function addEvents() {
    // 공휴일 추가
    const dates = [...tbody.querySelectorAll('td')].map(v => {
        if (v.innerText.length) return v;
    }).filter(x => x !== undefined);

    const holidays = ['1-1', '3-1', '5-5', '6-6', '8-15', '10-3', '10-9', '12-25']; // 양력 공휴일
    for (let day of holidays) {
        let index = dates.findIndex(v => (v.dataset.label.slice(5)).includes(day));
        if (index > -1) {
            dates[index].classList.add('holiday');
        }
    }
}

// 클릭 이벤트 :: 날짜 칸을 클릭하면 해당 날짜를 출력
tbody.addEventListener('click', (e) => {
    let date = e.target.getAttribute('data-label');
    if (date) {
        console.log(date);
    }
})