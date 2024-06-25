import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import NavBar from './NavBar';

const NewArgumentPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/arguments', { title, content });
      navigate('/');
    } catch (error) {
      console.error('Error posting new argument:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box mt={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Post a New Argument
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                    />
                    <TextField
                      label="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      rows={4}
                      required
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NewArgumentPage;
