

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = "A";
        }
    })
})

start.addEventListener('click', gameoflife);

function gameoflife(){
    let currentstate = [];
    for (let index = 0; index < 10; index++) {
        currentstate.push(new Array(10).fill(""));
    }
    let m = currentstate.length;
    let n = currentstate[0].length;
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
    for (let index = 0; index < 10; index++) {
        nextgen.push(new Array(10).fill(""));
    };
    let rowcheck = 0;
    let colcheck = 0;
    let boxtexts = document.querySelectorAll('.boxtext') ;
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

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            let livecount = 0;
            neighbours.forEach(element => {
                let x = element[0] + row;
                let y = element[1] + col;
                if((x >= 0 && x < m) && (y >= 0 && y < n) && currentstate[x][y] === "A"){
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
                    nextgen[row][col]=" ";
                }
            }
            livecount=0;
        }
    }
    console.log(currentstate);
    
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            currentstate[row][col] = nextgen[row][col];
        }
    }
    for (let row = 0; row < 10; row++) {
        for(col  = 0; col < 10; col++)
        {
            nextgen[row][col] = " ";
        }
    };
    let rowcheck1 = 0;
    let colcheck1 = 0;
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {

        element.innerHTML = currentstate[rowcheck1][colcheck1];
        if(colcheck1 <= 8){
            colcheck1 += 1;
        }
        else{
            rowcheck1 += 1;
            colcheck1 = 0;
        }
    });    
    setTimeout(gameoflife, 3000);
//    gameoflife();
}