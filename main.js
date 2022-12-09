window.onload = () => {
    getToday();
    loadDiary();
}
var listContainer = [];
var getToday = ()=>{
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth() + 1,
        date = today.getDate();

    var month = (month < 10 ? `0${month}` : month),
        date = (date < 10 ? `0${date}` : date);

    var box = document.querySelector('.today');
    
    box.innerHTML = `${year}.${month}.${date}`;
}

var loadDiary = () => {
    var list = document.querySelector('ul');
    for (let i = 0; i < window.localStorage.length; i++) {
        
        // console.log(window.localStorage);
        const key = window.localStorage.key(i);
        const value = JSON.parse(window.localStorage.getItem(key));
        if(value.content){
            // 결과 출력
            list.innerHTML += ` <li>
                                    <b>${value.title}</b>
                                    <p>${value.content}</p>
                                    <div>
                                        <span>${value.nowDate} ${value.nowTime}</span>
                                        <button class="red btns" name="remove" value="${key}">삭제</button>
                                    </div>
                                </li>`;
            listContainer.push(value)
        }
    }
    btnClickEvent();
}
var btnClickEvent = () => {
    var btns = document.querySelectorAll('.btns');
    btns.forEach(btn => {
        btn.onclick = () => {
            var btnName = btn.getAttribute('name');
            var btnValue = btn.getAttribute('value');

            if (btnName == 'add') addDiary();
            else if(btnName =='remove') removeDiary(btnValue)
            else sortList(btnName)
        }
    })
}

var sortList = (btnName) => {
    if(btnName == 'new'){
        console.log('new')
        console.log(listContainer)
        listContainer.sort((a, b) => {
            return a.index - b.index
        })
    } else if(btnName == 'old'){
        console.log('old')
        console.log(listContainer)
        listContainer.sort((a, b) => {
            return b.index - a.index
        })
        
    }
    reloadList()
}
var reloadList = () => {
    var list = document.querySelector('ul');
    list.innerHTML = '';
    for (let i = 0; i < listContainer.length; i++) {
        list.innerHTML += ` <li>
                                <b>${listContainer[i].title}</b>
                                <p>${listContainer[i].content}</p>
                                <div>
                                    <span>${listContainer[i].nowDate} ${listContainer[i].nowTime}</span>
                                    <button class="red btns" name="remove" value="${listContainer[i].key}">삭제</button>
                                </div>
                            </li>`;
    }
}
var addDiary = () => {
    var TIME_ZONE = 3240 * 10000;
    var now = new Date(+new Date() + TIME_ZONE).toISOString().split('T');

    var addData = {
        nowDate :  now[0],  // 저장 날짜
        nowTime :  now[1].split('.')[0], // 저장 시간
        index: window.localStorage.length +1,
        key: now,
        title : document.querySelector('#title').value, // 일기 제목
        content : document.querySelector('#diary').value // 일기 내용
    }
    

    localStorage.setItem(now, JSON.stringify(addData));
    location.reload();
}

var removeDiary = (btnValue) => {
    if(btnValue){
        window.localStorage.removeItem(btnValue);
        location.reload();
    }
}
