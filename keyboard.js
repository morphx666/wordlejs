const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back']
];

function drawKeyboard() {
    for(let i = 0; i < keyboard.length; i++) {
        const row = $(`<div class='krow'></div>`);
        for(let k = 0; k < keyboard[i].length; k++) {
            const key = $(`<div id='${keyboard[i][k]}' class='key' onclick='keyPress("${keyboard[i][k]}")' >${keyboard[i][k]}</div>`);
            row.append(key);
        }
        $(".keyboard").append(row);
    }
}

function keyPress(key) {
    switch(key) {
        case "back":
            handleKeyDown("Backspace");
            break;
        default:
            handleKeyDown(key);
            break;
    }
}