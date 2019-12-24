# 2019 Christmas Card

  > Can you solve our Rauschword puzzles?

## How to Run

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```


## Models

The data models that we'll use to represent out application.


### Puzzle

Manages the state of the entire puzzle.

```ts
class Puzzle {
    readonly height: number; // Height of board
    readonly width: number; // Width of board

    answers: { Answer[]; }; // Map of answers for positioned clues
    board: CluePosition[]; // Representation of the board by positioned clues

    constructor(height: number, width: number, board: CluePosition[]);
}
```

### Clue

An individual clue with question and ability to check the answer.

```ts
class Clue {
    private answer: string[];

    id: string; // unique identifier
    question: string; // The question

    get size(): int; // this.answer.length

    constructor(id: string, question: string, answer: string[]);

    checkAnswer(answer: Answer): boolean;
}

const clue1 = new Clue('clue1', 'A sugar-free, baby-friendly sucker?', ['t', 'h', 'u', 'm', 'b']);
```

### Answer

Holds the user's answers to our Clues.

```ts
class Answer {
    readonly clueId: string;

    value: string[];

    constructor(clueId: string);

    toString(): string // this.value.join('')
}

const answer1 = new Answer('clue1');
answer1.value = ['t','h','u','m','b'];
```

### CluePosition

```ts
class CluePosition {
    readonly clue: Clue;
    readonly index: number;
    readonly direction: ClueDirection;
    readonly start: Coordinate;

    constructor(clue: Clue, index: number, direction: ClueDirection, start: Coordinate);
}

const clue1Position = new CluePosition(clue1, 1, ClueDirection.Down, new Coordinate(10, 0));
const clue2Position = new CluePosition(clue2, 1, ClueDirection.Across, new Coordinate(0, 0));
```

### Coordinate

A spot on the board. Can be used to position clues or position squares or whatever.

```ts
class Coordinate {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number);
}

const coord1 = new Coordinate(10, 0);
```

### ClueDirection

Enum to track what direction the clue rendering.

```ts
enum ClueDirection {
    Across,
    Down
}
```

## Business Logic

### getRandomPuzzle(difficulty: number): Puzzle

Returns a random puzzle of the desired difficulty.


### checkPuzzle(puzzle: Puzzle): boolean

Checks the puzzle by looping through the clues and passing them the map of answers.


## Components

### Board

Renders a puzzle's board.

```html
<x-board board={puzzle.board} height={puzzle.height} width={puzzle.width}></x-board>
```

### Question

Renders the question

```html
<x-question>A sugar-free, baby-friendly sucker?</x-question>
```

### Square

Renders a square in a puzzle.

```html
<x-square value="Y" clues="clue1,clue2"></x-square>
```

Attributes:
  * clues: string[] of clue IDs
  * value: string
  * disabled=true|false
  * valid=true|false
