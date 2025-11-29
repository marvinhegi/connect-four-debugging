import { Board, EMPTY, PLAYER_1, PLAYER_2 } from "./board.ts";

const board = new Board();
let player = PLAYER_1;

board.output();

while (true) {
  const input = prompt(`Player ${player}:`) || "";
  const col = Number.parseInt(input);
  const row = board.makeMove(player, col);
  board.output();
  console.log();
  const winner = board.winner(player, row, col);
  if (winner != EMPTY) {
    console.log(`Player ${player}: A winner is you!`);
    break;
  }
  player = player == PLAYER_1 ? PLAYER_2 : PLAYER_1;
}
