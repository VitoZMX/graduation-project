'use strict';

const main = document.querySelector("main");
const navMenu = document.querySelector('#navMenu');
const article = document.querySelector('article');
const inputRR = document.querySelector('#inputRR');

let idVrezki = null;
let idExitFrezi = null;

let diametrFrez = null;
let OborotFrez = null;
let PodachFrez = null;

document.addEventListener('click', function (event) {
    let elementClick = event.target.id;

    if (elementClick === "startBtn") {
        deletContentInMain()
        addParagraphInNavMenu("Врезка", "vrezka")
        removeStatusActive()
        createPageVrezka()
    } else if (event.target.parentNode.tagName.toLowerCase() === "article" && event.target.parentNode.className.toLowerCase() === "vrezka") {
        idVrezki = event.target.parentNode.id
        deletContentInMain()
        removeStatusActive()
        addParagraphInNavMenu("Выход фрезы", "exitfrez")
        craatePageExitFrezi()
        console.log(idVrezki)
    } else if (event.target.parentNode.tagName.toLowerCase() === "article" && event.target.parentNode.className.toLowerCase() === "exitfrez") {
        idExitFrezi = event.target.parentNode.id;
        deletContentInMain()
        removeStatusActive()
        addParagraphInNavMenu("Режимы резания", "RezhRez")
        createPageRezhimRez()
        console.log(idExitFrezi)
    } else if (elementClick === "inputRR") {
        saveDataRR()
        deletContentInMain()
        removeStatusActive()
        addParagraphInNavMenu("Результаты", "resultPage")
        createPageResult()
    } else if (elementClick === "BtnHomePage") {
        window.location.reload();
    }
})

navMenu.addEventListener('click', function (event) {
    let elementClick = event.target.id;
    if (elementClick === "HomePage") {
        deletContentInMain()
        removeStatusActive()
        event.target.classList.toggle('active')
        createHomePage()
    } else if (elementClick === "vrezka") {
        deletContentInMain()
        removeStatusActive()
        event.target.classList.toggle('active')
        createPageVrezka()
    } else if (elementClick === "exitfrez") {
        deletContentInMain()
        removeStatusActive()
        event.target.classList.toggle('active')
        craatePageExitFrezi()
    } else if (elementClick === "RezhRez") {
        deletContentInMain()
        removeStatusActive()
        event.target.classList.toggle('active')
        createPageRezhimRez()
    } else if (elementClick === "resultPage") {
        deletContentInMain()
        removeStatusActive()
        event.target.classList.toggle('active')
        createPageResult()
    }

})

function deletContentInMain() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function addParagraphInNavMenu(text, newId) {
    let listNav = navMenu.childNodes;

    for (let i = 0; i < listNav.length; i++) {
        if (listNav[i].id === newId) {
            if (listNav[i].id === "HomePage") {
                deletContentInMain()
                listNav[i].classList.toggle('active')
                return
            } else if (listNav[i].id === "vrezka") {
                deletContentInMain()
                listNav[i].classList.toggle('active')
                return
            } else if (listNav[i].id === "exitfrez") {
                deletContentInMain()
                listNav[i].classList.toggle('active')
                return
            } else if (listNav[i].id === "RezhRez") {
                deletContentInMain()
                listNav[i].classList.toggle('active')
                return
            } else if (listNav[i].id === "resultPage") {
                deletContentInMain()
                listNav[i].classList.toggle('active')
                return
            }
        }
    }

    let addNewBlock = document.createElement('li');
    addNewBlock.className = `text navPage active`;
    addNewBlock.id = `${newId}`;
    addNewBlock.innerHTML = `
    ${text}
    `;
    navMenu.append(addNewBlock);
}

function createHomePage() {
    let addNewBlock = document.createElement('div');
    addNewBlock.className = `HomePage`;
    addNewBlock.innerHTML = `
        <span class="text taskPage">О сервисе</span>
        <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        <span class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        <button id="startBtn" class="btnSelect text">начать</button>
            `;
    main.append(addNewBlock);
}

createHomePage()

