import Clue, { ClueDirection } from './models/Clue.js';

import './components/xword-puzzle.js';

document.addEventListener('DOMContentLoaded', () => {
  const puzzle = document.querySelector('#puzzle');

  const clues = [
    new Clue('1', `Remy's favorite toy`, `Jumperoo`, ClueDirection.Across, 14, 0),
    new Clue(
      '4',
      `The number of Holli's school years at New Tech HS`,
      `eighth`,
      ClueDirection.Across,
      2,
      3,
    ),
    new Clue('7', `The size of Remy's diapers`, `Three`, ClueDirection.Across, 13, 4),
    new Clue('9', `Ian's favorite summer sport`, `Baseball`, ClueDirection.Across, 1, 5),
    new Clue(
      '10',
      `Summer camp for the kids, former employer of Holli`,
      `Okoboji`,
      ClueDirection.Across,
      5,
      7,
    ),
    new Clue(
      '11',
      `Unusual obstacle that chipped a Ainsley's tooth`,
      `Garbagecan`,
      ClueDirection.Across,
      6,
      9,
    ),
    new Clue(
      '15',
      `Our newest Honda Comfortable Roundabout Vehicle`,
      `CRV`,
      ClueDirection.Across,
      9,
      11,
    ),
    new Clue('16', `Our youngest boy`, `Remy`, ClueDirection.Across, 15, 11),
    new Clue(
      '17',
      `The type of literature for Robot Dance Club`,
      `Comic`,
      ClueDirection.Across,
      3,
      12,
    ),
    new Clue(
      '18',
      `The type of marathon Miles ran with friend Tony Rolfes`,
      `Half`,
      ClueDirection.Across,
      8,
      13,
    ),
    new Clue('19', `Ian's grade level`, `Third`, ClueDirection.Across, 0, 14),
    new Clue('21', `Old man`, `Miles`, ClueDirection.Across, 12, 15),
    new Clue('23', `Liquid teething side effect`, `Drool`, ClueDirection.Across, 4, 16),
    new Clue('24', `Oldest boy`, `Ian`, ClueDirection.Across, 11, 17),
    new Clue(
      '25',
      `Occupation of Holli, Religious Ed volunteerism for Miles`,
      `Teacher`,
      ClueDirection.Across,
      16,
      17,
    ),
    new Clue('26', `Middlest girl`, `Ainsley`, ClueDirection.Across, 16, 21),

    new Clue(
      '2',
      `Remy's daycare room, a blow up swimmer`,
      `Pufferfish`,
      ClueDirection.Down,
      17,
      0,
    ),
    new Clue('3', `Ainsley's grade level`, `First`, ClueDirection.Down, 3, 2),
    new Clue('5', `Remy's first holiday overnight`, `Thanksgiving`, ClueDirection.Down, 6, 3),
    new Clue('6', `Old woman`, `Holli`, ClueDirection.Down, 11, 3),
    new Clue(
      '8',
      `What Holli slept in most nights over maternity leave`,
      `Recliner`,
      ClueDirection.Down,
      15,
      4,
    ),
    new Clue('12', `The month we became a family of five`, `April`, ClueDirection.Down, 10, 9),
    new Clue('13', `A first for second grade Catholics`, `Communion`, ClueDirection.Down, 13, 9),
    new Clue(
      '14',
      `Our basement did this the first week we moved to W Sioux K Ct`,
      `Flooded`,
      ClueDirection.Down,
      4,
      10,
    ),
    new Clue('20', `New spectacles for Ainsley`, `Glasses`, ClueDirection.Down, 8, 15),
    new Clue('22', `Family movie night`, `Saturday`, ClueDirection.Down, 16, 15),
  ];

  puzzle.buildGrid(clues, 23, 23);

  const startButton = document.querySelector('#start');
  if (startButton) {
    startButton.addEventListener('click', () => {
      puzzle.activateGrid();
    });
  }
});
