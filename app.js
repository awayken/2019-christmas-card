import Clue, { ClueDirection } from './models/Clue.js';
import { buildGrid } from './models/Grid.js';

import './components/xword-button.js';
import './components/xword-grid.js';
import './components/xword-puzzle.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoDetails = buildGrid(
    [
      new Clue('the', 'The', 'Tha', ClueDirection.Across, 1, 0),
      new Clue('rauschword', 'Rauschword', 'Rauschword', ClueDirection.Across, 0, 1),
      new Clue('puzzle', 'Puzzle', 'Puzzle', ClueDirection.Across, 3, 2),
    ],
    true,
  );

  const logo = document.querySelector('#logo');
  if (logo) {
    logoDetails.grid[0][3].isValid = false;

    logo.grid = logoDetails.grid;

    logo.activeSquare = [0, 1];
    logo.direction = ClueDirection.Across;
  }

  const clues = [
    new Clue(
      '1',
      `Remy's favorite activity, shared with frogs and kangaroos`,
      `Jumping`,
      ClueDirection.Across,
      14,
      0,
    ),
    new Clue(
      '4',
      `Holli is currently in her ____ year at New Tech High School`,
      `eighth`,
      ClueDirection.Across,
      2,
      3,
    ),
    new Clue('7', `Remy's diaper size`, `Three`, ClueDirection.Across, 13, 4),
    new Clue('9', `Ian's favorite summer sport`, `Baseball`, ClueDirection.Across, 1, 5),
    new Clue(
      '10',
      `Lakeside summer camp the kids attended that Holli used to work at`,
      `Okoboji`,
      ClueDirection.Across,
      5,
      7,
    ),
    new Clue(
      '11',
      `Unusual obstacle that chipped Ainsley's tooth while biking`,
      `Garbagecan`,
      ClueDirection.Across,
      6,
      9,
    ),
    new Clue(
      '15',
      `Our newest vehicle (abbr. for Comfortable Roundabout Vehicle?)`,
      `CRV`,
      ClueDirection.Across,
      9,
      11,
    ),
    new Clue('16', `Sweet baby brother`, `Remy`, ClueDirection.Across, 15, 11),
    new Clue(
      '17',
      `Miles's latest writing project, the Robot Dance Club ____ Book`,
      `Comic`,
      ClueDirection.Across,
      3,
      12,
    ),
    new Clue(
      '18',
      `Type of marathon that Miles ran with friend, Tony Rolfes`,
      `Half`,
      ClueDirection.Across,
      8,
      13,
    ),
    new Clue('19', `Ian's grade level`, `Third`, ClueDirection.Across, 0, 14),
    new Clue('21', `Longest running family member?`, `Miles`, ClueDirection.Across, 12, 15),
    new Clue(
      '23',
      `Eight months of this sometimes results in a first tooth`,
      `Drool`,
      ClueDirection.Across,
      4,
      16,
    ),
    new Clue('24', `Oldest brother`, `Ian`, ClueDirection.Across, 11, 17),
    new Clue(
      '25',
      `Holli's occupation for years and Miles's role in Ainsley's religion class`,
      `Teacher`,
      ClueDirection.Across,
      16,
      17,
    ),
    new Clue('26', `Middlest sister`, `Ainsley`, ClueDirection.Across, 16, 21),
    new Clue(
      '27',
      `Surgerical procedure that Remy underwent to help with chronic ear infections`,
      `Tubes`,
      ClueDirection.Across,
      5,
      20,
    ),

    new Clue(
      '2',
      `Balloonesque ocean life that decorates Remy's daycare room`,
      `Pufferfish`,
      ClueDirection.Down,
      17,
      0,
    ),
    new Clue('3', `Ainsley's grade level`, `First`, ClueDirection.Down, 3, 2),
    new Clue(
      '5',
      `Holiday that had Remy sleeping overnight for the first time`,
      `Thanksgiving`,
      ClueDirection.Down,
      6,
      3,
    ),
    new Clue(
      '6',
      `Family member with the most "Joi" at Christmas?`,
      `Holli`,
      ClueDirection.Down,
      11,
      3,
    ),
    new Clue(
      '8',
      `Piece of furniture good for rocking and sleeping on during maternity leave`,
      `Recliner`,
      ClueDirection.Down,
      15,
      4,
    ),
    new Clue('12', `The month we became a family of five`, `April`, ClueDirection.Down, 10, 9),
    new Clue('13', `A first for second grade Catholics`, `Communion`, ClueDirection.Down, 13, 9),
    new Clue(
      '14',
      `The basement did this our first week on W Sioux K Ct`,
      `Flooded`,
      ClueDirection.Down,
      4,
      10,
    ),
    new Clue('20', `Gives Ainsley a new outlook on things?`, `Glasses`, ClueDirection.Down, 8, 15),
    new Clue(
      '22',
      `Day of the week that's good for Rausch Family Movie Night and Night Fevers`,
      `Saturday`,
      ClueDirection.Down,
      16,
      15,
    ),
  ];

  const gridDetails = buildGrid(clues);

  const puzzle = document.querySelector('#puzzle');
  if (puzzle) {
    puzzle.gridHeight = 23;
    puzzle.gridWidth = 23;
    puzzle.grid = gridDetails.grid;
    puzzle.gridAnswers = gridDetails.gridAnswers;
  }

  const startButton = document.querySelector('#start');
  if (startButton) {
    startButton.addEventListener('click', () => {
      puzzle.activateGrid();
    });
  }
});
