import { assertEquals } from "@std/assert";
import { Board, EMPTY, PLAYER_1 } from "./board.ts";

Deno.test("dummy", () => {
  const board = new Board();
  const winner = board.winner(PLAYER_1, 1, 1);
  assertEquals(winner, EMPTY);
});
