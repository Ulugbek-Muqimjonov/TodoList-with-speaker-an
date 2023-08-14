const elBtn = document.querySelector(".site-header__btn");
const elList = document.querySelector(".hero__list");
let elform = document.querySelector(".hero__form");
let eltack = document.querySelector(".hero__input--tack");
let eltime = document.querySelector(".hero__input--time");

let my_Array2 = [
    {
        id:1,
        title: "Ertalab turish",
        time:"6:00",
    }, 
]
function render(arr) {
    elList.innerHTML = "";
    arr.forEach(function (item) {
        let elItem = document.createElement("li");
        elItem.classList.add("hero__item");
        elItem.textContent = item.title;
        
        let elTime = document.createElement("span");
        elTime.classList.add("hero__span");
        elTime.textContent = item.time;
        
        let delbtn = document.createElement("button");
        delbtn.classList.add("hero__delbtn");
        delbtn.dataset.id = item.id;
        
        let elEdit = document.createElement("button");
        elEdit.classList.add("hero__editbtn");
        elEdit.dataset.id = item.id;
        
        
        elItem.append(elTime,elEdit,delbtn);
        elList.appendChild(elItem);
    });
    
}

render(my_Array2);

const record = new webkitSpeechRecognition();
record.lang = `en-GB`;
record.onstart = function() {
    console.log(`gapiring...`);
    elBtn.classList.add(`recording`);
}
record.onerror = function() {
    console.log(`xato boldiyu`);
}
record.onend = function() {
    console.log(`tuagdi`); 
    elBtn.classList.remove(`recording`);
}
elBtn.addEventListener(`click`, function() {
    record.start();
});

record.onresult = function (evt) {
    let myplan = evt.results[0][0].transcript;
    
    const new_date = new Date();
    const new_time = new_date.getHours();
    const new_minutes = new_date.getMinutes();
    let my_obj =  [   
        {
            id:my_Array2.length ? my_Array2.length+1 : 1,
            title:myplan,
            time:`${new_time} : ${new_minutes}`,
        },
    ] 
    my_Array2.push(my_obj);
    render(my_Array2);
}

elform.addEventListener("submit",function(evt) {
    elList.innerHTML = ""; 
    evt.preventDefault();
    let elTackvalue = eltack.value.trim();
    let eltimevalue = eltime.value.trim();
    
    let my_boj2 = {
        id:my_Array2.length ? my_Array2.length + 1 : 1,
        title:elTackvalue,
        time:eltimevalue,
    }
    my_Array2.push(my_boj2);
    console.log(my_Array2);
    render(my_Array2);
    
    eltack.value = "";
    eltime.value = "";
});

elList.addEventListener("click",function(evt) {
    elList.innerHTML = "";
    if(evt.target.matches(".hero__delbtn")) {
        let delitem = my_Array2.findIndex(function(item) {
            return item.id == evt.target.dataset.id;
        })
        my_Array2.splice(delitem,1);
    }
    if (evt.target.matches(".hero__editbtn")) {
        let editTask = prompt("rejani ozgartiring");
        let editTime = prompt("rejani voqtini ozgartring");

        let findedit = my_Array2.find(function(item) {
            return item.id == evt.target.dataset.id;
        })
          
        findedit.title = editTask;
        findedit.time = editTime;
    }
    render(my_Array2);
})

