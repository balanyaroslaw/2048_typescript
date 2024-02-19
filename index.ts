type TField = Array<Array<number>>

interface ICell
{
    i:number,
    j:number
}

enum Events
{
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    ArrowRight = "ArrowRight",
    ArrowLeft = "ArrowLeft"
}

let field:TField = []

const N:number = 4;

class Logic
{

    private emptyCells:Array<ICell> = [];


    public FindEmptyCell():void
    {
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

        const chanceOfAddingDigit:number = Math.floor(Math.random()*4)
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

    public SwipeUp():void
    {
        for(let i = N; i > 0; i--)
        {
            for(let j = N; j >= 0; j--)
            {
                try 
                {
                    if(field[i-1][j]===0)
                    {   
                        field[i-1][j] = field[i][j]
                        field[i][j] = 0
                    }   
                }catch{}
            }
        }
    }

    public SwipeDown():void
    {
        for(let i = 1; i <= N; i++)
        {
            for(let j = 0; j < N; j++)
            {
                try 
                {
                    if(field[i][j]===0)
                    {   
                        field[i][j] = field[i-1][j]
                        field[i-1][j] = 0
                    }   
                }catch{}
            }
        }
    }

    public SwipeRight():void
    {
        for(let i = 0; i < N; i++)
        {
            for(let j = 1; j <= N; j++)
            {
                try 
                {
                    if(field[i][j]===0)
                    {   
                        field[i][j] = field[i][j-1]
                        field[i][j-1] = 0
                    }   
                }catch{}
            }
        }
    }

    public SwipeLeft():void
    {
        for(let i = N; i >= 0; i--)
        {
            for(let j = N-1; j >= 1; j--)
            {
                try 
                {
                    if(field[i][j-1]===0)
                    {   
                        field[i][j-1] = field[i][j]
                        field[i][j] = 0
                    }   
                }catch{}
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
        }

        /*logic.FindEmptyCell()
        logic.AddNewBlock()*/
        visualization.Visualization()

    }
}
class Field 
{
    private field:TField = [];
    private readonly n:number = N;

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
    

    public Visualization():void
    {
        let fieldString:string = ''
        for(let i = 0; i < N; i++)
        {
            for(let j = 0; j < N; j++)
            {
                console.log()
                fieldString += field[i][j].toString() + '&emsp;'
            }
            fieldString += '<br>'
        }
        
        document.getElementsByClassName('test')[0].innerHTML = fieldString
    }
}
class Game
{
    private controller:Controller = new Controller

    private logic:Logic = new Logic
    
    private field:Field = new Field

    private visualization = new Visualization
    constructor()
    {   
        this.field.CreateField()
        this.logic. FindEmptyCell()
        this.logic.AddNewBlock()
        this.visualization.Visualization()
    }
    public Start():void
    {
        document.addEventListener('keydown', this.controller.Controll)
    }
}
const game:Game = new Game()
game.Start()