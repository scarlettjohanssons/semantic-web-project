import { Theme } from "@mui/material";

export const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    p: '20px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '16px',
    height: '100%',
    gap: '16px',
    transition: 'all 0.3s ease-out',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.action.hover
    },
  }),
  image: {
    width: '20%',
    objectFit: 'cover',
  },
};
