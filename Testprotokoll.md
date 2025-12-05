#  Testprotokoll

## Fehler 1: Programmabsturz bei ungültiger Eingabe

Das Programm stürzt ab, wenn der Spieler eine ungültige Eingabe macht (z.B. ein Buchstabe statt einer Zahl).
Die Eingabe wird nicht validiert.


### Eingabe
1. Spiel starten: `deno run main.ts`
2. spalte `x` eingeben


### Spielbrett
0 1 2 3 4 5 6
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ _
_ _ _ _ _ _ _
Player x: x







## Fehler 2: Programmabsturz bei voller Spalte

### Beschreibung
Das Programm stürzt ab, wenn eine Spalte komplett gefüllt ist und der Spieler versucht, dort einen Stein einzuwerfen.

### Eingabe
1. Spiel starten: `deno run main.ts`
2. 7 mal Spalte 3 eingeben


### Spielbrett bnach 6 eingaben vor absturz

0 1 2 3 4 5 6
_ _ _ x _ _ _
_ _ _ o _ _ _
_ _ _ x _ _ _
_ _ _ o _ _ _
_ _ _ x _ _ _
_ _ _ o _ _ _








## Fehler 3: Fehler in Diganale gewinner berechunung

### Beschreibung

- Diagonale Siege werden nicht korrekt erkannt
- Statt der korrekten Diagonale werden Werte von der Hauptdiagonale des Bretts verwendet

### Beispiel
Beim Versuch, einen diagonalen Gewinn zu erzielen (z.B. vier Steine in einer Diagonale), wird die Funktion die falschen Felder überprüfen und den Gewinn möglicherweise nicht erkennen.


### Eingabe
1. Spiel starten: `deno run main.ts`


### Eingabe
1. Spiel starten: `deno run main.ts`
2. 0, 0, 0, 0, 1, 1, 2, 1, 6, 3, 6, 2
### Spielbrett 
0 1 2 3 4 5 6
_ _ _ _ _ _ _
_ _ _ _ _ _ _
o _ _ _ _ _ _
x o _ _ _ _ _
o o o _ _ _ x
x x x o _ _ x










### Korrekte Implementierung
```typescript
for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
  falling.push(this.fields[i][j]);  // KORREKTUR: [i][j] statt [i][i]
}
```

### 
In der Schleife wird `this.fields[i][i]` verwendet statt `this.fields[i][j]`.
### Lokation
`board.ts`, Zeilen 125-126:
```typescript
for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
  falling.push(this.fields[i][i]);  // BUG: sollte this.fields[i][j] sein
}
```
