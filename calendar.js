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
    tbody.innerHTML = '';
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
    curMonth--;
    moveDate(curYear, curMonth);
}

// 이전 달로 이동
function nextMonth() {
    if (curMonth === 12) {
        curYear++;
        curMonth = 0;
    }
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

    // 특정 날짜 이동 모달창에 연도/월 입력
    const year = document.getElementById('m_year');
    const month = document.getElementById('m_month');
    year.value = curYear;
    month.value = curMonth;
}

// 클릭 이벤트 :: 날짜 칸을 클릭하면 해당 날짜를 출력
tbody.addEventListener('click', (e) => {
    let date = e.target.getAttribute('data-label');
    if (date) {
        console.log(date);
    }
})

// 특정 연도/월로 이동하는 이벤트 :: 상단의 연도/월을 클릭하면 작동
function onDateModal() { // 모달창 ON
    const modal = document.querySelector('.move_wrap');
    const bg = document.querySelector('.bg');
    modal.classList.remove('off');
    bg.classList.remove('off');
}

function cancelDateModal() { // 모달창 - 취소
    const modal = document.querySelector('.move_wrap');
    const bg = document.querySelector('.bg');
    modal.classList.add('off');
    bg.classList.add('off');

    const currentDate = document.querySelector('.current_wrap h1').innerText.match(/\d+/g).map(Number);
    curYear = currentDate[0];
    curMonth = currentDate[1];
    const year = document.getElementById('m_year');
    const month = document.getElementById('m_month');
    year.value = curYear;
    month.value = curMonth;
}

function checkDateModal() { // 모달창 - 이동
    if ((curYear < 1970 || curYear > 2100 || !curYear) || (curMonth < 1 || curMonth > 12 || !curMonth)) {
        alert('연도는 1970년부터 2100년까지, 월은 1월부터 12월까지의 값을 입력해주세요.');
    } else {
        moveDate(curYear, curMonth);
        const modal = document.querySelector('.move_wrap');
        const bg = document.querySelector('.bg');
        modal.classList.add('off');
        bg.classList.add('off');
    }
}

function changeDateByBtn(target) { // 모달창에서 화살표 눌렀을 때
    const type = target.name;
    const inde = target.className;
    
    if (type === 'year') {
        if (inde === 'up') curYear++;
        if (inde === 'down') curYear--;
    } else if (type === 'month') {
        if (inde === 'up') {
            if (curMonth >= 12) {
                curYear++;
                curMonth = 1;
            } else {
                curMonth++;
            }
        }
        if (inde === 'down') {
            if (curMonth <= 1) {
                curYear--;
                curMonth = 12;
            } else {
                curMonth--;
            }
        }
    }

    const year = document.getElementById('m_year');
    const month = document.getElementById('m_month');
    year.value = curYear;
    month.value = curMonth;
}

function changeDateByInput(target) {
    if (target.id === 'm_year') {
        target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\d{4}).+/g, '$1');
        curYear = target.value;
    } else if (target.id === 'm_month') {
        target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/(\d{2}).+/g, '$1');
        curMonth = parseInt(target.value);
    }
}