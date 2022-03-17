'use strict';

const main = document.querySelector("main");
const navMenu = document.querySelector('#navMenu');
const article = document.querySelector('article');
const inputRR = document.querySelector('#inputRR');

let ObshParam = {
    typeVrezkiFrez : null,
    typeVuxodFrez : null,
    diametrFrez : null,
    kolProhodov: null,
    DlinaPoverhnosti : null
}
let RabXoDFrez = {
    S: null,
    F: null
}
let VrezFrez = {
    S: null,
    F: null
}

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
        ObshParam.typeVrezkiFrez = event.target.parentNode.id
        deletContentInMain()
        removeStatusActive()
        addParagraphInNavMenu("Выход фрезы", "exitfrez")
        craatePageExitFrezi()
        console.log(ObshParam.typeVrezkiFrez)
    } else if (event.target.parentNode.tagName.toLowerCase() === "article" && event.target.parentNode.className.toLowerCase() === "exitfrez") {
        ObshParam.typeVuxodFrez = event.target.parentNode.id;
        deletContentInMain()
        removeStatusActive()
        addParagraphInNavMenu("Режимы резания", "RezhRez")
        createPageRezhimRez()
        console.log(ObshParam.typeVuxodFrez)
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
        <div>
        <div class="text space">Представленная система дает возможность: снизить затраты на обработку плоских поверхностей концевыми фрезами из-за сокращения основного (машинного) времени за счёт минимизации величин рабочих ходов фрез; повысить срок службы и период стойкости фрезы за счёт назначения рекомендованных производителями инструмента щадящих режимов резания на участке динамических нагрузок при врезании фрезы; улучшить показатели качества поверхности на участке врезания инструмента. </div>
        <div class="text space">Разработку можно использовать в технологических бюро машиностроительных предприятий, организациях, специализирующихся на разработке CAM-систем (Computer Aided Manufacturing), а также учебном процессе.</div>
        <div class="text space">Пояснительная записка доступная по <a href="https://1drv.ms/w/s!Ak66tStm1NQNjr0edp9a1U89NXvPjA?e=5H4QLa" target="_blank">ссылке</a></div>
        </div>
        <button id="startBtn" class="btnSelect text">начать</button>
            `;
    main.append(addNewBlock);
}

createHomePage()

function createPageRezhimRez() {
    let addNewBlock = document.createElement('div');
    addNewBlock.className = `homeRR`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <span class="text taskPage">Данные режимов резания</span>
        <div class="conteinerRR" id="">
            <div class="conteinerInputsRR">
                <div class="lineCreateData">
                    <span class="text">Введите диаметр фрезы:</span>
                    <input class="text" id="diametrFrez" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">мм</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Количество проходов:</span>
                    <input class="text" id="kolProh" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">шт</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Длинна поверхности:</span>
                    <input class="text" id="DlinaPoverhnosti" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">мм</span>
                </div>
            </div>
            <div class="gorizontContienerRR">
                <div class="vertical-line conteinerInputsRR">
                    <span class="text taskPage">При рабочем ходе:</span>
                    <div class="lineCreateData">
                        <span class="text">Введите частоту вращения фрезы:</span>
                        <input class="text" id="RabXoDFrezS" type="number" min="1" max="9999" required="">
                        <span class="text">об/мин</span>
                    </div>
                    <div class="lineCreateData">
                        <span class="text">Введите подачу фрезы:</span>
                        <input class="text" id="RabXoDFrezF" type="number" min="1" max="9999" step="1" required="">
                        <span class="text">мм/мин</span>
                    </div>
                </div>
                <div class="conteinerInputsRR">
                    <span class="text taskPage">При врезение и выходе:</span>
                    <div class="lineCreateData">
                        <span class="text">Введите частоту вращения фрезы:</span>
                        <input class="text" id="VrezFrezS" type="number" min="1" max="9999" required="">
                        <span class="text">об/мин</span>
                    </div>
                    <div class="lineCreateData">
                        <span class="text">Введите подачу фрезы:</span>
                        <input class="text" id="VrezFrezF" type="number" min="1" max="9999" step="1" required="">
                        <span class="text">мм/мин</span>
                    </div>
                </div>
            </div>
        </div>
        <button id="inputRR" class="text btnSelect">ввод</button>
            `;
    main.append(addNewBlock);
}

