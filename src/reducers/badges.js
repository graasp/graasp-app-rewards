const INITIAL_STATE = {
  content: [
    {
      _id: 'gold',
      label: 'Gold',
      color: 'gold',
    },
    {
      _id: 'silver',
      label: 'Silver',
      color: 'silver',
    },
    {
      _id: 'bronze',
      label: 'Bronze',
      color: 'peru',
    },
  ],
};

export default (state = INITIAL_STATE, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
