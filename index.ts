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

const N:number = 4;

class Logic
{

    public swipePremission = true

    private emptyCells:Array<ICell> = [];

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

    public CheckState():void
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
                if(fullCells===16)
                {   
                    alert('End')
                }
                
            }
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
            if(logic.swipePremission)
            {
                logic.FindEmptyCell()
                logic.AddNewBlock()
            }
            logic.CheckState()
            visualization.Visualization()
        }

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
    private valuesColors:Array<IColors> = [{value:2, color:"#EEE4DA"},{value:4, color:"#EEE0C6"},
                                           {value:8, color:"#F3B174"},{value:16, color:"#E89A6C"},
                                           {value:32, color:"#E68366"},{value:64, color:"#E46747"}]
    private service:Service = new Service
    public Visualization():void
    {
        let fieldString:string = ''
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
                            document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].setAttribute("style",`background-color:${vc.color}`);
                        }
                    })
                    if(field[i][j]>=128)
                    {
                        document.getElementsByClassName(this.service.joinHTMLClassName(i,j))[0].setAttribute("style","background-color:#E7CD70");
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
        this.logic.CreateNew()
        this.visualization.Visualization()
    }
    public Start():void
    {
        document.addEventListener('keydown', this.controller.Controll)
    }
}
const game:Game = new Game()
game.Start()