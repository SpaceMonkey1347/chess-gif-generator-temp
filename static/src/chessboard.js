
function drawBoard(ctx, ctx_height=360, ctx_width=360, light="#f0d9b5", dark="#b58863", white_perspective=true) {
    let colorFlag = white_perspective
    const height = ctx_height / 8
    const width = ctx_width / 8
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            ctx.fillStyle = colorFlag ? light : dark
            ctx.fillRect(row * width, col * height, width, height)
            // console.log(width, height, colorFlag)
            colorFlag = !colorFlag
        }
        colorFlag = !colorFlag
    }
}

function fillBoard(ctx, height=360, width=360, piece_imgs = pieceIMGs, fen="8/8/8/8/8/8/8/8", white_perspective) {
    const placements = parseFEN(placements, fen)
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const img = piece_imgs[placements[row][col]]
            if (img) {
                ctx.drawImage(img, row * width, col * height)
            } else {
                console.warn(`fillBoard: missing image for "${placements[row][col]}"`)
            }
        }
    }
}

        // console.warn("parseFEN:")
function parseFEN(fen) {
    // CITE: https://stackoverflow.com/questions/16512182/how-to-create-empty-2d-array-in-javascript
    const placements = [...Array(8)].map(e => Array(8)) // gen empty 8x8 2d array
    // ENDCITE:
    // ensure string
    if (typeof(fen) != typeof("string")) {
        console.warn("parseFEN: not a string")
        return placements
    }
    // return empty if empty
    if (fen.length == 0) {
        console.warn("parseFEN: empty string")
        return placements
    } 

    fen = fen.trim()
    // ignore other sections (castling rights, turn...)
    fen = fen.split(" ")[0]
// element.getAttribute("name");
    const rows = fen.split("/")
    let rank = 0 // row
    let file = 0 // col
    const valid_peices = {
        "K": "white_king",
        "k": "black_king",
        "Q": "white_queen",
        "q": "black_queen",
        "R": "white_rook",
        "r": "black_rook",
        "B": "white_bishop",
        "b": "black_bishop",
        "N": "white_knight",
        "n": "black_knight",
        "P": "white_pawn",
        "p": "black_pawn"
    }
    for (let row = 0; row < rows.length; row++) { // for row in rows array
        // console.log(rows[row])
        rank = row
        file = 0
        for (let char = 0; char < rows[row].length; char++) { // for character in row string
            currentChar = rows[row].charAt(char)
            // console.log("Current Char: " + currentChar)
            // skip by num indecies if Number
            const num = Number(currentChar)
            if (num >= 1 && num <= 8) {
                if (char + num > 8) {
                    console.warn("ParseFEN: out of bounds")
                    return placements
                }
                file += num
                continue
            }
            if (currentChar in valid_peices) {
                // placements[rank][file] = valid_peices[currentChar]
                placements[rank][file] = currentChar
                // console.log("placed")

                file++
            } else {
                console.warn(`ParseFEN: invalid peice notation "${currentChar}"`)
                return placements
            }
        }
    }
    return placements
}