function createPageVrezka() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage taskPageVrezkaVixod`;
    NamePage.innerHTML = `Выберите вид врезания фрезы в заготовку`;

    const infoBlock = document.createElement('div');
    infoBlock.className = ``;
    infoBlock.innerHTML = `
            <div class="gorizontContienerCenter">
                <div class="exampleColor1"></div>
                <div class="text "> - цветом обозначена заготовка</div>
            </div>
            <div class="gorizontContienerCenter">
                <div class="exampleColor2"></div>
                <div class="text "> - цветом обозначена фреза</div>
            </div>
            <div class="text">S - направление подачи заготовки</div>
    `;

    let addNewBlock = document.createElement('div');
    addNewBlock.className = `contentHomePage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <article id="1" class="vrezka">
            <div class="textInArticle text">
                Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem1.png" alt="imgToolPenetration"/>
        </article>
        <article id="2" class="vrezka">
            <div class="textInArticle text">
                Фреза обрабатывает уступ
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem2.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="3" class="vrezka">
            <div class="textInArticle text">
                Обработка паза (шлица)
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="4" class="vrezka">
            <div class="textInArticle text">
                Обработка паза с врезанием в поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4.png" alt="imgToolPenetration"/>
        </article>
        <article id="5" class="vrezka">
            <div class="textInArticle text">
                Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem5.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="6" class="vrezka">
            <div class="textInArticle text">
                Обработка паза, врезание по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="6" class="vrezka">
            <div class="textInArticle text">
                Обработка паза, врезание со смещением относительно скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="7" class="vrezka">
            <div class="textInArticle text">
                Врезение осуществеляется в металл под действием магии!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgTypeVrezanija"/>
        </article>
            `;

    main.append(NamePage);
    main.append(infoBlock);
    main.append(addNewBlock);
}

function craatePageExitFrezi() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage taskPageVrezkaVixod`;
    NamePage.innerHTML = `Выберите вид выхода фрезы из заготовки`;

    let addNewBlock = document.createElement('div');
    addNewBlock.className = `contentHomePage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <article id="11" class="exitfrez">
            <div class="textInArticle text ">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="12" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="13" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="14" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgToolPenetration"/>
        </article>
        <article id="15" class="exitfrez">
            <div class="textInArticle text">
                Выход инструмента из металла происходит по волшебству!
            </div>
            <img class="imgToolPenetration" src="img/noImg.jpg" alt="imgToolPenetration"/>
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
        <div class="conteinerInputsRR">
            <div class="text lineCreateData">To<div class="importantText">100500</div>мин</div>
            <div class="text lineCreateData">Диаметр фрезы:<div class="importantText">${ObshParam.diametrFrez}</div>мм</div>
            <div class="text lineCreateData">Количество проходов:<div class="importantText">${ObshParam.kolProhodov}</div>шт</div>
            <div class="text lineCreateData">Длина обрабатываемой поверхности:<div class="importantText">${ObshParam.DlinaPoverhnosti}</div>шт</div>
        </div>
            <div class="gorizontContienerRR">
            <div class="vertical-line conteinerInputsRR">
                <span class="text taskPage">При врезеании</span>
                <div class="text lineCreateData">Скорость вращения во время врезания:<div class="importantText">${VrezFrez.S}</div>об/мин</div>
                <div class="text lineCreateData">Подача в момент врезания:<div class="importantText">${VrezFrez.F}</div>мм/мин</div>
            </div>
            <div class="conteinerInputsRR">
                <span class="text taskPage">На рабочем ходу</span>
                <div class="text lineCreateData">Скорость вращения рабочего хода:<div class="importantText">${RabXoDFrez.S}</div>об/мин</div>
                <div class="text lineCreateData">Подача рабочего хода:<div class="importantText">${VrezFrez.F}</div>мм/мин</div>
            </div>
            </div>      
        </div>
        <button id="BtnHomePage" class="btnSelect text">начать сначала</button>
            `;

    main.append(addNewBlock);
}

function saveDataRR() {
    // общие параметры
    ObshParam.diametrFrez = document.querySelector('#diametrFrez').value;
    ObshParam.kolProhodov = document.querySelector('#kolProh').value;
    ObshParam.DlinaPoverhnosti = document.querySelector('#DlinaPoverhnosti').value;

    // рабочий ход фрезы
    RabXoDFrez.S = document.querySelector('#RabXoDFrezS').value;
    RabXoDFrez.F = document.querySelector('#RabXoDFrezF').value;

    // врезка и выход фрезы
    VrezFrez.S = document.querySelector('#VrezFrezS').value;
    VrezFrez.F = document.querySelector('#VrezFrezF').value;

    console.log(ObshParam)
    console.log(RabXoDFrez)
    console.log(VrezFrez)
}

function removeStatusActive() {
    let el = navMenu.querySelector('.active');
    el.classList.remove("active")
}