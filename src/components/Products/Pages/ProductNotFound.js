import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const ProductNotFound = () => {
  const classes = useStyles();

  return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="p"      
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="data:image/png;base64,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"       
            />
          </Box>
        </Container>
      </Box>   
  );
};

export default ProductNotFound;
