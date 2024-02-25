"use strict";
var Events;
(function (Events) {
    Events["ArrowUp"] = "ArrowUp";
    Events["ArrowDown"] = "ArrowDown";
    Events["ArrowRight"] = "ArrowRight";
    Events["ArrowLeft"] = "ArrowLeft";
})(Events || (Events = {}));
let field = [];
const N = 4;
class Logic {
    constructor() {
        this.swipePremission = true;
        this.emptyCells = [];
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
    CheckState() {
        let fullCells = 0;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (field[i][j] !== 0) {
                    fullCells++;
                }
                if (fullCells === 16) {
                    alert('End');
                }
            }
        }
    }
    CreateNew() {
        for (let i = 0; i < 2; i++) {
            this.FindEmptyCell();
            this.AddNewBlock();
        }
    }
}
class Controller {
    Controll(event) {
        const logic = new Logic;
        const visualization = new Visualization;
        if (event.key in Events) {
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
            if (logic.swipePremission) {
                logic.FindEmptyCell();
                logic.AddNewBlock();
            }
            logic.CheckState();
            visualization.Visualization();
        }
    }
}
class Field {
    constructor() {
        this.field = [];
        this.n = N;
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
        let fieldString = '';
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (field[i][j] !== 0) {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].innerHTML = field[i][j].toString();
                    this.valuesColors.map(vc => {
                        if (vc.value === field[i][j]) {
                            document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", `background-color:${vc.color}`);
                        }
                    });
                    if (field[i][j] >= 128) {
                        document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", "background-color:#E7CD70");
                    }
                }
                else {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].innerHTML = ' ';
                    document.getElementsByClassName(this.service.joinHTMLClassName(i, j))[0].setAttribute("style", "background-color:#CDC1B3");
                }
            }
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
    }
    Start() {
        document.addEventListener('keydown', this.controller.Controll);
    }
}
const game = new Game();
game.Start();
