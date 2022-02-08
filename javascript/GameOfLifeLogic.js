
// code for taking input clicks from user for alive cells
let isGenerationStop = false;
let isGenerationReset = false;
let isAllCellDead = false;
let generationCount = 0;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxText = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxText.innerText === ''){
            boxText.innerText = "A";
            boxText.setAttribute("style","background: black;");
        }
    });
});

startGen.addEventListener('click', gameOfLife);

//logic of generating next generation
function gameOfLife(){ 
    if(isGenerationStop == true){
        isGenerationStop = false;
    }
    else if(isGenerationReset == true){
        isGenerationReset = false;
    }
    else if(isAllCellDead == true){
        isAllCellDead = false;
    }else{
        document.querySelector('.info').innerText = "Generation No.: "+ generationCount;
        let currentState = [];
        for (let index = 0; index < 10; index++) {
            currentState.push(new Array(10).fill(""));
        }

        let totalRowCells = currentState.length;
        let totalColumnCells = currentState[0].length;
        let neighbours = [
            [-1,0],
            [-1, 1],
            [0,1],
            [1,1],
            [1,0],
            [1,-1],
            [0,-1],
            [-1,-1],
        ];

        let nextGen = [];
        for (let index = 0; index < totalRowCells; index++) {
            nextGen.push(new Array(totalColumnCells).fill(""));
        };
        let rowCheck = 0;
        let colCheck = 0;

        const boxTexts = document.querySelectorAll('.boxtext');
        for(var i=0;i<boxTexts.length;i++)
        {
            if(boxTexts[i].innerHTML === "A"){
                currentState[rowCheck][colCheck] = "A";
            }
            if(colCheck <= 8){
                colCheck += 1;
            }
            else{
                rowCheck += 1;
                colCheck = 0;
            }
        }

        for (let row = 0; row < totalRowCells; row++) {
            for (let col = 0; col < totalColumnCells; col++) {
                let liveCount = 0;
                neighbours.forEach(element => {
                    let x = element[0] + row;// x is used as x axis of an currentstate
                    let y = element[1] + col;// y is used as y axis of an currentstate
                    if((x >= 0 && x < totalRowCells) && (y >= 0 && y < totalColumnCells) && currentState[x][y] === "A"){
                        liveCount += 1;
                    }
                });
                if(currentState[row][col] === "" && liveCount === 3 ){
                    nextGen[row][col] = "A";
                }
                else if(currentState[row][col] === "A"){
                    if(liveCount === 2 || liveCount === 3){
                        nextGen[row][col] = "A";
                    }
                    if(liveCount >= 4 || liveCount <= 1)
                    {
                        nextGen[row][col] = " ";
                    }
                }
                liveCount = 0;
            }
        }
        
        let deadCellCounter = 0;
        for (let row = 0; row < totalRowCells; row++) {
            for (let col = 0; col < totalColumnCells; col++) {
                if(nextGen[row][col] === ""){
                    deadCellCounter += 1;
                }
                else{
                    currentState[row][col] = nextGen[row][col];
                }
            }
        }

        if(deadCellCounter === (totalRowCells * totalColumnCells)){
            isAllCellDead = true;
            document.querySelector('.info').innerText = "No life generation evolve after \nGeneration No.: "+ generationCount;
        }

        rowCheck = 0;
        colCheck = 0;
        let boxText = document.querySelectorAll('.boxtext');
        Array.from(boxText).forEach(element => {
            element.innerHTML = currentState[rowCheck][colCheck];
            element.setAttribute("style","background : black;");
            if(colCheck <= 8){
                colCheck += 1;
            }
            else{
                rowCheck += 1;
                colCheck = 0;
            }
        });
        generationCount += 1;
        setTimeout(gameOfLife, 1000);
    }
}

stopGen.addEventListener('click',stopGeneration);

function stopGeneration(){
    isGenerationStop = true;
    document.querySelector('.info').innerText = "Life generation has been stoped\nGeneration No.: "+ generationCount;
}

resetGen.addEventListener('click',resetGeneration);

function resetGeneration(){
    generationCount = 0;
    isGenerationReset = true;
    let boxText = document.querySelectorAll('.boxtext');
    Array.from(boxText).forEach(element => {
        element.innerHTML = "";
    });
    document.querySelector('.info').innerText = "Life generation has been reseted\nGeneration No.: "+ generationCount;
}