import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMedal,
  faTrophy,
  faAward,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';

// set up icons
library.add(faMedal, faTrophy, faAward, faCoins);

const GROUPS = [
  {
    name: 'Medals',
    badges: [
      {
        _id: 'gold',
        label: 'Gold',
        color: 'gold',
        icon: 'medal',
      },
      {
        _id: 'silver',
        label: 'Silver',
        color: 'silver',
        icon: 'medal',
      },
      {
        _id: 'bronze',
        label: 'Bronze',
        color: 'peru',
        icon: 'medal',
      },
    ],
  },
  {
    name: 'Trophies',
    badges: [
      {
        _id: 'goldTrophy',
        label: 'First Place',
        color: 'gold',
        icon: 'trophy',
      },
      {
        _id: 'silverTrophy',
        label: 'Second Place',
        color: 'silver',
        icon: 'trophy',
      },
      {
        _id: 'bronzeTrophy',
        label: 'Third Place',
        color: 'peru',
        icon: 'trophy',
      },
    ],
  },
  {
    name: 'Awards',
    badges: [
      {
        _id: 'outstandingAward',
        label: 'Outstanding Student',
        color: 'red',
        icon: 'award',
      },
      {
        _id: 'greatAward',
        label: 'Great Thinker',
        color: 'orange',
        icon: 'award',
      },
      {
        _id: 'fastAward',
        label: 'Fast Learner',
        color: 'green',
        icon: 'award',
      },
      {
        _id: 'hardAward',
        label: 'Hardworker',
        color: 'blue',
        icon: 'award',
      },
      {
        _id: 'smartAward',
        label: 'Smart Questions',
        color: 'purple',
        icon: 'award',
      },
    ],
  },
  {
    name: 'Points',
    badges: [
      {
        _id: '10Points',
        label: '10 - 40 Points',
        color: 'red',
        icon: 'coins',
      },
      {
        _id: '50Points',
        label: '50 - 70 Points',
        color: 'silver',
        icon: 'coins',
      },
      {
        _id: '100Points',
        label: '80 - 100 Points',
        color: 'gold',
        icon: 'coins',
      },
    ],
  },
];

const INITIAL_STATE = {
  groups: GROUPS,
  content: [].concat(...GROUPS.map(({ badges }) => badges)),
};

export default (state = INITIAL_STATE, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
