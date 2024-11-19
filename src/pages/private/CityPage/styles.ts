export const styles = {
  root: {
    height: '100svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    overflowY: 'overlay',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
    },
  },
};
