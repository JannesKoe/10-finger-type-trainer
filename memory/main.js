let columns = 10; //used to calculate the amount of grids (1 = grid = 50px)
let rows = 10;
let boardsize = Number(document.getElementById("boardsize").value)
document.getElementById("body").style.backgroundImage = 'linear-gradient(90deg, cornflowerblue 0%, #F1AA54 100%)';

function createboard() {
    finishedcards = [];
    tippcount = 0;
    document.getElementById("tipp").innerHTML = `tipp 💡${tippcount}/3`
    try {
        clearInterval(interval);
        time = 0;
        document.getElementById("timer").innerHTML = "Timer: 0"
    } catch (error) {
        //Timer wird nicht reseted
    }
    trys = 0
    gainedpoints = 0;
    count = 0;

    boardsize = Number(document.getElementById("boardsize").value)
    document.getElementById("highscore").innerHTML = "Highscore: " + getsaved("highscore") + "      BestTime: " + getsaved();
    let num = [];
    let option = Number(boardsize);
    let max = Math.pow(boardsize, 2);

    for (k = 0; k < 36; k++) { //remove if the element already exist
        if (document.getElementById(k)) {
            document.getElementById(k).remove();
        }
    }


    document.getElementById('tiles').style.setProperty("--file", Math.sqrt(max));
    document.getElementById('tiles').style.setProperty("--rank", Math.sqrt(max));

    for (j = 0; max > num.length; j++) {
        let rdm = Math.floor(Math.random() * max);
        if (!num.includes(rdm)) {
            num.push(rdm);
        }
    }
    //console.log(num)
    for (i = 0; i < max; i++) {
        const box = document.createElement('a');
        box.id = num[i];
        //box.innerHTML = num[i]; //maybe need again for numbers on cards

        switch (num[i]) {
            case 0:
            case 1:
                box.style.background = "url('img/Cracker.png')";
                break;
            case 2:
            case 3:
                box.style.background = "url('img/Cookie.png')";
                break;
            case 4:
            case 5:
                box.style.background = "url('img/Glückskeks.png')";
                break;
            case 6:
            case 7:
                box.style.background = "url('img/Hagebuddne.png')";
                break;
            case 8:
            case 9:
                box.style.background = "url('img/PrinzenRolle.png')";
                break;
            case 10:
            case 11:
                box.style.background = "url('img/MakkaroniPackung.png')";
                break;
            case 12:
            case 13:
                box.style.background = "url('img/VanilleKipferl.png')";
                break;
            case 14:
            case 15:
                box.style.background = "url('img/MarzipanSternPlätzchen.png')";
                break;
            case 16:
            case 17:
                box.style.background = "url('img/Italienischer_Keks.png')";
                break;
            case 18:
            case 19:
                box.style.background = 'url("img/Pinke_Spirale.png")';
                break;
            case 20:
            case 21:
                box.style.background = 'url("img/Alfojores.png")';
                break;
            case 22:
            case 23:
                box.style.background = 'url("img/Cucas.png")';
                break;
            case 24:
            case 25:
                box.style.background = 'url("img/Polish_Boi.png")';
                break;
            case 26:
            case 27:
                box.style.background = 'url("img/Apfel.png")';
                break;
            case 28:
            case 29:
                box.style.background = 'url("img/Birne.png")';
                break;
            case 30:
            case 31:
                box.style.background = 'url("img/croissant.png")';
                break;
            case 32:
            case 33:
                box.style.background = 'url("img/Gurke.png")';
                break;
            case 34:
            case 35:
                box.style.background = 'url("img/grapefruit.png")';
                break;
        }

        document.getElementById('tiles').appendChild(box);

        const quantity = 100;

        Array.from(Array(quantity)).map((tile, index) => {
            document.getElementById(box.id).appendChild(createTile(index, box.id));
        })


    }
}

let checker = []
let count = 0;

const handleclick = (id, index) => {
    //console.log("handleclick")
    count++
    if (count == 1) {
        globalThis.interval = setInterval(Timer, 1)
    }
    //console.log(checker)
    if (checker.length >= 2) {
        checkpair(index);
    } else {
        checker.push(id);
        if (checker.length >= 2) checkpair(index);
    }
}

var trys = 0;

const checkpair = (index) => {
    trys += 1;
    document.getElementById('try').innerHTML = "Versuche: " + trys;
    //console.log("checkpair")
    if (checker[0] % 2 == 0 && checker[1] % 2 == 0) { //wenn checker[0] gerade und checker[1] auch dann falsch
        closepair(index);
    } else if (checker[0] % 2 != 0 && checker[1] % 2 != 0) { //wenn beide ungerade dann falsch
        closepair(index);
    } else if (checker[0] % 2 == 0 && checker[1] % 2 != 0) { //wenn eines ungerade und das andere gerade
        if (checker[0] == checker[1] - 1) { //dann überprüfen ob wenn man -1 macht das ganze
            setTimeout(rightcouple(), 150); //dann gleich ist
        } else {
            closepair(index);
        }
    } else if (checker[0] % 2 != 0 && checker[1] % 2 == 0) {
        if (checker[1] == checker[0] - 1) {
            setTimeout(rightcouple(), 1000);
        } else {
            closepair(index);
        }
    }
}

let gainedpoints = 0;
let finishedcards = [];

function rightcouple(trys) {
    for (i = 0; i < 2; i++) {
        finishedcards.push(checker[i])
        let element = document.getElementById(checker[i]);
        element.style.background = '';
        element.style.outline = '';
        element.onclick = stopcheating();
    }
    gainedpoints++;
    document.getElementById('points').innerHTML = "Punkte: " + gainedpoints;
    checker = [];
    //console.log(boardsize)
    if (Math.pow(boardsize, 2) / 2 == gainedpoints) {
        save();
        trys = 0;
        gainedpoints = 0;
        //console.log("lshdg")
        clearInterval(interval);
        count = 0;
        document.getElementById("highscore").innerHTML = "Highscore: " + getsaved("highscore") + "      BestTime: " + getsaved();
        alert("Gute Arbeit! Du hast es geschafft")
    }
}

