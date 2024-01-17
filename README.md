# Setup
The project uses **Vite**, **React** and **redux-toolkit** on the front-end, and **express** and **posgreSQL** on the backend.

# Chessboard Logic
To implement the chessboard **chess.js** and **react-chessboard** were used as well as **pgn-parser** to parse game notation when importing a game through the pgn input field.

**Chess.js** provides a game class with different methods to manage the state of the game. 

**React-chessboard** provides a chessboard component that functions as a configurable user interface and display.

### Current state:

#### Implemented Features:
- A functional chessboard, with the ability to undo a move, navigate throught the history of the moves made, reset to starting position as well as set the board to a position by placing it in in **fen** notation and loading a game from a **pgn**.
- A comment feature, so users may add, edit and delete comments that are tied to specific board positions (excluding the **halfmove clock** and **fullmove number** that correspond to the last two moves of a fen string.) The relevant comments are displayed when the corresponding position is reached and any comments inside the pgn string of a loaded game are also displayed.

#### Other Notes:

The functions on the front-end lack some modularization to reduce code repetition and increase readability, and the state management is not optimized. For example the boardPosition state could be eliminated as the fenHistory state could replace its role entirely. Further use of redux to manage the state of the analysis screen components may be a solution.

The authentication is not completely implemented as it lacks login and register forms and the sessions are being stored in-memory and not in the database.

Https not used.

No tests.

Missing features.
