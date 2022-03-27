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
        addParagraphInNavMenu("Врезание", "vrezka")
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
        <span class="text taskPage">Данные резания согласно выбраных схем</span>
        <div class="gorizontContienerRR" id="imgSchemeRR"></div>
        <div class="conteinerRR" id="">
            <div class="conteinerInputsRR">
                <div class="lineCreateData">
                    <span class="text">Диаметр фрезы <b><em>Dфр</em></b> :</span>
                    <input class="text" id="diametrFrez" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">мм</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Ширина заготовки на входе <b><em>Bвх</em></b> :</span>
                    <input class="text" id="shirinaZagot" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">мм</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Количество проходов :</span>
                    <input class="text" id="kolProh" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">шт</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Глубина резания <b><em>t</em></b> :</span>
                    <input class="text" id="glubRez" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">шт</span>
                </div>
                <div class="lineCreateData">
                    <span class="text">Длина обрабатываемого участка <b><em>L</em></b> :</span>
                    <input class="text" id="DlinaPoverhnosti" type="number" data-min="1" data-max="10000" pattern="([^0].?|0[^0])" step="1">
                    <span class="text">мм</span>
                </div>
            </div>
            <div class="gorizontContienerRR">
                <div class="vertical-line conteinerInputsRR">
                    <span class="text taskPage">При рабочем ходе:</span>
                    <div class="lineCreateData">
                        <span class="text">Введите частоту вращения фрезы <b><em>n</em></b> :</span>
                        <input class="text" id="RabXoDFrezS" type="number" min="1" max="9999" required="">
                        <span class="text">об/мин</span>
                    </div>
                    <div class="lineCreateData">
                        <span class="text">Введите подачу фрезы <b><em>Sм</em></b> :</span>
                        <input class="text" id="RabXoDFrezF" type="number" min="1" max="9999" step="1" required="">
                        <span class="text">мм/мин</span>
                    </div>
                </div>
                <div class="conteinerInputsRR">
                    <span class="text taskPage">При врезение и выходе:</span>
                    <div class="lineCreateData">
                        <span class="text">Введите частоту вращения фрезы <b><em>n</em></b> :</span>
                        <input class="text" id="VrezFrezS" type="number" min="1" max="9999" required="">
                        <span class="text">об/мин</span>
                    </div>
                    <div class="lineCreateData">
                        <span class="text">Введите подачу фрезы <b><em>Sм</em></b> :</span>
                        <input class="text" id="VrezFrezF" type="number" min="1" max="9999" step="1" required="">
                        <span class="text">мм/мин</span>
                    </div>
                </div>
            </div>
        </div>
        <button id="inputRR" class="text btnSelect">ввод</button>
            `;
    main.append(addNewBlock);
    document.querySelector("#imgSchemeRR").append(addSchemes1InPageCreateRezhRez());
    document.querySelector("#imgSchemeRR").append(addSchemes2InPageCreateRezhRez());
}

function addSchemes1InPageCreateRezhRez() {
    let addNewBlock = document.createElement('img');
    addNewBlock.className = `imgSchemeInRR`;

    if (ObshParam.typeVrezkiFrez === "p1") {
        addNewBlock.src = "img/schemes/symbol/p1.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVrezkiFrez === "p2") {
        addNewBlock.src = "img/schemes/symbol/p2.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVrezkiFrez === "p3") {
        addNewBlock.src = "img/schemes/symbol/p3.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVrezkiFrez === "p4") {
        addNewBlock.src = "img/schemes/symbol/p4.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVrezkiFrez === "o5") {
        addNewBlock.src = "img/schemes/symbol/o5.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVrezkiFrez === "o6") {
        addNewBlock.src = "img/schemes/symbol/o6.png"
        addNewBlock.alt = "imgScheme"
    }  else if (ObshParam.typeVrezkiFrez === "o7") {
        addNewBlock.src = "img/schemes/symbol/o7.png"
        addNewBlock.alt = "imgScheme"
    }else {
        addNewBlock.src = "img/noImg.jpg"
        addNewBlock.alt = "imgScheme"
    }
    return addNewBlock
}

function addSchemes2InPageCreateRezhRez() {
    let addNewBlock = document.createElement('img');
    addNewBlock.className = `imgSchemeInRR`;

    if (ObshParam.typeVrezkiFrez + "e" === ObshParam.typeVuxodFrez) {
        addNewBlock.src = "img/schemes/symbol/schem-identich.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "p1e") {
        addNewBlock.src = "img/schemes/symbol/p1.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "p2e") {
        addNewBlock.src = "img/schemes/symbol/p2.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "p3e") {
        addNewBlock.src = "img/schemes/symbol/p3.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "p4e") {
        addNewBlock.src = "img/schemes/symbol/p4.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "o5e") {
        addNewBlock.src = "img/schemes/symbol/o5.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "o6e") {
        addNewBlock.src = "img/schemes/symbol/o6.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "o7e") {
        addNewBlock.src = "img/schemes/symbol/o7.png"
        addNewBlock.alt = "imgScheme"
    } else if (ObshParam.typeVuxodFrez === "8e") {
        addNewBlock.src = "img/schemes/symbol/noexit.png"
        addNewBlock.alt = "imgScheme"
    } else {
        addNewBlock.src = "img/noImg.jpg"
        addNewBlock.alt = "imgScheme"
    }
    return addNewBlock
}

function createPageVrezka() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage taskPageVrezkaVixod`;
    NamePage.innerHTML = `Выберите вид врезания фрезы в заготовку`;

    let addNewBlock = document.createElement('div');
    addNewBlock.className = `contentHomePage`;
    addNewBlock.id = ``;
    addNewBlock.innerHTML = `
        <article id="p1" class="vrezka">
            <div class="textInArticle text">
                Врезание по прямой. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem1.png" alt="imgToolPenetration"/>
        </article>
        <article id="p2" class="vrezka">
            <div class="textInArticle text">
                Врезание по прямой. Фреза обрабатывает уступ
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem2.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="p3" class="vrezka">
            <div class="textInArticle text">
                Врезание по прямой. Обработка паза (шлица)
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="p4" class="vrezka">
            <div class="textInArticle text">
                Врезание по прямой. Обработка паза с врезанием в поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4.png" alt="imgToolPenetration"/>
        </article>
        <article id="o5" class="vrezka">
            <div class="textInArticle text">
                Врезание по окружности. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem5.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="o6" class="vrezka">
            <div class="textInArticle text">
                Врезание по окружности. Обработка паза, врезание по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6.png" alt="imgTypeVrezanija"/>
        </article>
        <article id="o7" class="vrezka">
            <div class="textInArticle text">
                Врезание по окружности. Обработка паза, врезание со смещением относительно скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7.png" alt="imgTypeVrezanija"/>
        </article>
            `;

    main.append(NamePage);
    main.append(PodskazkaViboraSchem());
    main.append(addNewBlock);
    addStatusActive()

    function addStatusActive() {
        let SearchId = ObshParam.typeVrezkiFrez
        if (SearchId != null) {
            let imgActiv = document.getElementById(SearchId)
            imgActiv.classList.toggle('activeImg')
        }
    }
}

