"use strict";

class Game {

    constructor(n, m, num_room) {

        this.interval = null

        this.h = 50
        this.w = 50

        this.n = n
        this.m = m

        this.xP=0
        this.yP=0
        this.attak=1
        this.maxH = 5

        this.array = []
        this.num_room = num_room
        this.num_e = 10

        this.field = document.getElementsByClassName('field')[0]
    }

    isWin() {
        this.num_e = this.num_e - 1 
        if (this.num_e == 0){
            alert('Вы выиграли')
        }
        clearInterval(this.interval)
    }

    isGetRoomAchievable(h, w, startY, startX){
        let rez = false
        for (let i=startY; i<=h+startY; i++){
            for (let j=startX; j<=w+startX; j++) {
                if (this.array[i][j].v == 1) {
                    rez = true
                    break
                }
            }
        }
        return rez
    }

    init() {
        this.field.innerHTML = ''

        for (let i=0; i<this.n; i++) {
            let row = []
            for (let j=0; j<this.m; j++) {
                row.push({v: 0})
            }
            this.array.push(row)
        } 

        let numLine = this.getRandom(3, 5)

        for (let i=1; i<=numLine; i++) {
            let start = 0 + Math.floor(this.m / (numLine+1)) * i
            for (let j=0; j<this.n; j++) {
                this.array[j][start] = {v: 1}
            }
        }

        numLine = this.getRandom(3, 5)

        for (let i=1; i<=numLine; i++) {
            let start = 0 + Math.floor(this.n / (numLine+1)) * i
            for (let j=0; j<this.m; j++) {
                this.array[start][j] = {v: 1}
            }
        }
        
        for (let i=0; i<this.num_room; i++){
            // let isSword = Boolean(i==isSword1 ^ i==isSword2)
            this.getRoom() 
        }
        
        for (let i=0; i<10; i++) {
            this.setHP()
        }

        for (let i=0; i<10; i++) {
            this.setE()
        }

        this.setP()
        this.setSward()
        this.setSward()
        
        this.printArray()
        this.print()

        let self = this

        document.addEventListener('keydown', function(event) {

            if (event.code == 'KeyA'){
                let tile = self.array[self.yP][self.xP-1]
                if (tile.v == 1) {
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP-1, self.array[self.yP][self.xP].h)
                }
                if (tile.v == 's') {
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP-1, self.array[self.yP][self.xP].h)
                    self.attak = self.attak+1
                }

                if (tile.v == 'h') {
                    let h = self.getH(self, self.yP, self.xP) 
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP-1, h)
                }
                self.toAttack()
            }
            if (event.code == 'KeyD'){
                let tile = self.array[self.yP][self.xP+1]
                if (tile.v == 1) {
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP+1, self.array[self.yP][self.xP].h)
                }
                if (tile.v == 's') {
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP+1, self.array[self.yP][self.xP].h)
                    self.attak = self.attak+1
                }
                if (tile.v == 'h') {
                    let h = self.getH(self, self.yP, self.xP) 
                    self.stepH(self, self.yP, self.xP, self.yP, self.xP+1, h)
                }
                self.toAttack()
            }
            if (event.code == 'KeyS'){
                let tile = self.array[self.yP+1][self.xP]
                if (tile.v == 1) {
                    self.stepH(self, self.yP, self.xP, self.yP+1, self.xP, self.array[self.yP][self.xP].h)
                }
                if (tile.v == 's') {
                    self.stepH(self, self.yP, self.xP, self.yP+1, self.xP, self.array[self.yP][self.xP].h)
                    self.attak = self.attak+1
                }
                if (tile.v == 'h') {
                    let h = self.getH(self, self.yP, self.xP) 
                    self.stepH(self, self.yP, self.xP, self.yP+1, self.xP, h)
                }
                self.toAttack()
            }
            if (event.code == 'KeyW'){
                let tile = self.array[self.yP-1][self.xP]
                if (tile.v == 1) {
                    self.stepH(self, self.yP, self.xP, self.yP-1, self.xP, self.array[self.yP][self.xP].h)
                }
                if (tile.v == 's') {
                    self.stepH(self, self.yP, self.xP, self.yP-1, self.xP, self.array[self.yP][self.xP].h)
                    self.attak = self.attak+1
                }
                if (tile.v == 'h') {
                    let h = self.getH(self, self.yP, self.xP) 
                    self.stepH(self, self.yP, self.xP, self.yP-1, self.xP, h)
                }
                self.toAttack()
            }

            if (event.code == 'Space') {
                let e1 = self.array[self.yP-1][self.xP]
                let e2 = self.array[self.yP+1][self.xP]
                let e3 = self.array[self.yP][self.xP-1]
                let e4 = self.array[self.yP][self.xP+1]

                if (e1.v == 'e'){
                    if (e1.h-1 == 0) {
                        self.array[self.yP-1][self.xP] = {v: 1}
                        this.isWin()
                    } else {
                        self.array[self.yP-1][self.xP] = {h: e1.h-self.attak, v: 'e'}
                    }
                }

                if (e2.v == 'e'){
                    if (e2.h-1 == 0) {
                        self.array[self.yP+1][self.xP] = {v: 1}
                        this.isWin()
                    } else {
                        self.array[self.yP+1][self.xP] = {h: e2.h-self.attak, v: 'e'}
                    }
                }

                if (e3.v == 'e'){
                    if (e3.h-1 == 0) {
                        self.array[self.yP][self.xP-1] = {v: 1}
                        this.isWin()
                    } else {
                        self.array[self.yP][self.xP-1] = {h: e3.h-self.attak, v: 'e'}
                    }
                }

                if (e4.v == 'e'){
                    if (e4.h-1 == 0) {
                        self.array[self.yP][self.xP+1] = {v: 1}
                        this.isWin()
                    } else {
                        self.array[self.yP][self.xP+1] = {h: e4.h-self.attak, v: 'e'}
                    }
                }
            }

            self.print()
        });

        this.interval = setInterval(()=>{
            for (let i=0; i<this.n; i++) {
                for (let j=0; j<this.m; j++){
                    if (this.array[i][j].v == 'e'){
                        this.stepE(this, i, j)
                    }
                }
            }
            this.toAttack()
            this.print()
        }, 5000)
                  
    }

    getH(self, y, x) {
        let h = self.array[y][x].h
        if (self.array[y][x].h<self.maxH){
            h = h+1
        }
        return h
    }

    stepH(self, y1, x1, y2, x2, h) {
        self.array[y2][x2] = {h: h, v: 'p'}
        self.array[y1][x1] = {v: 1}
        self.yP = y2
        self.xP = x2
    }

    stepE(self, y, x) {
        let e = self.array[y][x]
        if (self.yP > y && self.array[y+1][x].v == 1){
            self.array[y+1][x] = e
            self.array[y][x] = {v: 1}
        } else if (self.yP < y && self.array[y-1][x].v == 1){
            self.array[y-1][x] = e
            self.array[y][x] = {v: 1}
        } else if (self.xP < x && self.array[y][x-1].v == 1){
            self.array[y][x-1] = e
            self.array[y][x] = {v: 1}
        } else if (self.xP > x && self.array[y][x+1].v == 1){
            self.array[y][x+1] = e
            self.array[y][x] = {v: 1}
            
        }
    }

    printArray () {
        console.log(this.array)
    }

    print() {
        this.field.innerHTML = ''

        let block = document.createElement('div')
        block.classList.add('block')

        for (let i=0; i<this.n; i++) {
            let row = document.createElement('div')
            row.classList.add('row')
            for (let j=0; j<this.m; j++) {
                let tile = document.createElement('div')
                if (this.array[i][j].v == 1){
                    tile.classList.add('tile')
                } else if (this.array[i][j].v == 0) {
                    tile.classList.add('tileW')
                } else if (this.array[i][j].v == 's') {
                    tile.classList.add('sword')
                } else if (this.array[i][j].v == 'h') {
                    tile.classList.add('hp')
                } else if (this.array[i][j].v == 'p') {
                    let h = document.createElement('div')
                    h.classList.add('h')
                    h.style.width=`${5*this.array[i][j].h}px`
                    let t = document.createElement('div')
                    t.classList.add('p')
                    tile.appendChild(h)
                    tile.appendChild(t)
                    tile.classList.add('wrapperP')
                } else if (this.array[i][j].v == 'e') {
                    let h = document.createElement('div')
                    h.classList.add('h1')
                    h.style.width=`${5*this.array[i][j].h}px`
                    let t = document.createElement('div')
                    t.classList.add('e')
                    tile.appendChild(h)
                    tile.appendChild(t)
                    tile.classList.add('wrapperE')
                }
                row.appendChild(tile)
                
                
            }
            block.appendChild(row)
        }

        this.field.appendChild(block)
    }

    getRandom(min, max) {
        let x = Math.floor(Math.random() * (max - min + 1)) + min
        return x
    }

    getRoom() {    
        let h = this.getRandom(3, 8)
        let w = this.getRandom(3, 8)

        let startX = this.getRandom(0, this.m-w-1)
        let startY = this.getRandom(0, this.n-h-1)

        while (!this.isGetRoomAchievable(h, w, startY, startX)){
            startX = this.getRandom(0, this.m-w-1)
            startY = this.getRandom(0, this.n-h-1)
        }

        for (let i=startY; i<=h+startY; i++){
            for (let j=startX; j<=w+startX; j++) {
                this.array[i][j] = {v: 1}
            }
        }
    }

    setHP(){
        let x = this.getRandom(5, this.m-5)
        let y = this.getRandom(5, this.n-5) 

        while (this.array[y][x].v !==  1) {
            x = this.getRandom(5, this.m-5)
            y = this.getRandom(5, this.n-5) 
        }
        this.array[y][x]= {v: 'h'}
    }

    setE(){
        let x = this.getRandom(5, this.m-5)
        let y = this.getRandom(5, this.n-5) 

        while (this.array[y][x].v !== 1) {
            x = this.getRandom(5, this.m-5)
            y = this.getRandom(5, this.n-5) 
        }
        this.array[y][x]= {h: 5, v: 'e'}
    }

    setP() {
        let x = this.getRandom(5, this.m-5)
        let y = this.getRandom(5, this.n-5) 
        while (this.array[y][x].v !== 1 || 
            this.array[y-1][x].v !== 1 ||
            this.array[y+1][x].v !== 1 ||
            this.array[y][x+1].v !== 1 ||
            this.array[y][x-1].v !== 1 
        ){
            x = this.getRandom(5, this.m-5)
            y = this.getRandom(5, this.n-5) 
        }
        this.xP = x
        this.yP = y
        this.array[y][x] = {h: this.maxH, v: 'p'}
    }

    setSward() {
        let x = this.getRandom(5, this.m-5)
        let y = this.getRandom(5, this.n-5) 
        while (this.array[y][x].v !==  1){
            x = this.getRandom(5, this.m-5)
            y = this.getRandom(5, this.n-5) 
        }
        this.array[y][x] = {v: 's'}
    }

    toAttack() {
        let e1 = this.array[this.yP-1][this.xP]
        let e2 = this.array[this.yP+1][this.xP]
        let e3 = this.array[this.yP][this.xP-1]
        let e4 = this.array[this.yP][this.xP+1]

        let p = this.array[this.yP][this.xP]

        if (e1.v == 'e'){
            this.array[this.yP][this.xP] = {h: p.h-1, v: 'p'}
        }
        if (e2.v == 'e'){
            this.array[this.yP][this.xP] = {h: p.h-1, v: 'p'}
        }
        if (e3.v == 'e'){
            this.array[this.yP][this.xP] = {h: p.h-1, v: 'p'}
        }
        if (e4.v == 'e'){
            this.array[this.yP][this.xP] = {h: p.h-1, v: 'p'}
        }

        if (p.h == 0){
            clearInterval(this.interval)
            alert('Вы проиграли')
            location.reload();

        }
    }
  
  }