# CHESS GIF GENERATOR
#### Video Demo: <!-- TODO: -->
#### Description:
Create GIFs of your game/study by inputting a url from either lichess.org or chess.com
Edit the GIF by making it faster/slower and change repeat 

#### Basic Usage:
Drag pieces to move them

Drag pieces off-canvas to remove

Drag pieces from the sides on to the canvas

When done with current frame, click "Add Frame"

When ready to get your gif, click "Download"

Copy FEN from chess.com or lichess.org and paste it in to copy the position

#### Libraries:
[jsgif](https://github.com/antimatter15/jsgif/tree/master)
Used for converting images into gifs

#### Citations:
https://github.com/antimatter15/jsgif
AS3GIF lets you play and encode animated GIF's with ActionScript 3

- Used for converting the HTML5 Canvas data into chess GIF images
- The Encoder class in static/src/encoder.js
- is really just a wrapper around the methods used from that library
- located at static/lib/jsgif-master

https://github.com/maksimKorzh/wukongJS
Wukong chess engine
- Everything in static/Images comes from his project
- As well as the two colors used to generate the chess board and much of the website

General
- Any code following a comment "CITE:" and trailed by "ENDCITE:"

#### Errata:
Although I used Flask and Jinja for this project, they are not strictly nessesary.
Since the GIFs are generated client-side, This project would work the same as
a static webpage.
