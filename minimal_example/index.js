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

let testFENs = ["r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1",
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"]

let canvas
let ctx
let chessboard
let mainEncoder

const placements = [...Array(8)].map(e => Array(8)) // gen empty 8x8 2d array

let LIGHT_SQUARE = '#f0d9b5';
let DARK_SQUARE = '#b58863';

let pieceIMGs = {}

document.addEventListener("DOMContentLoaded", () => {
    init_globals()
    // event_listener_dump()
    init_buttons()
    // let piece_selected = null
})

function init_globals() {
    // canvas
    canvas = document.getElementById('bitmap')
    canvas.style.border = "1px solid black"
    const height = 360
    const width = 360
    canvas.width = height
    canvas.height = width
    ctx = canvas.getContext('2d')

    // board
    const chess_piece_imgs = document.querySelectorAll(".chess-piece-img")
    const chess_pieces = {}
    chess_piece_imgs.forEach(piece => {
        chess_pieces[piece.getAttribute("name").charAt(0)] = piece
        console.log(piece)
    });
    chessboard = new Chessboard(ctx, chess_pieces)
    chessboard.drawBoard()

    // encoder
    mainEncoder = new Encoder()
}

function init_buttons() {
    const clear_board_btn = document.getElementById("clear-board-btn")
    const starting_position_btn = document.getElementById("starting-position-btn")


    const preview_wrapper = document.querySelector(".preview-wrapper")
    const add_frame_btn = document.getElementById("add-frame-btn")

    const generate_btn = document.getElementById("generate-btn")
    const download_btn = document.getElementById("download-btn")

    add_frame_btn.onclick = () => {
        mainEncoder.addFrame(ctx)
        const encoder = new Encoder()
        encoder.addFrame(ctx)
        const image = document.createElement("img")
        image.classList.add("preview")
        image.src = encoder.encode()
        preview_wrapper.appendChild(image)
    }

    clear_board_btn.onclick = () => {
        chessboard.drawBoard()
    }

    starting_position_btn.onclick = () => {
        chessboard.fillBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
    }

    download_btn.onclick = () => {
        
    }

}

function event_listener_dump() {

    // generate position from FEN input element
    fenInputEl = document.getElementById("fen-input")
    fenInputEl.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            let board = parseFEN(fenInputEl.value)
            fenInputEl.value = ""
            console.log(board)
        }
    })

    emptyPos = document.getElementById("empty-position")
    startingPos = document.getElementById("default-position")

    pieces = document.querySelectorAll(".draggable")
    pieces.forEach(piece => {
        piece.addEventListener("mousedown", () => {
            // piece_selected = piece.getAttribute("name");
            // console.log(piece_selected)
        })
    });
    pieces.forEach(piece => {
        piece.addEventListener("ondragend", () => {
            console.log("mouseup")
        })
    });

    canvas.addEventListener("mouseover", (e) => {
        const rect = canvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left
        let mouseY = e.clientY - rect.top
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
}


function rm_image(img) {
    const parent = document.querySelector(".preview-wrapper")
    parent.remove(img)
}
