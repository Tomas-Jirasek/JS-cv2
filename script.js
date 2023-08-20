'use strict';

const btnSum = document.querySelector('#btn-sum');
const priceOffer = document.querySelector('#price-offer');
const finalPrice = document.querySelector('#sum-number');
let activeDestination = null;
let resultPrice = 0;
let activeClass = null;

//  EventListenery pro zobrazení inputu pro finální cenu a validaci
btnSum.addEventListener('click', () => {
    document.querySelector('.summarize-detail').classList.remove('hidden');
    document.querySelector('.summarize-detail').classList.add('show-slow');
    finalPrice.value = getPrice();
    priceValidate();
});

priceOffer.addEventListener('keydown', () => {
    document.querySelector('#price-validation').classList.remove('hidden');
    document.querySelector('#price-validation').classList.add('show-slow');
});

//  Úprava css pro hover a click event na .card a .btn-card a #btn-sum
const nodeListCards = document.querySelectorAll('.destination-card');
for (let i = 0; i < nodeListCards.length; i++) {
    nodeListCards[i].addEventListener('mouseenter', (event) => {
        event.target.classList.add('opacity-hover');
    });
    nodeListCards[i].addEventListener('mouseleave', (event) => {
        event.target.classList.remove('opacity-hover');
    });
};

const cardBtns = document.querySelectorAll('.btn-card');
for (let i = 0; i < cardBtns.length; i++) {
    cardBtns[i].addEventListener('mouseenter', (event) => {
        event.target.classList.toggle('btn-card-chosen');
    });
    cardBtns[i].addEventListener('mouseleave', (event) => {
        event.target.classList.toggle('btn-card-chosen');
    });
    cardBtns[i].addEventListener('click', (event) => {
        activeDestination = event.target.getAttribute('id');
        activateDestination(activeDestination);
    });
};

//  Funkce pro přepínání aktivní destinace
const activateDestination = (destination) => {
    for (let i = 0; i < nodeListCards.length; i++) {
        nodeListCards[i].classList.remove('opacity-chosen')
    };
    document.querySelector(`#${destination}-card`).classList.add('opacity-chosen');
}

//  Hover css efekt pro .btn-card
btnSum.addEventListener('mouseenter', () => {
    btnSum.classList.add('btn-sum-hover');
});

btnSum.addEventListener('mouseleave', () => {
    btnSum.classList.remove('btn-sum-hover');
});

//  Click event listener pro celý .class-type div
const nodeListClasses = document.querySelectorAll('.class-type');
for (let i = 0; i < nodeListClasses.length; i++) {
    nodeListClasses[i].addEventListener('click', (event) => {
        if (event.target.querySelector('.class-type-rad')) {
            event.target.querySelector('.class-type-rad').checked = true;
            activeClass = event.target.querySelector('.class-type-rad');
        }
    });
};

//  Funkce pro získání aktivní cenové třídy
const nodeListClassRads = document.querySelectorAll('.class-type-rad');
const getActivePriceClass = () => {
    for (let i = 0; i < nodeListClassRads.length; i++) {
        if (nodeListClassRads[i].checked)
            activeClass = nodeListClassRads[i]
    }
    return activeClass;
};

//  Funkce pro výpočet celkové ceny
const getPrice = () => {
    let result = null;
    switch (activeDestination) {
        case 'destination-0':
            result = 3000;
            break;
        case 'destination-1':
            result = 6500;
            break;
        case 'destination-2':
            result = 15702;
            break;
        default:
            finalPrice.getAttribute('placeholder').replace('Vyberte destinaci');
            break;
    }
    result *= document.querySelector('#flight-count').value;

    if (document.querySelector('#return-chkbx').checked)
        result *= 2;

    if (getActivePriceClass()) {
        switch (activeClass.getAttribute('id')) {
            case 'class-type-1':
                result *= 1.25;
                break
            case 'class-type-2':
                result *= 1.5;
                break
            default:
                break
        }
    };
    return result;
};

//  Funkce pro validaci cenové nabídky
const priceValidate = () => {
    document.querySelector('#price-validation').value =
        getPrice() - priceOffer.value <= 0 ? 'Můžete si to dovolit' : 'Nemáte na to dost peněz';
};

//  Porovnání ceny letenek s cenovou nabídkou
priceOffer.addEventListener('keyup', priceValidate);

//  Filtrování klávesových vstupů uživatele v textarea elementu
const validate = (event) => {
    let key = event.which || event.keyCode || 0;
    console.log(key);
    return ((key >= 65 && key <= 92) ||
        (key >= 97 && key <= 124) || key == 32);
};
