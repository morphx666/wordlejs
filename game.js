let currentWord = words[Math.floor(Math.random() * words.length)];
const wordLength = currentWord.length;
const possibleGuesses = 6;
const guesses = [];
let currentGuess = 0;

$(document).ready(() => {
    $(document).keydown(function(e) {
        handleKeyDown(e.key);
    });
    drawBoard();
    drawKeyboard();
});

function handleKeyDown(key) {
    let guess = guesses[currentGuess];

    switch(key) {
        case "Backspace":
            if(guess.length > 0) {
                guesses[currentGuess] = guess.slice(0, -1);

                const cell = $($(".cell")[currentGuess * wordLength + guess.length - 1]);
                cell.removeClass("boing");
                cell.text('');
            }
            break;
        case "Enter":
            if(guess.length == wordLength) analyzeGuess();
            break;
        default:
            if(key.length != 1 || key < 'a' || key > 'z') return;

            if(guess.length < wordLength) {
                guess += key;
                guesses[currentGuess] = guess;

                const cell = $($(".cell")[currentGuess * wordLength + guess.length - 1]);
                cell.addClass("boing");
                cell.text(key);
            }
        }
}

function analyzeGuess() {
    if(!words.includes(guesses[currentGuess])) {
        alert(`Word not in list: ${guesses[currentGuess].toUpperCase()}`);
        return;
    }

    const setKeys = [];
    for(let i = 0; i < wordLength; i++) {
        const cell = $($(".cell")[currentGuess * wordLength + i]);
        const c = guesses[currentGuess][i];

        window.setTimeout(() => {
            let className = "";
            let classScore = 0;
            if(c == currentWord[i]) {
                className += "green";
                classScore = 3;
            } else if(currentWord.includes(c)) {
                className += "yellow";
                classScore = 2;
            } else {
                className += "gray";
                classScore = 1;
            }
            cell.addClass(className);

            // Do not update a key's class with a lower class: green > yellow > gray
            // Does the real Wordle implement this?
            let addNew = true;
            for(let k = 0; k < setKeys.length; k++) {
                if(setKeys[k].key == c) {
                    if(classScore > setKeys[k].score) {
                        $(`#${c}`).removeClass();
                        $(`#${c}`).addClass(`key ${className}`);
                        setKeys[k].score = classScore;
                    }
                    addNew = false;
                    break;
                }
            }
            if(addNew) {
                $(`#${c}`).removeClass();
                $(`#${c}`).addClass(`key ${className}`);
                setKeys.push({
                    key: c,
                    score: classScore
                });
            }

            if(i == wordLength - 1) { // This can probably be moved back after the for cycle after we use a proper HTML-based dialog, instead of alert()
                window.setTimeout(() => {
                    if(guesses[currentGuess] == currentWord) {
                        gameOver(true);
                    } else {
                        if(currentGuess == wordLength) {
                            gameOver(false);
                        } else {
                            currentGuess++;
                        }
                    }
                }, 120 * wordLength);
            }
        }, 100 * i);
    }
}

function gameOver(win) {
    if(win) {
        alert("YOU WIN");
    } else {
        alert(`YOU LOSE\nThe word was: ${currentWord.toUpperCase()}`);
    }
}

function drawBoard() {
    for(let r = 0; r < possibleGuesses; r++) {
        guesses[r] = '';
        const row = $(`<div class='row'></div>`);
        for(let c = 0; c < wordLength; c++) {
            const cell = $(`<div class='cell'></div>`);
            row.append(cell);
        }
        $(".board").append(row);
    }
}