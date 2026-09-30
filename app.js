var height = 6; //nummer av gissningar
var width = 5; //ordets längd

var row = 0; //gissnings nummer
var col = 0; //nuvarande bokstav

var gameOver = false;
var word = "SQUID";

window.onload = function(){
    initialize();
}

function initialize() {
    //gameboarden
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile")
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;
        if ("KeyA" <= e.code && e.code <= "KeyZ"){
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width){
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }
        else if (e.code == "Enter") {
            if (col != width) return;
            update();
            row += 1; //ny rad
            col = 0; //börja vid 0 för en ny rad
        }
        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Är det rätt plats?
        if (word[c] == letter) {
            currTile.classList.add("correct")
            correct += 1;
        }
        //Är bokstaven i ordet?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        }
        //Inte i ordet
        else {
            currTile.classList.add("absent")
        }
        if (correct == width) {
            gameOver = true;
        }
    }
}