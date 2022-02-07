
// code for taking input clicks from user for alive cells
let isgenerationstop = false;
let isgenerationreset = false;
let Isallcelldead = false;
let generationcount = 0;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = "A";
            boxtext.setAttribute("style","background: black;");
        }
    });
});

startgen.addEventListener('click', gameOfLife);

//logic of generating next generation
function gameOfLife(){ 
    if(isgenerationstop == true){
        isgenerationstop = false;
    }
    else if(isgenerationreset == true){
        isgenerationreset = false;
    }
    else if(Isallcelldead == true){
        Isallcelldead = false;
    }else{
        document.querySelector('.info').innerText = "Generation No.: "+ generationcount;
        let currentstate = [];
        for (let index = 0; index < 10; index++) {
            currentstate.push(new Array(10).fill(""));
        }

        let totalrowcells = currentstate.length;
        let totalcolumncells = currentstate[0].length;
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

        let nextgen = [];
        for (let index = 0; index < totalrowcells; index++) {
            nextgen.push(new Array(totalcolumncells).fill(""));
        };
        let rowcheck = 0;
        let colcheck = 0;

        const boxtexts = document.querySelectorAll('.boxtext');
        for(var i=0;i<boxtexts.length;i++)
        {
            if(boxtexts[i].innerHTML === "A"){
                currentstate[rowcheck][colcheck] = "A";
            }
            if(colcheck <= 8){
                colcheck += 1;
            }
            else{
                rowcheck += 1;
                colcheck = 0;
            }
        }

        for (let row = 0; row < totalrowcells; row++) {
            for (let col = 0; col < totalcolumncells; col++) {
                let livecount = 0;
                neighbours.forEach(element => {
                    let x = element[0] + row;// x is used as x axis of an currentstate
                    let y = element[1] + col;// y is used as y axis of an currentstate
                    if((x >= 0 && x < totalrowcells) && (y >= 0 && y < totalcolumncells) && currentstate[x][y] === "A"){
                        livecount += 1;
                    }
                });
                if(currentstate[row][col] === "" && livecount === 3 ){
                    nextgen[row][col] = "A";
                }
                else if(currentstate[row][col] === "A"){
                    if(livecount === 2 || livecount === 3){
                        nextgen[row][col] = "A";
                    }
                    if(livecount >= 4 || livecount <= 1)
                    {
                        nextgen[row][col] = " ";
                    }
                }
                livecount = 0;
            }
        }
        
        let deadcellcounter = 0;
        for (let row = 0; row < totalrowcells; row++) {
            for (let col = 0; col < totalcolumncells; col++) {
                if(nextgen[row][col] === ""){
                    deadcellcounter += 1;
                }
                else{
                    currentstate[row][col] = nextgen[row][col];
                }
            }
        }

        if(deadcellcounter === (totalrowcells * totalcolumncells)){
            Isallcelldead = true;
            document.querySelector('.info').innerText = "No life generation evolve after \nGeneration No.: "+ generationcount;
        }

        rowcheck = 0;
        colcheck = 0;
        let boxtext = document.querySelectorAll('.boxtext');
        Array.from(boxtext).forEach(element => {
            element.innerHTML = currentstate[rowcheck][colcheck];
            element.setAttribute("style","background : black;");
            // element.className = 'black-background';
            if(colcheck <= 8){
                colcheck += 1;
            }
            else{
                rowcheck += 1;
                colcheck = 0;
            }
        });
        generationcount += 1;
        setTimeout(gameOfLife, 1000);
    }
}

stopgen.addEventListener('click',stopgeneration);

function stopgeneration(){
    isgenerationstop = true;
    document.querySelector('.info').innerText = "Life generation has been stoped\nGeneration No.: "+ generationcount;
}

resetgen.addEventListener('click',resetgeneration);

function resetgeneration(){
    generationcount = 0;
    isgenerationreset = true;
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerHTML = "";
    });
    document.querySelector('.info').innerText = "Life generation has been reseted\nGeneration No.: "+ generationcount;
}