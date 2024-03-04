type TField = Array<Array<number>>

interface ICell
{
    i:number,
    j:number
}

interface IColors
{
    value:number,
    color:string
}

enum Events
{
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowRight = "ArrowRight",
    ArrowLeft = "ArrowLeft"
}

let field:TField = []

let stateField:Array<TField> = [];

const N:number = 4;

let currentScore:number = 0

let xDown = null;                                                        
let yDown = null;       

class Logic
{

    private field:Field = new Field

    public swipePremission:boolean = true

    public loseGame:boolean = false

    public winGame:boolean = false

    private emptyCells:Array<ICell> = [];

    private service:Service = new Service

    public FindEmptyCell():void
    {
        this.emptyCells = []
        for(let i = 0; i < N; i++)
        {
            for(let j = 0; j < N; j++)
            {
                if(field[i][j] === 0)
                {
                    this.emptyCells.push({i:i, j:j})
                }
            }
        }
    }

    public AddNewBlock():void
    {
        const countOfEmptyCells:number = this.emptyCells.length

        const chanceOfAddingDigit:number = Math.floor(Math.random() *4 )
        const randomEmptyCell:number = Math.floor(Math.random() * countOfEmptyCells)

        const i:number = this.emptyCells[randomEmptyCell].i
        const j:number = this.emptyCells[randomEmptyCell].j

        if(chanceOfAddingDigit !== 3)
        {
            field[i][j] = 2
        }
        else
        {
            field[i][j] = 4
        }
    }
    public PremissionCondition(isMoved:number, isNotMoved:number):void
    {
        if(isMoved>0)
        {
            this.swipePremission = true
        }
        else if(isNotMoved>0 && isMoved===0)
        {
            this.swipePremission = false
        }
    }

    public SwipeUp():void
    {
        let isMoved = 0
        let isNotMoved = 0
        try
        {
            for(let k = 0; k < N; k++)
            {
                for(let i = 1; i < N; i++ )
                {
                    if(field[0][i] !== 0)
                    {
                        this.swipePremission = false
                    }
                    for(let j = 0; j < N; j++)
                    {
                        if(field[i-1][j] === 0 && field[i][j] !== 0)
                        {
                            field[i-1][j] = field[i][j];
                            field[i][j] = 0;
                            isMoved++
                        }
                        else if(field[i-1][j] !== 0 && field[i][j] !== 0 && field[i-1][j]===field[i][j])
                        {
                            field[i-1][j] = field[i-1][j] + field[i][j];
                            currentScore = currentScore + field[i-1][j] 
                            field[i][j] = 0;
                            isMoved++
                        }
                        else if(field[i-1][j] !== 0 && field[i][j] !== 0 && field[i-1][j]!==field[i][j])
                        {
                            isNotMoved++
                        }
                    }
                }
            }
            this.PremissionCondition(isMoved, isNotMoved)

        }catch(_) {}
    }

