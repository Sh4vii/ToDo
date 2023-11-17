const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearList = document.querySelector(".clear-list");


//This gets the array of items from local storage or sets items to an empty array 
let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e){
    e.preventDefault(); //stops the page from reloading
    const text = (this.querySelector("[name=item]").value);

    //creating a time stamp for list items
    const create = new Date();

    const date = create.getDate();
    const month = create.getMonth();
    const year = create.getFullYear();
    const day = create.getDay();
    const hour = create.getHours();
    const minutes = create.getMinutes();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function checkDay (day, days){
        return days[day];
    }
    const theDay = checkDay(day, days);

    const dateCreated = `${date < 10 ? '0' : ''}${date}/${month < 10 ? '0' : ''}${month}/${year < 10 ? '0' : ''}${year}`;
    const timeCreated = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;

    //item object to with its attributes
    const  item = {
        text : text,
        dayCreated : theDay,
        dateCreated : dateCreated,
        timeCreated : timeCreated,
        done : false
    }


    //add the item to the items array and also to the local storage
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function populateList(plates=[], platesList){
    platesList.innerHTML = plates.map((plate, i)=>{
        return `<li>
        <p>${plate.timeCreated} - ${plate.dayCreated}, ${plate.dateCreated}</p>
            <div class="list-item">
            <input class="list" type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""}/>
            <p for="item${i}">${plate.text}</p>
            <button class="delete">Delete</button>
            </div>
        </li>`;
    }).join("");

    const itemDelete = document.querySelectorAll(".delete");
    
    for (let i = 0; i < itemDelete.length; i++) {
        itemDelete[i].addEventListener("click", ()=>{
            plates.splice(i, 1);
            console.log(plates);
            items = plates;
            localStorage.setItem("items", JSON.stringify(items));
            populateList(items, itemsList);
        })
    }
    
}

function toggleDone(e){
    if (!e.target.matches("input")) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

clearList.addEventListener("click",()=>{
    localStorage.clear();
    location.reload();
})

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);


