let canvas = document.getElementById('c1')
let ctx = canvas.getContext('2d')
ctx.scale(6,6)

function matrixArray(rows,columns){
    let arr = new Array()
    for(var i=0; i<rows; i++){
      arr[i] = new Array()
      for(var j=0; j<columns; j++){
        arr[i][j] = 0
      }
    }
    return arr;
}

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

setInterval(() => {
    for (let i = 0; i < 10; i++) {
        doStep()
    }
}, 1);