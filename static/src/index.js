// TODO:
// 1: interactive chess board
// - move pieces
// - draw arrows
// setRepeat
// setDelay
// setSize(width, height)
// DONE:
// upload FEN
// UI:


let canvas
let ctx
let mainEncoder
let sideEncoder
let dropFlag = false

// CITE: https://stackoverflow.com/questions/16512182/how-to-create-empty-2d-array-in-javascript
const placements = [...Array(8)].map(e => Array(8)) // gen empty 8x8 2d array
// ENDCITE:

let LIGHT_SQUARE = '#f0d9b5';
let DARK_SQUARE = '#b58863';

let pieceIMGs = {}

document.addEventListener("DOMContentLoaded", () => {

    // initialize globals

    canvas = document.getElementById('bitmap')

    canvas.style.border = "1px solid black"
    const height = 360
    const width = 360
    canvas.width = height
    canvas.height = width

    ctx = canvas.getContext('2d')

    mainEncoder = new Encoder()
    sideEncoder = new Encoder()

    // draw the squares
    drawBoard(ctx)

    testFENs = ["r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1",
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"]

    // generate position from FEN input element
    fenInputEl = document.getElementById("fen-input")
    fenInputEl.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            let board = parseFEN(fenInputEl.value)
            fenInputEl.value = ""
            console.log(board)
        }
    })

    addFrameBtn = document.getElementById("addFrame")
    addFrameBtn.onclick = () => {
        mainEncoder.addFrame(ctx)
        const frame = mainEncoder.encode()
        add_image(frame)
    }

    emptyPos = document.getElementById("empty-position")
    startingPos = document.getElementById("default-position")

    let piece_selected = null
    pieces = document.querySelectorAll(".draggable")
    pieces.forEach(piece => {
        piece.addEventListener("mousedown", () => {
            piece_selected = piece.getAttribute("name");
            // console.log(piece_selected)
        })
    });
    pieces.forEach(piece => {
        piece.addEventListener("ondragend", () => {
            console.log("mouseup")
        })
    });

    canvas.addEventListener("mouseover", (e) => {
        // CITE: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left
        let mouseY = e.clientY - rect.top
        // ENDCITE:

        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            xcoord = Math.floor(mouseX / 45)
            ycoord = Math.floor(mouseY / 45)
            if (piece_selected != null && dropFlag) {
                placements[xcoord][ycoord] = piece_selected.charAt(0);
            }
            console.log(placements)
        }

        console.log("mouseup")
    })

})

class Board {
    constructor() {
        this.el = document.getElementById("bitmap")
    }
    dropPiece() {
        
    }

}

function draw_example(x = 10, y = 10) {
    const canvas = document.getElementById('bitmap')
    const context = canvas.getContext('2d')
    context.fillStyle = 'rgb(255,255,255)'
    context.fillRect(0,0,canvas.width, canvas.height) //GIF can't do transparent so do white
    context.fillStyle = "rgb(200,0,0)"
    context.fillRect (x, y, 75, 50)   //draw a little red box   
}


function add_image(src) {
    const image = document.createElement("img")
    const parent = document.querySelector(".preview-wrapper")
    image.classList.add("preview")
    image.src = src
    parent.appendChild(image)
}

function rm_image(img) {
    const parent = document.querySelector(".preview-wrapper")
    parent.remove(img)
}
