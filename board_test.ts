import { assertEquals } from "@std/assert";
import { Board, Player } from "./board.ts";

Deno.test("dummy", () => {
  const board = new Board();
  const winner = board.winner(Player.PlayerX, 1, 1);
  assertEquals(winner, Player.Nobody);
});

Deno.test("Diagonal Winner", () => {
  const board = new Board();
  
  const moves = [
    { col: 0, player: Player.PlayerX },  
    { col: 0, player: Player.PlayerO },  
    { col: 0, player: Player.PlayerX },  
    { col: 0, player: Player.PlayerO },  
    { col: 1, player: Player.PlayerX },  
    { col: 1, player: Player.PlayerO },  
    { col: 2, player: Player.PlayerX },  
    { col: 1, player: Player.PlayerO },  
    { col: 6, player: Player.PlayerX },  
    { col: 3, player: Player.PlayerO },  
    { col: 6, player: Player.PlayerX },  
    { col: 2, player: Player.PlayerO },  
  ];

  
  let winner = Player.Nobody;
  let lastRow = -1;
  let lastCol = -1;

  for (const move of moves) {
    lastRow = board.makeMove(move.player, move.col);
    lastCol = move.col;
    winner = board.winner(move.player, lastRow, lastCol);
    
  }

  
  assertEquals(winner, Player.PlayerO);
});
