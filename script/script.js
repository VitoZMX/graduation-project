'use strict';

const main = document.querySelector("main");
const navMenu = document.querySelector('#navMenu');
const BtnStart = document.querySelector('#startBtn').id;
const article = document.querySelector('article');
const inputRR = document.querySelector('#inputRR');

let idVrezki = null;
let idExitFrezi = null;

let diametrFrez = null;
let OborotFrez = null;
let PodachFrez = null;

document.addEventListener('click', function (event) {
    let elementClick = event.target.id;
    //console.log(event)
    if(elementClick===BtnStart){
        deletContentInMain()
        addParagraphInNavMenu("Врезка")
        createPageVrezka()
    } else if (event.target.parentNode.tagName.toLowerCase() === "article" && event.target.parentNode.className.toLowerCase() === "vrezka")  {
        idVrezki = event.target.parentNode.id
        deletContentInMain()
        addParagraphInNavMenu("Выход фрезы")
        craatePageExitFrezi()
        console.log(idVrezki)
    } else if(event.target.parentNode.tagName.toLowerCase() === "article" && event.target.parentNode.className.toLowerCase() === "exitfrez") {
        idExitFrezi = event.target.parentNode.id;
        deletContentInMain()
        addParagraphInNavMenu("Режимы резания")
        createPageRezhimRez()
        console.log(idExitFrezi)
    } else if (elementClick=== "inputRR") {
        saveDataRR()
        deletContentInMain()
        addParagraphInNavMenu("Результаты")
        createPageResult()
        console.log(PodachFrez)
    }

})

function deletContentInMain() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function addParagraphInNavMenu(text) {
    let addNewBlock = document.createElement('li');
    addNewBlock.className = `text navPage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
    ${text}
    `;
    navMenu.append(addNewBlock);
}

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
            `;

    main.append(addNewBlock);
}

function saveDataRR() {
    diametrFrez = document.querySelector('#diametrFrez').value;
    OborotFrez = document.querySelector('#OborotFrez').value;
    PodachFrez = document.querySelector('#PodachFrez').value;
}