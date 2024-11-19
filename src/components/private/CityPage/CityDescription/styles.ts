import { Theme } from "@mui/material";

export const styles = {
  root: (theme: Theme) => ({
    alignItems: 'flex-start',
    width: '100%',
    p: '20px',
    borderRadius: '16px',
    height: '100%',
  }),
  wrapper: {
    display: 'flex',
    gap: '16px',
  },
  image: {
    width: '20%',
    objectFit: 'cover',
  },
};