    public SwipeDown():void
    {
        let isMoved = 0
        let isNotMoved = 0
        for(let k = 0; k < N; k++)
        {
            for(let i = N; i >= 0; i--)
            {
                if(field[N-1][i] !== 0)
                {
                    this.swipePremission = false
                }
                for(let j = 0; j < N; j++)
                {
                    try
                    {
                        if(field[i][j] === 0 && field[i-1][j]!==0)
                        {
                            field[i][j] = field[i-1][j]
                            field[i-1][j] = 0
                            isMoved++
                        }
                        else if(field[i][j] !== 0 && field[i-1][j]!==0 && field[i][j] === field[i-1][j])
                        {
                            field[i][j] = field[i][j] + field[i-1][j]
                            currentScore = currentScore + field[i][j]
                            field[i-1][j] = 0
                            isMoved++
                        }
                        else if(field[i][j] !== 0 && field[i-1][j]!==0 && field[i][j] !== field[i-1][j])
                        {
                            isNotMoved++;
                        }
                    } catch(_){}
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved)
    }

    public SwipeRight():void
    {
        let isMoved = 0
        let isNotMoved = 0
        for(let k = 0; k < N; k++)
        {
            for(let i = 0; i < N; i++)
            {
                if(field[i][N-1] !== 0)
                {
                    this.swipePremission = false
                }
                for(let j = N; j > 0; j--)
                {
                    try
                    {
                        if(field[i][j]===0 && field[i][j-1]!==0)
                        {
                            field[i][j] = field[i][j-1]
                            field[i][j-1] = 0
                            isMoved++
                        }
                        else if(field[i][j]!==0 && field[i][j-1]!==0 && field[i][j] === field[i][j-1])
                        {
                            field[i][j] = field[i][j] + field[i][j-1]
                            currentScore = currentScore +  field[i][j]
                            field[i][j-1] = 0
                            isMoved++
                        }
                        else if(field[i][j]!==0 && field[i][j-1]!==0 && field[i][j] !== field[i][j-1])
                        {
                            isNotMoved++
                        }
                    }catch(_){}
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved)
    }

    public SwipeLeft():void
    {
        let isMoved = 0
        let isNotMoved = 0
        for(let k = 0; k < N; k++)
        {
            for(let i = 0; i < N; i++)
            {
                if(field[i][0] !== 0)
                {
                    this.swipePremission = false
                }
                for(let j = 1; j < N; j++)
                {
                    if(field[i][j-1] ===0 && field[i][j] !== 0)
                    {
                        field[i][j-1] =  field[i][j]
                        field[i][j] = 0
                        isMoved++
                    }
                    else if(field[i][j-1] !== 0 && field[i][j] !== 0 && field[i][j-1] === field[i][j])
                    {
                        field[i][j-1] = field[i][j-1] + field[i][j]
                        currentScore = currentScore + field[i][j-1]
                        field[i][j] = 0
                        isMoved++
                    }
                    else if(field[i][j-1] !== 0 && field[i][j] !== 0 && field[i][j-1] !== field[i][j])
                    {
                        isNotMoved++
                    }
                }
            }
        }
        this.PremissionCondition(isMoved, isNotMoved)
    }

    public CheckStatus():void
    {
        let fullCells:number = 0;
        
        for(let i = 0; i < N; i++)
        {
            for(let j = 0; j < N; j++)
            {
                if(field[i][j] !== 0)
                {
                    fullCells++
                }
                if(field[i][j] === 2048)
                {
                    this.winGame = true
                }
            }
        }
        if(fullCells===16 && this.service.hasUniqueNeighbors(field))
        {
            this.loseGame = true
        }
    }

    public CreateNew():void
    {
        for(let i = 0; i < 2; i++)
        {
            this.FindEmptyCell()
            this.AddNewBlock()
        }
    }

    public FieldState(field:TField):void
    {
        let state = this.service.Clone(field)
        if(stateField.length>=2)
        {
            stateField.pop()
        }
        stateField.push(state)
    }

    public CheckRecord(score:number):void
    {
        if(localStorage.getItem('game_record') === null)
        {
            localStorage.setItem('game_record', score.toString());
        }
        else
        {
            let existedRecord:string = localStorage.getItem('game_record')!
            if(score > parseInt(existedRecord))
            {
                localStorage.removeItem('game_record')
                localStorage.setItem('game_record', score.toString());
            }
            else
            {
                localStorage.removeItem('game_record')
                localStorage.setItem('game_record', existedRecord);
            }
        }
    }
}
class Controller
{
    public Controll(event:KeyboardEvent):void
    {
        
        const logic:Logic = new Logic
        const visualization:Visualization = new Visualization
        if(event.key in Events)
        {   
            logic.FieldState(field)
            logic.CheckStatus()
            if(!logic.loseGame && !logic.winGame)
            {
                switch(event.key)
                {
                    case Events.ArrowUp:
                    {
                        logic.SwipeUp()
                        break;
                    }
                    case Events.ArrowDown:
                    {
                        logic.SwipeDown()
                        break;
                    }
                    case Events.ArrowRight:
                    {
                        logic.SwipeRight()
                        break
                    }
                    case Events.ArrowLeft:
                    {
                        logic.SwipeLeft()
                        break
                    }
                } 
                logic.CheckStatus()
                if(logic.swipePremission)
                {
                    logic.FindEmptyCell()
                    logic.AddNewBlock()
                } 
            }
            else if(logic.loseGame)
            {
                visualization.gameLoseStateVisualization()
                logic.CheckRecord(currentScore)
            }
            else if(logic.winGame)
            {
                visualization.gameWinStateVisualization()
                logic.CheckRecord(currentScore)
            }
            logic.CheckRecord(currentScore)
            visualization.Score()
            visualization.Visualization()
        }
    }
}
class Field 
{
    private field:TField = [];

    public CreateField():void
    {
        for (let i = 0; i < N; i++)
        {
            this.field[i] = [];
            for (let j = 0; j < N; j++)
            {
                this.field[i][j] = 0;
            }
         }
        field = this.field
    }
}

class Visualization
{
    private valuesColors:Array<IColors> = [{value:2, color:"#EEE4DA"},{value:4, color:"#EEE0C6"},
                                           {value:8, color:"#F3B174"},{value:16, color:"#E89A6C"},
                                           {value:32, color:"#E68366"},{value:64, color:"#E46747"}]
    private service:Service = new Service
    public Visualization():void
    {
        for(let i = 0; i < N; i++)
        {
            for(let j = 0; j < N; j++)
            {
                if(field[i][j] !== 0)
                {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].innerHTML = field[i][j].toString()
                    this.valuesColors.map(vc=>{
                        if(vc.value===field[i][j])
                        {
                            document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].setAttribute("style",
                            `background-color:${vc.color};
                            opacity:1;
                            transition-property: opacity;
                            transition-duration: 0.5s;`);

                        }
                    })
                    if(field[i][j]>=128)
                    {
                        document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].setAttribute("style",
                        `background-color:#E7CD70;
                        opacity:1;
                        transition-property: opacity;
                        transition-duration: 0.5s;`);
                    }
                }
                else
                {
                    document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].innerHTML = ' '
                    document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].setAttribute("style","background-color:#CDC1B3");
                }
            }
        }
    }
    private createButton(menuText:string, buttonText:string):void
    {
        const moduleWindow:HTMLElement = document.querySelector<HTMLElement>('.menu')!;

        moduleWindow.innerHTML = menuText
        moduleWindow['style'].visibility = "visible";

        const button = document.createElement('span')
        button.innerHTML += buttonText
        button.classList.add('button')
        if(buttonText === 'RESTART')
        {
            button.addEventListener('click', (e:Event) =>{location.reload()}, false)
        }
        else if(buttonText === 'RESUME')
        {
            button.addEventListener('click', (e:Event) =>{moduleWindow['style'].visibility = "hidden";}, false)
        }

        moduleWindow.appendChild(button);

    }

    public gameWinStateVisualization():void
    {
        this.createButton("YOU WIN", "RESUME")
    }

    public gameLoseStateVisualization():void
    {
        this.createButton("YOU LOSE", "RESTART")
    }

    public Score():void
    {
        let score:HTMLElement = document.querySelector('.score__value')!;

        score.innerHTML = currentScore.toString()
    }

    public Record():void
    {
        let record:HTMLElement = document.querySelector('.record__value')!;

        record.innerHTML = localStorage.getItem('game_record')!
    }


    public ReturnVisualization():void
    {
        if(stateField.length>0)
        {
            field = stateField[stateField.length - 1]; 
            this.Visualization()   
        }
    }
}

