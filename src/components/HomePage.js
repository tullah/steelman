import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import NavBar from './NavBar';
import { ThumbUp, ThumbDown, Delete } from '@mui/icons-material';

const HomePage = () => {
  const [argumentsList, setArgumentsList] = useState([]);

  useEffect(() => {
    const fetchArguments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/arguments');
        setArgumentsList(response.data);
      } catch (error) {
        console.error('Error fetching arguments:', error);
      }
    };

    fetchArguments();
  }, []);

  const handleDelete = async (argumentId) => {
    try {
      await axios.delete(`http://localhost:5001/api/arguments/${argumentId}`);
      setArgumentsList(argumentsList.filter(arg => arg._id !== argumentId));
    } catch (error) {
      console.error('Error deleting argument:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box mt={4} mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                Steelman
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                A Steelman is the practice of improving an argument so it is harder to refute. It involves presenting the strongest possible version of an opposing viewpoint.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/new-argument">
                Post a New Argument
              </Button>
            </Box>
            <Grid container spacing={3}>
              {argumentsList.map((arg) => (
                <Grid item xs={12} key={arg._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {arg.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {arg.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" component={Link} to={`/argument/${arg._id}`}>
                        View Details
                      </Button>
                      <IconButton aria-label="like">
                        <ThumbUp />
                      </IconButton>
                      <IconButton aria-label="dislike">
                        <ThumbDown />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(arg._id)}>
                        <Delete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