function closepair(index) {
    for (i = 0; i < 2; i++) {
        let nameclass = ".tiles" + checker[i];
        anime({
            targets: nameclass,
            backgroundColor: backgroundColor = /*'#000000'*/ "rgb(0, 0, 0)",
            delay: anime.stagger(50, {
                grid: [columns, rows],
                from: index
            })
        })
    }
    checker = [];

}

function stopcheating() {
    /*it does nothing*/
} //so you cant get more points to win


const createTile = (index, id) => {
    document.getElementById(id).style.setProperty("--columns", 10);
    document.getElementById(id).style.setProperty("--rows", 10);
    const tile = document.createElement('div');
    tile.id = "tile"
    tile.classList.add('tiles' + id);
    tile.onclick = e => handleanimation(index, id);

    return tile;
}

const handleanimation = (index, id) => {

    //setTimeout(handleclick(id), 500)

    let nameclass = ".tiles" + id

    /*console.log("index: " + index)
    console.log("id: " + id)

    console.log("sdfsf: " + nameclass)*/

    anime({
        targets: nameclass,
        backgroundColor: backgroundColor = "rgba(0, 0, 0, 0)",
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index
        }),
        changeComplete: function () {
            handleclick(id)
        }
    })


}

function resetbutton() {
    window.location.reload();
}

function save() {
    //console.log(boardsize)
    if (boardsize == 4) {
        if (localStorage.getItem("highscore4") > trys) {
            //console.log("blyat4 trys!!!" + trys)
            localStorage.setItem("highscore4", trys);
        } else if (!localStorage.getItem("highscore4")) {
            localStorage.setItem("highscore4", trys);
        }
        if (localStorage.getItem("Time4") < time) {
            localStorage.setItem("Time4", time / 100)
        } else if (!localStorage.getItem("Time4")) {
            localStorage.setItem("Time4", time / 100)
        }

    } else if (boardsize == 6) {
        if (localStorage.getItem("highscore6") > trys) {
            //console.log("blyat6")
            localStorage.setItem("highscore6", trys);
        } else if (!localStorage.getItem("highscore6")) {
            localStorage.setItem("highscore6", trys);
        }
        if (localStorage.getItem("Time6") < time) {
            localStorage.setItem("Time6", time / 100)
        } else if (!localStorage.getItem("Time6")) {
            localStorage.setItem("Time6", time / 100)
        }
    }
}

function getsaved(input) {
    if (localStorage.getItem(`highscore${boardsize}`)) {
        let highscore = parseInt(localStorage.getItem(`highscore${boardsize}`))
        let BestTime = localStorage.getItem(`Time${boardsize}`)
        if (input == "highscore") {
            return highscore;
        } else {
            return BestTime;
        }
    } else {
        let highscore = 0;
        let BestTime = 0;
        if (input == "highscore") {
            return highscore;
        } else {
            return BestTime;
        }
    }
}

let newcolorLeft;
let newcolorRight;

function changecolor(side) {
    let value = document.getElementById("myRange").value
    let difference = 100 - Math.abs(value);

    if (side == "left") {
        newcolorLeft = newcolorLeft = document.getElementById("ColorLeft").value;
    } else if (side == "right") {
        newcolorRight = newcolorRight = document.getElementById("ColorRight").value;
    }

    difference = difference.toString() + "%";
    value = value.toString() + "%";

    //console.log("Right: " + newcolorRight)
    //console.log("Left: " + newcolorLeft)

    //console.log("value: " + value)
    //console.log("difference: " + difference)

    document.getElementById("body").style.backgroundImage = `linear-gradient(90deg, ${newcolorLeft} ${difference}, ${newcolorRight} ${value})`;
}
var time = 0

function Timer() {
    time = time + 1;
    document.getElementById("timer").innerHTML = "Timer: " + time / 100
}


let tippcount = 0;

function tipp() {
    tippcount += 1;
    //alert(alreadyfinished());
    if (tippcount <= 3) {
        document.getElementById("tipp").innerHTML = `tipp 💡${tippcount}/3`
        const num = boardsize * boardsize - 1
        console.log("num: " + num)
        let numbers = []

        for (j = 0; j < num; j++) {
            numbers.push(j)
        }

        //console.log("Numbers_length: " + numbers.length);
        //console.log("Numbers: " + numbers)
        //console.log("finishedcards "+finishedcards)

        for (let i = 0; i < finishedcards.length; i++) {



            //console.warn("finishedcards " + finishedcards)
            //console.info("finishedcards[i]" + finishedcards[i])

            const search = Number(finishedcards[i])

            const index = numbers.indexOf(search);

            //console.error("index: " + index)

            if (index != -1) {
                numbers.splice(index, 1)
                /*console.log("removed: " + numbers)
                console.log("numbers_length[i]: " + numbers.length)*/
            }

        }

        const rdm = numbers[Math.floor(Math.random() * numbers.length)]
        //alert("rdm: " + rdm)
        rdm.toString();
        if (rdm % 2 == 0) {
            document.getElementById(rdm).style.outline = "2px aqua solid"
            document.getElementById(rdm + 1).style.outline = "2px aqua solid"
        } else {
            document.getElementById(rdm).style.outline = "2px aqua solid"
            document.getElementById(rdm - 1).style.outline = "2px aqua solid"
        }
    } else {
        alert("keine Tipps mehr übrig")
    }
}


window.onload = createboard();