class Service
{
    public splitHTMLClassName(HTMLClassName:string):ICell
    {
        let [i,j]:number[] = HTMLClassName.replace('cell',' ')
                                          .split('_')
                                          .map(i=>{return Number.parseInt(i)})
        let cellNumber:ICell = {i:i,j:j}
        return cellNumber
    }

    public joinHTMLClassName(i:number, j:number):string
    {
        let HTMLClassName:string = `cell ${i}_${j}`
        return HTMLClassName
    }

    public Clone(field:TField):TField
    {
        let state:TField = []
        for(let i = 0; i < N; i++)
        {
            state[i] = [];
            for(let j = 0; j < N; j++)
            {
                state[i][j] = field[i][j]
            }
        }

        return state
    }
    public hasUniqueNeighbors(field: TField): boolean {
        const numRows: number = field.length;
        const numCols: number = field[0].length;
    
       const hasSameNeighbors = (row: number, col: number, value: number): boolean => 
       {
            for (let i: number = Math.max(0, row - 1); i <= Math.min(row + 1, numRows - 1); i++)
            {
                for (let j: number = Math.max(0, col - 1); j <= Math.min(col + 1, numCols - 1); j++)
                {
                    if (i !== row || j !== col) {
                        if (field[i][j] === value && field[i][j] !== 0 && value !== 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        for (let row: number = 0; row < numRows; row++) {
            for (let col: number = 0; col < numCols; col++) {
                const value: number = field[row][col];
                if (hasSameNeighbors(row, col, value)) {
                    return false;
                }
            }
        }
    
        return true; 
    }
    
}
class Game
{
    private controller:Controller = new Controller

    private logic:Logic = new Logic
    
    private field:Field = new Field

    private visualization:Visualization = new Visualization

    constructor()
    {   
        this.field.CreateField()
        this.logic.CreateNew()
        this.visualization.Visualization()
        this.BackReturn()
        this.Restart()
        this.visualization.Record()
    }
    private BackReturn():void
    {
        const returnButton:HTMLElement = document.querySelector<HTMLElement>('.return__back')!;
        returnButton.addEventListener("click", (e:Event) =>{this.visualization.ReturnVisualization()})
    }

    private Restart():void
    {
        this.logic.CheckRecord(currentScore)
        const restartButton:HTMLElement = document.querySelector<HTMLElement>('.restart')!;
        restartButton.addEventListener("click", (e:Event) =>{location.reload()})
    }

    public Process():void
    {
        document.addEventListener('keydown', this.controller.Controll)
    }
}
const game:Game = new Game()
game.Process()