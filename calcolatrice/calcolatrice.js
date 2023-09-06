let risultatoAttuale = 0;
let buffer = "0";
let numeroPrecedente;

const display = document.querySelector('.display');

init();

function init() {
    document.querySelector('.bottoni').addEventListener('click', function (event) {
        pressioneBottone(event.target.innerText);
    })
}

function pressioneBottone(tastoPremuto) {
    if (isNaN(tastoPremuto)) {
        gestisciSimbolo(tastoPremuto);
    }
    else {
        gestisciNumero(tastoPremuto);
    }

    display.innerText = buffer;
}

function gestisciSimbolo(simbolo) {
    switch (simbolo) {
        case 'canc':
            buffer = '0';
            risultatoAttuale = 0;
            break;

        case '=':
            if (numeroPrecedente === null) {
                return;
            }

            eseguiOperazione(parseInt(buffer));
            numeroPrecedente = null;
            buffer = risultatoAttuale.toString();
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            gestisciOperazione(simbolo);
            break;
    }
}

function gestisciOperazione(simbolo) {
    if (buffer === '0') {
        return;
    }

    const numeroInserito = parseInt(buffer);
    if (risultatoAttuale === 0) {
        risultatoAttuale = numeroInserito;
    }
    else {
        eseguiOperazione(numeroInserito);
    }
    numeroPrecedente = simbolo;
    buffer = '0';
}

function eseguiOperazione(numeroInserito) {
    if (numeroPrecedente === '+') {
        risultatoAttuale += numeroInserito;
    }
    else if (numeroPrecedente === '−') {
        risultatoAttuale -= numeroInserito;
    }
    else if (numeroPrecedente === '×') {
        risultatoAttuale *= numeroInserito;
    }
    else if (numeroPrecedente === '÷') {
        risultatoAttuale /= numeroInserito;
    }
}

function gestisciNumero(numeroInserito) {
    if (buffer === '0') {
        buffer = numeroInserito;
    }
    else {
        buffer += numeroInserito;
    }
}