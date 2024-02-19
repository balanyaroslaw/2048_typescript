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
        this.emptyCells = [];
    }
    FindEmptyCell() {
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
    SwipeUp() {
        for (let i = N; i > 0; i--) {
            for (let j = N; j >= 0; j--) {
                try {
                    if (field[i - 1][j] === 0) {
                        field[i - 1][j] = field[i][j];
                        field[i][j] = 0;
                    }
                }
                catch (_a) { }
            }
        }
    }
    SwipeDown() {
        for (let i = 1; i <= N; i++) {
            for (let j = 0; j < N; j++) {
                try {
                    if (field[i][j] === 0) {
                        field[i][j] = field[i - 1][j];
                        field[i - 1][j] = 0;
                    }
                }
                catch (_a) { }
            }
        }
    }
    SwipeRight() {
        for (let i = 0; i < N; i++) {
            for (let j = 1; j <= N; j++) {
                try {
                    if (field[i][j] === 0) {
                        field[i][j] = field[i][j - 1];
                        field[i][j - 1] = 0;
                    }
                }
                catch (_a) { }
            }
        }
    }
    SwipeLeft() {
        for (let i = N; i >= 0; i--) {
            for (let j = N - 1; j >= 1; j--) {
                try {
                    if (field[i][j - 1] === 0) {
                        field[i][j - 1] = field[i][j];
                        field[i][j] = 0;
                    }
                }
                catch (_a) { }
            }
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
        }
        /*logic.FindEmptyCell()
        logic.AddNewBlock()*/
        visualization.Visualization();
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
    Visualization() {
        let fieldString = '';
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                console.log();
                fieldString += field[i][j].toString() + '&emsp;';
            }
            fieldString += '<br>';
        }
        document.getElementsByClassName('test')[0].innerHTML = fieldString;
    }
}
class Game {
    constructor() {
        this.controller = new Controller;
        this.logic = new Logic;
        this.field = new Field;
        this.visualization = new Visualization;
        this.field.CreateField();
        this.logic.FindEmptyCell();
        this.logic.AddNewBlock();
        this.visualization.Visualization();
    }
    Start() {
        document.addEventListener('keydown', this.controller.Controll);
    }
}
const game = new Game();
game.Start();
