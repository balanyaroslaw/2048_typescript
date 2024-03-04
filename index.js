"use strict";
var Events;
(function (Events) {
    Events["ArrowUp"] = "ArrowUp";
    Events["ArrowDown"] = "ArrowDown";
    Events["ArrowRight"] = "ArrowRight";
    Events["ArrowLeft"] = "ArrowLeft";
})(Events || (Events = {}));
let field = [];
let stateField = [];
const N = 4;
let currentScore = 0;
let xDown = null;
let yDown = null;
class Logic {
    constructor() {
        this.field = new Field;
        this.swipePremission = true;
        this.loseGame = false;
        this.winGame = false;
        this.emptyCells = [];
        this.service = new Service;
    }
    FindEmptyCell() {
        this.emptyCells = [];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (field[i][j] === 0) {
                    this.emptyCells.push({ i: i, j: j });
                }
            }
        }
    }
    AddNewBlock() {
        const countOfEmptyCells = this.emptyCells.length;
        const chanceOfAddingDigit = Math.floor(Math.random() * 4);
        const randomEmptyCell = Math.floor(Math.random() * countOfEmptyCells);
        const i = this.emptyCells[randomEmptyCell].i;
        const j = this.emptyCells[randomEmptyCell].j;
        if (chanceOfAddingDigit !== 3) {
            field[i][j] = 2;
        }
        else {
            field[i][j] = 4;
        }
    }
    PremissionCondition(isMoved, isNotMoved) {
        if (isMoved > 0) {
            this.swipePremission = true;
        }
        else if (isNotMoved > 0 && isMoved === 0) {
            this.swipePremission = false;
        }
    }
    SwipeUp() {
        let isMoved = 0;
        let isNotMoved = 0;
        try {
            for (let k = 0; k < N; k++) {
                for (let i = 1; i < N; i++) {
                    if (field[0][i] !== 0) {
                        this.swipePremission = false;
                    }
                    for (let j = 0; j < N; j++) {
                        if (field[i - 1][j] === 0 && field[i][j] !== 0) {
                            field[i - 1][j] = field[i][j];
                            field[i][j] = 0;
                            isMoved++;
                        }
                        else if (field[i - 1][j] !== 0 && field[i][j] !== 0 && field[i - 1][j] === field[i][j]) {
                            field[i - 1][j] = field[i - 1][j] + field[i][j];
                            currentScore = currentScore + field[i - 1][j];
                            field[i][j] = 0;
                            isMoved++;
                        }
                        else if (field[i - 1][j] !== 0 && field[i][j] !== 0 && field[i - 1][j] !== field[i][j]) {
                            isNotMoved++;
                        }
                    }
                }
            }
            this.PremissionCondition(isMoved, isNotMoved);
        }
        catch (_) { }
    }
    SwipeDown() {
        let isMoved = 0;
        let isNotMoved = 0;
        for (let k = 0; k < N; k++) {
            for (let i = N; i >= 0; i--) {
                if (field[N - 1][i] !== 0) {
                    this.swipePremission = false;
                }
                for (let j = 0; j < N; j++) {
                    try {
                        if (field[i][j] === 0 && field[i - 1][j] !== 0) {
                            field[i][j] = field[i - 1][j];
                            field[i - 1][j] = 0;
                            isMoved++;
                        }
                        else if (field[i][j] !== 0 && field[i - 1][j] !== 0 && field[i][j] === field[i - 1][j]) {
                            field[i][j] = field[i][j] + field[i - 1][j];
                            currentScore = currentScore + field[i][j];
                            field[i - 1][j] = 0;
                            isMoved++;
                        }
                        else if (field[i][j] !== 0 && field[i - 1][j] !== 0 && field[i][j] !== field[i - 1][j]) {
                            isNotMoved++;
                        }
                    }
                    catch (_) { }
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved);
    }
    SwipeRight() {
        let isMoved = 0;
        let isNotMoved = 0;
        for (let k = 0; k < N; k++) {
            for (let i = 0; i < N; i++) {
                if (field[i][N - 1] !== 0) {
                    this.swipePremission = false;
                }
                for (let j = N; j > 0; j--) {
                    try {
                        if (field[i][j] === 0 && field[i][j - 1] !== 0) {
                            field[i][j] = field[i][j - 1];
                            field[i][j - 1] = 0;
                            isMoved++;
                        }
                        else if (field[i][j] !== 0 && field[i][j - 1] !== 0 && field[i][j] === field[i][j - 1]) {
                            field[i][j] = field[i][j] + field[i][j - 1];
                            currentScore = currentScore + field[i][j];
                            field[i][j - 1] = 0;
                            isMoved++;
                        }
                        else if (field[i][j] !== 0 && field[i][j - 1] !== 0 && field[i][j] !== field[i][j - 1]) {
                            isNotMoved++;
                        }
                    }
                    catch (_) { }
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved);
    }
    SwipeLeft() {
        let isMoved = 0;
        let isNotMoved = 0;
        for (let k = 0; k < N; k++) {
            for (let i = 0; i < N; i++) {
                if (field[i][0] !== 0) {
                    this.swipePremission = false;
                }
                for (let j = 1; j < N; j++) {
                    if (field[i][j - 1] === 0 && field[i][j] !== 0) {
                        field[i][j - 1] = field[i][j];
                        field[i][j] = 0;
                        isMoved++;
                    }
                    else if (field[i][j - 1] !== 0 && field[i][j] !== 0 && field[i][j - 1] === field[i][j]) {
                        field[i][j - 1] = field[i][j - 1] + field[i][j];
                        currentScore = currentScore + field[i][j - 1];
                        field[i][j] = 0;
                        isMoved++;
                    }
                    else if (field[i][j - 1] !== 0 && field[i][j] !== 0 && field[i][j - 1] !== field[i][j]) {
                        isNotMoved++;
                    }
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved);
    }
    CheckStatus() {
        let fullCells = 0;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (field[i][j] !== 0) {
                    fullCells++;
                }
                if (field[i][j] === 2048) {
                    this.winGame = true;
                }
            }
        }
        if (fullCells === 16 && this.service.hasUniqueNeighbors(field)) {
            this.loseGame = true;
        }
    }
    CreateNew() {
        for (let i = 0; i < 2; i++) {
            this.FindEmptyCell();
            this.AddNewBlock();
        }
    }
    FieldState(field) {
        let state = this.service.Clone(field);
        if (stateField.length >= 2) {
            stateField.pop();
        }
        stateField.push(state);
    }
    CheckRecord(score) {
        if (localStorage.getItem('game_record') === null) {
            localStorage.setItem('game_record', score.toString());
        }
        else {
            let existedRecord = localStorage.getItem('game_record');
            if (score > parseInt(existedRecord)) {
                localStorage.removeItem('game_record');
                localStorage.setItem('game_record', score.toString());
            }
            else {
                localStorage.removeItem('game_record');
                localStorage.setItem('game_record', existedRecord);
            }
        }
    }
}
class Controller {
    Controll(event) {
        const logic = new Logic;
        const visualization = new Visualization;
        if (event.key in Events) {
            logic.FieldState(field);
            logic.CheckStatus();
            if (!logic.loseGame && !logic.winGame) {
                switch (event.key) {
                    case Events.ArrowUp:
                        {
                            logic.SwipeUp();
                            break;
                        }
                    case Events.ArrowDown:
                        {
                            logic.SwipeDown();
                            break;
                        }
                    case Events.ArrowRight:
                        {
                            logic.SwipeRight();
                            break;
                        }
                    case Events.ArrowLeft:
                        {
                            logic.SwipeLeft();
                            break;
                        }
                }
                logic.CheckStatus();
                if (logic.swipePremission) {
                    logic.FindEmptyCell();
                    logic.AddNewBlock();
                }
            }
            else if (logic.loseGame) {
                visualization.gameLoseStateVisualization();
                logic.CheckRecord(currentScore);
            }
            else if (logic.winGame) {
                visualization.gameWinStateVisualization();
                logic.CheckRecord(currentScore);
            }
            logic.CheckRecord(currentScore);
            visualization.Score();
            visualization.Visualization();
        }
    }
}
class Field {
    constructor() {
        this.field = [];
    }
    CreateField() {
        for (let i = 0; i < N; i++) {
            this.field[i] = [];
            for (let j = 0; j < N; j++) {
                this.field[i][j] = 0;
            }
        }
        field = this.field;
    }
}
class Visualization {
    constructor() {
        this.valuesColors = [{ value: 2, color: "#EEE4DA" }, { value: 4, color: "#EEE0C6" },
            { value: 8, color: "#F3B174" }, { value: 16, color: "#E89A6C" },
            { value: 32, color: "#E68366" }, { value: 64, color: "#E46747" }];
        this.service = new Service;
    }
    Visualization() {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (field[i][j] !== 0) {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].innerHTML = field[i][j].toString();
                    this.valuesColors.map(vc => {
                        if (vc.value === field[i][j]) {
                            document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", `background-color:${vc.color};
                            opacity:1;
                            transition-property: opacity;
                            transition-duration: 0.5s;`);
                        }
                    });
                    if (field[i][j] >= 128) {
                        document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", `background-color:#E7CD70;
                        opacity:1;
                        transition-property: opacity;
                        transition-duration: 0.5s;`);
                    }
                }
                else {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].innerHTML = ' ';
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", "background-color:#CDC1B3");
                }
            }
        }
    }
    createButton(menuText, buttonText) {
        const moduleWindow = document.querySelector('.menu');
        moduleWindow.innerHTML = menuText;
        moduleWindow['style'].visibility = "visible";
        const button = document.createElement('span');
        button.innerHTML += buttonText;
        button.classList.add('button');
        if (buttonText === 'RESTART') {
            button.addEventListener('click', (e) => { location.reload(); }, false);
        }
        else if (buttonText === 'RESUME') {
            button.addEventListener('click', (e) => { moduleWindow['style'].visibility = "hidden"; }, false);
        }
        moduleWindow.appendChild(button);
    }
    gameWinStateVisualization() {
        this.createButton("YOU WIN", "RESUME");
    }
    gameLoseStateVisualization() {
        this.createButton("YOU LOSE", "RESTART");
    }
    Score() {
        let score = document.querySelector('.score__value');
        score.innerHTML = currentScore.toString();
    }
    Record() {
        let record = document.querySelector('.record__value');
        record.innerHTML = localStorage.getItem('game_record');
    }
    ReturnVisualization() {
        if (stateField.length > 0) {
            field = stateField[stateField.length - 1];
            this.Visualization();
        }
    }
}
class Service {
    splitHTMLClassName(HTMLClassName) {
        let [i, j] = HTMLClassName.replace('cell', ' ')
            .split('_')
            .map(i => { return Number.parseInt(i); });
        let cellNumber = { i: i, j: j };
        return cellNumber;
    }
    joinHTMLClassName(i, j) {
        let HTMLClassName = `cell ${i}_${j}`;
        return HTMLClassName;
    }
    Clone(field) {
        let state = [];
        for (let i = 0; i < N; i++) {
            state[i] = [];
            for (let j = 0; j < N; j++) {
                state[i][j] = field[i][j];
            }
        }
        return state;
    }
    hasUniqueNeighbors(field) {
        const numRows = field.length;
        const numCols = field[0].length;
        const hasSameNeighbors = (row, col, value) => {
            for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, numRows - 1); i++) {
                for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, numCols - 1); j++) {
                    if (i !== row || j !== col) {
                        if (field[i][j] === value && field[i][j] !== 0 && value !== 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const value = field[row][col];
                if (hasSameNeighbors(row, col, value)) {
                    return false;
                }
            }
        }
        return true;
    }
}
class Game {
    constructor() {
        this.controller = new Controller;
        this.logic = new Logic;
        this.field = new Field;
        this.visualization = new Visualization;
        this.field.CreateField();
        this.logic.CreateNew();
        this.visualization.Visualization();
        this.BackReturn();
        this.Restart();
        this.visualization.Record();
    }
    BackReturn() {
        const returnButton = document.querySelector('.return__back');
        returnButton.addEventListener("click", (e) => { this.visualization.ReturnVisualization(); });
    }
    Restart() {
        this.logic.CheckRecord(currentScore);
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener("click", (e) => { location.reload(); });
    }
    Process() {
        document.addEventListener('keydown', this.controller.Controll);
    }
}
const game = new Game();
game.Process();
