let canvas = document.getElementById('c1')
let ctx = canvas.getContext('2d')
//ctx.scale(32,32)
ctx.scale(6,6)
//ctx.fillStyle='black'
//ctx.fillRect(1,3,1,1)

function matrixArray(rows,columns){
    var arr = new Array()
    for(var i=0; i<rows; i++){
      arr[i] = new Array()
      for(var j=0; j<columns; j++){
        arr[i][j] = 0
      }
    }
    return arr;
}

/*
let matrix = matrixArray(20,20)
let pos = [5,5]
let view = 'up'

function nextCellonWhite(view){
    switch(view){
        case 'up': return 'right'
        case 'right': return 'down'
        case 'down': return 'left'
        case 'left': return 'up'
    }
}

function nextCellonBlack(view){
    switch(view){
        case 'up': return 'left'
        case 'left': return 'down'
        case 'down': return 'right'
        case 'right': return 'up'
    }
}

function doStep(matrix, pos, view){
    switch(view)
    {
        case 'up': pos[1]--
        case 'down': pos[1]++
        case 'right': pos[0]++
        case 'left': pos[0]--
    }

    if(matrix[pos[0]][pos[1]] == 0){
        matrix[pos[0]][pos[1]] == 1
        view = nextCellonWhite(view)
        ctx.fillStyle='black'
    }
    else{
        matrix[pos[0]][pos[1]] == 0
        view = nextCellonBlack(view)
        ctx.fillStyle='green'
    }

    ctx.fillRect(pos[0],pos[1],1,1)

    console.log(pos)
    console.log(view)
}*/
//doStep(matrix,pos,view)
//setInterval(doStep(matrix,pos,view), 100);

let matrix = matrixArray(640,640)
let pos = [50,50]
let view = 'left'

function onWhite(view){
    switch(view){
        case 'up': return 'right'; break
        case 'right': return 'down'; break
        case 'down': return 'left'; break
        case 'left': return 'up'; break
        default: return 'error'; break
    }
}

function onBlack(view){
    switch(view){
        case 'up': return 'left'; break
        case 'left': return 'down'; break
        case 'down': return 'right'; break
        case 'right': return 'up'; break
        default: return 'error'; break
    }
}

let count = 0

function doStep(){
    switch(view)
    {
        case 'up': pos[1]--; break
        case 'down': pos[1]++; break
        case 'right': pos[0]++; break
        case 'left': pos[0]--; break
    }

    if(matrix[pos[0]][pos[1]] === 0){
        view = onWhite(view)
        matrix[pos[0]][pos[1]] = 1
        ctx.fillStyle='black'
    }
    else{
        view = onBlack(view)
        matrix[pos[0]][pos[1]] = 0
        ctx.fillStyle='white'
    }
    count++
    if(count%500===0)
        console.log(count)

    ctx.fillRect(pos[0],pos[1],1,1)
}

/*
for (let i = 0; i < 13000; i++) {
    doStep()
}*/

setInterval(() => {
    for (let i = 0; i < 10; i++) {
        doStep()
    }
}, 1);

/*for (let i = 0; i < 5; i++) {
    switch(view)
    {
        case 'up': pos[1]--; break
        case 'down': pos[1]++; break
        case 'right': pos[0]++; break
        case 'left': pos[0]--; break
    }
    console.log(view + ' ' + pos)
}*/

/*
let index = 0
setInterval(() => {
    ctx.fillRect(index++,index++,index++,index++)
}, 100);*/