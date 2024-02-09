# MyChess

Author: gslvtt (github)

## Setup
The project uses **Vite**, **React** and **redux-toolkit** on the front-end, and **express** and **posgreSQL** on the backend.

- Install postgreSQL and configure a new postgres user
- Clone the repository
- run ```npm install``` in both the client and server directories
- Create a .env file in the server directory and update it to match the provided template. CLIENT_URL and SERVER_PORT default to http://localhost:5173 and **3000** if not included in the .env <br>
-- If you change the server port you need to update the BASE_URL in client/ApiService <br>
-- If you change the CLIENT_URL you will need to update the script in the package.json of the client directory to ```"dev": "vite --port <portNumber>"```
- run ```npm run start``` or ```npm run dev``` in server directory to start server with node or nodemon respectively
- run ```npm run dev``` in the client directory

While the Login and Register Forms are still not implemented
- Register a new user using postman or similar using the following type as a body {
  "email" : "xxxx@yyyy.zzz",
  "password" : "xxxxxx",
  "firstName" : "xxxxxx",
  "lastName" : "xxxxxx",
}
- Update the onLoginHandler on in the client's userDropDownMenu component with your new user's email and password

## Chessboard Logic
To implement the chessboard **chess.js** and **react-chessboard** were used as well as **pgn-parser** to parse game notation when importing a game through the pgn input field.

**Chess.js** provides a game class with different methods to manage the state of the game. 

**React-chessboard** provides a chessboard component that functions as a configurable user interface and display.

## Current state:

#### Implemented Features:
- A functional chessboard, with the ability to undo a move, navigate throught the history of the moves made, reset to starting position as well as set the board to a position by placing it in in **fen** notation and loading a game from a **pgn**.
- A comment feature, so users may add, edit and delete comments that are tied to specific board positions (excluding the **halfmove clock** and **fullmove number** that correspond to the last two moves of a fen string.) The relevant comments are displayed when the corresponding position is reached and any comments inside the pgn string of a loaded game are also displayed.