function createPageRezhimRez() {
    let addNewBlock = document.createElement('div');
    addNewBlock.className = `conteinerRR`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <span class="text taskPage">Данные режимов резания</span>
        <div class="lineCreateData">
            <span class="text">Введите диаметр фрезы:</span>
            <input class="text" id="diametrFrez" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])"  step="1"/>
        </div>
        <div class="lineCreateData">
            <span class="text">Введите частоту вращения фрезы:</span>
            <input class="text" id="OborotFrez" type="number" min="1" max="9999" required/>
        </div>
        <div class="lineCreateData">
            <span class="text">Введите подачу фрезы:</span>
            <input class="text" id="PodachFrez" type="number" min="1" max="9999" step="1" required/>
        </div>
        <button id="inputRR" class="text btnSelect">select</button>
            `;
    main.append(addNewBlock);
}

function createPageVrezka() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage`;
    NamePage.innerHTML = `Выберите тип врезания в металл!`;

    let addNewBlock = document.createElement('div');
    addNewBlock.className = `contentHomePage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <article id="1" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="2" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog.jpg" alt="imgTypeVrezanija"/>
        </article>
        <article id="3" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии! Проверка на то что будет если тут будет много
                букафакаг! Или очень много букаф. В как они перекроют блок! Врезение осуществеляется в металл под
                действием магии! Проверка на то что будет если тут будет много букафакаг! Или очень много букаф.
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog1.jpg" alt="imgTypeVrezanija"/>
        </article>
        <article id="4" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="5" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog.jpg" alt="imgTypeVrezanija"/>
        </article>
        <article id="6" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии! Проверка на то что будет если тут будет много
                букафакаг! Или очень много букаф. В как они перекроют блок! Врезение осуществеляется в металл под
                действием магии! Проверка на то что будет если тут будет много букафакаг! Или очень много букаф.
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog1.jpg" alt="imgTypeVrezanija"/>
        </article>
        <article id="6" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии! Проверка на то что будет если тут будет много
                букафакаг! Или очень много букаф. В как они перекроют блок! Врезение осуществеляется в металл под
                действием магии! Проверка на то что будет если тут будет много букафакаг! Или очень много букаф.
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog1.jpg" alt="imgTypeVrezanija"/>
        </article>
        <article id="7" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/TestImgDog.jpg" alt="imgTypeVrezanija"/>
        </article>
            `;

    main.append(NamePage);
    main.append(addNewBlock);
}

function craatePageExitFrezi() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage`;
    NamePage.innerHTML = `Выберите тип выхода инструмента из металла!`;

    let addNewBlock = document.createElement('div');
    addNewBlock.className = `contentHomePage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <article id="11" class="exitfrez">
            <div class="textInArticle text ">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="12" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="13" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="14" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="15" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/TestImgCat.jpg" alt="imgToolPenetration"/>
        </article>
            `;

    main.append(NamePage);
    main.append(addNewBlock);
}

function createPageResult() {
    let addNewBlock = document.createElement('div');
    addNewBlock.className = `PageResult`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <span class="text taskPage">Результаты вычеслений:</span>
        <div class="PageResultData">
            <span class="text">To<span>100500</span> мин</span>
            <span class="text">Колличество проходов: <span class="importantText">100500</span> шт</span>
            <span class="text">Скорость вращения во время врезания: <span class="importantText">${OborotFrez}</span> об/мин</span>
            <span class="text">Скорость вращения рабочего хода: <span class="importantText">${OborotFrez}</span> об/мин</span>
            <span class="text">Подача в момент врезания: <span class="importantText">${PodachFrez}</span> мм/мин</span>
            <span class="text">Подача рабочего хода: <span class="importantText">${PodachFrez}</span> мм/мин</span>
        </div>
        <button id="BtnHomePage" class="btnSelect text">начать сначала</button>
            `;

    main.append(addNewBlock);
}

function saveDataRR() {
    diametrFrez = document.querySelector('#diametrFrez').value;
    OborotFrez = document.querySelector('#OborotFrez').value;
    PodachFrez = document.querySelector('#PodachFrez').value;
}

function removeStatusActive() {
    let el = navMenu.querySelector('.active');
    el.classList.remove("active")
}