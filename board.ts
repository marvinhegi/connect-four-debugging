export const PLAYER_1: string = "x";
export const PLAYER_2: string = "o";
export const EMPTY: string = "_";

const ROWS: number = 6;
const COLS: number = 7;
const CONNECT_N: number = 4;

export class Board {
  private fields: Array<Array<string>>;

  public constructor() {
    this.fields = Array(ROWS);
    for (let r = 0; r < this.fields.length; r++) {
      this.fields[r] = Array(COLS);
      for (let c = 0; c < this.fields[r].length; c++) {
        this.fields[r][c] = EMPTY;
      }
    }
  }

  public output() {
    let cols = "";
    for (let c = 0; c < this.fields[0].length; c++) {
      cols += `${c} `;
    }
    console.log(cols.trimEnd());
    for (let r = 0; r < this.fields.length; r++) {
      let row = "";
      for (let c = 0; c < this.fields[r].length; c++) {
        row += `${this.fields[r][c]} `;
      }
      console.log(row.trimEnd());
    }
  }

  public makeMove(player: string, col: number): number {
    if (![PLAYER_1, PLAYER_2].includes(player)) {
      throw new Error(`"${player}" is not a valid player`);
    }
    for (let r = this.fields.length - 1; r >= 0; r--) {
      if (this.fields[r][col] == EMPTY) {
        this.fields[r][col] = player;
        return r;
      }
    }
    return -1;
  }

  public winner(player: string, row: number, col: number): string {
    const horizontal = this.horizontalWinner(player, row);
    if (horizontal != EMPTY) {
      return horizontal;
    }
    const vertical = this.verticalWinner(player, col);
    if (vertical != EMPTY) {
      return vertical;
    }
    const diagonal = this.diagonalWinner(player, row, col);
    if (diagonal != EMPTY) {
      return diagonal;
    }
    return EMPTY;
  }

  private verticalWinner(player: string, r: number): string {
    const col = this.getCol(r);
    const win = player.repeat(CONNECT_N);
    if (col.join("").includes(win)) {
      return player;
    }
    return EMPTY;
  }

  private horizontalWinner(player: string, r: number): string {
    const row = this.getRow(r);
    const win = player.repeat(CONNECT_N);
    if (row.join("").includes(win)) {
      return player;
    }
    return EMPTY;
  }

  private diagonalWinner(player: string, r: number, c: number): string {
    const [diagUp, diagDown] = this.getDiagonals(r, c);
    const win = player.repeat(CONNECT_N);
    if (diagUp.includes(win) || diagDown.includes(win)) {
      return player;
    }
    return EMPTY;
  }

  private getRow(r: number): Array<string> {
    const row: Array<string> = new Array(COLS);
    for (let i = 0; i < row.length; i++) {
      row[i] = this.fields[r][i];
    }
    return row;
  }

  private getCol(c: number): Array<string> {
    const col: Array<string> = new Array(ROWS);
    for (let i = 0; i < col.length; i++) {
      col[i] = this.fields[i][c];
    }
    return col;
  }

  private getDiagonals(r: number, c: number): [string, string] {
    // Woe to thee, who entered here, for you dug too deep and unearthed daemons of the otherworld!
    const rising: Array<string> = [];
    const falling: Array<string> = [];
    for (let i = r, j = c; i >= 0 && j < this.fields[0].length; i--, j++) {
      rising.push(this.fields[i][j]);
    }
    for (let i = r, j = c; i < this.fields.length && j >= 0; i++, j--) {
      rising.push(this.fields[i][j]);
    }
    for (
      let i = r, j = c;
      i < this.fields.length && j < this.fields[0].length;
      i++, j++
    ) {
      falling.push(this.fields[i][j]);
    }
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
      falling.push(this.fields[i][i]);
    }
    return [rising.join(""), falling.join("")];
  }
}
