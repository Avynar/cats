window.onload = function () {
    //скрываем в самовызовающейся функции наши переменные
    (() => {
        const items = Array.from(document.querySelectorAll(".item"));
        let itemID = 0;
        items.forEach(item => {
            item.id = itemID++;
            item.innerHTML += `<p class="item__subtitle"></p>`;
            changeTitle(item)
            changeSubtitle(item)
            toggle(item)
        })
    })()
    //переключаем выбор объекта и обновляем текст
    function toggle(item) {
        item.onclick = function () {
            this.classList.toggle("item--selected");
            refreshItem(this);
        }
    }
    //обновляем subtitle и сбрасываем title, в случае отмены выбора объекта
    function refreshItem(item) {
        changeSubtitle(item)
        let title = getTitle(item);
        if (!item.classList.contains("item--selected")) {
            title.classList.remove("item__title--selected--hover");
            title.innerText = "Сказочное заморское яство";
        }
    }
    //меняем заголовок при наведении, если объект выбран
    function changeTitle(item) {
        let title = getTitle(item);
        item.addEventListener("mouseover", function () {
            if (this.classList.contains("item--selected")) {
                title.classList.add("item__title--selected--hover");
                title.innerText = "Котэ не одобряет?";
            }
        })
        item.addEventListener("mouseout", () => {
            title.classList.remove("item__title--selected--hover");
            title.innerText = "Сказочное заморское яство";
        })
    }
    //меняем subtitle, в зависимости от того, что происходит с объектом
    function changeSubtitle(item) {
        let subtitle = item.querySelector(".item__subtitle");
        subtitle.innerHTML = `Чего сидишь? Порадуй котэ, <span>купи</span><span>.</span>`;
        if (item.classList.contains("item--disabled")) {
            let name = item.querySelector(".item__name > span").innerText;
            subtitle.innerHTML = `Печалька, ${name} закончился.`;
        }
        if (item.classList.contains("item--selected")) {
            switch (item.id) {
                case "0": subtitle.innerText = "Печень утки разварная с артишоками."; break;
                case "1": subtitle.innerText = "Головы щучьи с чесноком да свежайшая сёмгушка."; break;
                case "2": subtitle.innerText = "Филе из цыплят с трюфелями в бульоне."; break;
                default: break;
            }
        }
    }
    function getTitle(item) {
        return item.querySelector(".item__title");
    }
}