function craatePageExitFrezi() {
    const NamePage = document.createElement('span');
    NamePage.className = `text taskPage taskPageVrezkaVixod`;
    NamePage.innerHTML = `Выберите вид выхода фрезы из заготовки`;

    main.append(NamePage);
    main.append(PodskazkaViboraSchem());


    if(ObshParam.typeVrezkiFrez==="p1") {
        main.append(funcp1());
    }else if (ObshParam.typeVrezkiFrez==="p2") {
        main.append(funcp2());
    } else if (ObshParam.typeVrezkiFrez==="p3") {
        main.append(funcp3());
    }else if (ObshParam.typeVrezkiFrez==="p4") {
        main.append(funcp4());
    }else if (ObshParam.typeVrezkiFrez==="o5") {
        main.append(funco5());
    }else if (ObshParam.typeVrezkiFrez==="o6") {
        main.append(funco6());
    }else if (ObshParam.typeVrezkiFrez==="o7") {
        main.append(funco7());
    }

    function funcp1() {
        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
        <article id="p1e" class="exitfrez">
            <div class="textInArticle text ">
                Выход по прямой. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem1exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o5e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem5exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8-3exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funcp2() {

        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
        <article id="p2e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem2exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8-2exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funcp3() {
        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
        <article id="p3e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="p4e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой. Обработка паза с выходом из поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o6e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o7e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход со мещением от центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funcp4() {
        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
        <article id="p3e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="p4e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой. Обработка паза с выходом из поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o6e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o7e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход со мещением от центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funco5() {

        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
         <article id="p1e" class="exitfrez">
            <div class="textInArticle text ">
                 Выход по прямой. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem1exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o5e" class="exitfrez">
            <div class="textInArticle text">
                 Выход по окружности. Диаметр фрезы больше ширины обрабатываемой поверхности
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem5exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8-3exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funco6() {

        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
         <article id="p3e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="p4e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой. Обработка паза с выходом из поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o6e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o7e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход со мещением от центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    function funco7() {

        let addNewBlock = document.createElement('div');
        addNewBlock.className = `contentHomePage`;
        addNewBlock.id = ``;
        addNewBlock.innerHTML = `
         <article id="p3e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem3exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="p4e" class="exitfrez">
            <div class="textInArticle text">
                Выход по прямой. Обработка паза с выходом из поверхность под углом
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem4exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o6e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход по центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem6exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="o7e" class="exitfrez">
            <div class="textInArticle text">
                Выход по окружности на проход со мещением от центру скругления заготовки
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem7exit.png" alt="imgToolPenetration"/>
        </article>
        <article id="8e" class="exitfrez">
            <div class="textInArticle text">
                Инструмент не проходит материал на проход
            </div>
            <img class="imgToolPenetration" src="img/schemes/schem8exit.png" alt="imgToolPenetration"/>
        </article>
            `;
        return addNewBlock
    }

    addStatusActive()

    function addStatusActive() {
        let SearchId = ObshParam.typeVuxodFrez
        if (SearchId != null) {
            let imgActiv = document.getElementById(SearchId)
            imgActiv.classList.toggle('activeImg')
        }
    }
}


// <article id="p1e" className="exitfrez">
//     <div className="textInArticle text ">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem1exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="p2e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem2exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="p3e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem3exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="p4e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem4exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="o5e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem5exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="o6e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem6exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="o7e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem7exit.png" alt="imgToolPenetration"/>
// </article>
// <article id="8e" className="exitfrez">
//     <div className="textInArticle text">
//         Выход инструмента из металла происходит по волшебству!
//     </div>
//     <img className="imgToolPenetration" src="img/schemes/schem8exit.png" alt="imgToolPenetration"/>
// </article>

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

function PodskazkaViboraSchem() {
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
            <div class="text">Всплывающая подсказка отображается при наведение на схему</div>
    `;
    return infoBlock
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