const container = document.querySelector('.container')

function matrixArray(rows,columns){
    let arr = new Array()
    for(var i=0; i<rows; i++){
      arr[i] = new Array()
      for(var j=0; j<columns; j++){
        Math.floor(Math.random() * 10)<=3 ? arr[i][j] = 1 : arr[i][j] = 0
      }
    }
    return arr;
}

let size = 30
let draw = false
let matrix = matrixArray(size,size)

let draw_wall = true

window.addEventListener("click", function(e){
    if(e.ctrlKey)
        draw_wall = !draw_wall
})

let start_finish = 0

let start_pos = [0,0]
let end_pos = [0,0]

function changeMatrix(div){
    let x = parseInt(div.getAttribute('x'))
    let y = parseInt(div.getAttribute('y'))

    if(matrix[x][y]==1){
        matrix[x][y]=0
        div.style.backgroundColor = '#ffffff'
    }
    else{
        matrix[x][y]=1
        div.style.backgroundColor = '#3d5a80'
    }
}

function populate(size) {
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')
    let x = Math.floor(i/size)
    let y = i%size
    div.setAttribute('id',i)
    div.setAttribute('x',x)
    div.setAttribute('y',y)

    if(matrix[x][y]==1)
        div.style.backgroundColor = '#3d5a80'
    else
        div.style.backgroundColor = '#ffffff'

    /*
    div.addEventListener('mouseover', function(){
        if(!draw) return
            changeMatrix(div)
    })*/
    
    div.addEventListener('mousedown', function(){
        if(draw_wall === true)
            changeMatrix(div)
        else if(start_finish === 0){
            let x = parseInt(div.getAttribute('x'))
            let y = parseInt(div.getAttribute('y'))
            div.style.backgroundColor = '#ee6c4d'

            start_pos = [x,y]
            start_finish = 1
        }
        else if(start_finish === 1){
            let x = parseInt(div.getAttribute('x'))
            let y = parseInt(div.getAttribute('y'))
            div.style.backgroundColor = '#ee6c4d'

            end_pos = [x,y]
            start_finish = 0
        }
    })

    container.appendChild(div)
  }
}


window.addEventListener("mousedown", function(){
    draw = true
})
// Set draw to false when the user release the mouse
window.addEventListener("mouseup", function(){
    draw = false
})
populate(size)



function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return (d1 + d2)*10;
}

function cell(x, y) {
    this.x = x
    this.y = y
    this.g = 0
    this.h = 0
    this.f = 0
    this.neighbors = []
    this.parent = undefined
    this.wall = false
  
    this.updateNeighbors = function (grid) {      
      for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            let neighborX = this.x + i
            let neighborY = this.y + j

            if(!(neighborX===x && neighborY===y)){
                if(neighborX >= 0 && neighborX < size && neighborY >= 0 && neighborY < size){
                    this.neighbors.push(grid[neighborX][neighborY])
                }
            }
        }   
      }
    }
}

function findPath(){
    //Создаём массив в котором будем хранить значения для A* алгоритма
    function matrixObjectArray(rows,columns){
        let arr = new Array()
        for(var i=0; i<rows; i++){
            arr[i] = new Array()
            for(var j=0; j<columns; j++){
                arr[i][j] = new cell(i, j)

                if(matrix[i][j]==1)
                    arr[i][j].wall=true
            }
        }

        for(var i=0; i<rows; i++){
            for(var j=0; j<columns; j++){
            arr[i][j].updateNeighbors(arr)
            }
        }
    
        return arr;
    }
    let matrixCell = matrixObjectArray(size,size)

    //Координаты начала и конца пути
    let start = matrixCell[start_pos[0]][start_pos[1]]
    let end = matrixCell[end_pos[0]][end_pos[1]]

    let openSet = []
    openSet.push(start)
    let checkedSet = []
    let path = []

    //console.log(matrixCell[0][3])

    function calculatePosibleG(current, neighbor){
        let steps = Math.abs(current.x - neighbor.x) + Math.abs(current.y - neighbor.y)

        if(steps===2)
            return 14
        else
            return 10
    }

    function search(){
        while(openSet.length>0){
            //Находим клетку с минимальным 'f' (а также 'h') из доступных
            let lowestCell = 0
            for (let i = 0; i < openSet.length; i++){
                if(openSet[i].f < openSet[lowestCell].f){
                    lowestCell = i
                }
                else if(openSet[i].f === openSet[lowestCell].f){
                    if(openSet[i].h <= openSet[lowestCell].h)
                        lowestCell = i
                }
            }
            let current = openSet[lowestCell]

            if(current === end){
                let temp = current
                path.push(temp)
                while (temp.parent) {
                    path.push(temp.parent)
                    temp = temp.parent
                }
                console.log("DONE!")

                return path.reverse()
            }
            
            openSet.splice(lowestCell,1)
            checkedSet.push(current)

            let neighbors = current.neighbors

            for(let i = 0; i < neighbors.length; i++){
                let neighbor = neighbors[i]
                
                if(neighbor.wall===false && !checkedSet.includes(neighbor)){
                    let possibleG = calculatePosibleG(current,neighbor) 

                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    } else if (possibleG >= neighbor.g) {
                        continue;
                    }

                    neighbor.g = possibleG;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }
        }

        return []
    }

    return search()
}

window.addEventListener("dblclick", function(){
    let result = findPath()
    if (result.length === 0)
        console.log("NO PATH!")
    else{
        for(let i = 0; i < result.length; i++){
            let current = result[i]
            let currentDiv = document.getElementById((current.x*size+current.y).toString())
            //console.log(current.x*size+' '+current.y)
            currentDiv.style.backgroundColor = '#ee6c4d'
        }
    }
})