import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, MenuItem, Box, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import NavBar from './NavBar';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const ArgumentPage = () => {
  const { id } = useParams();
  const [argument, setArgument] = useState(null);
  const [responses, setResponses] = useState([]);
  const [responseContent, setResponseContent] = useState('');
  const [responseType, setResponseType] = useState('Yay');
  const [steelmanContent, setSteelmanContent] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchArgument = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/arguments/${id}`);
        setArgument(response.data);
      } catch (error) {
        console.error('Error fetching argument:', error);
      }
    };

    const fetchResponses = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/arguments/${id}/responses`);
        setResponses(response.data.sort((a, b) => b.upvotes - a.upvotes));
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    fetchArgument();
    fetchResponses();
  }, [id, refresh]);

  const handleResponseSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:5001/api/arguments/${id}/responses`, {
        content: responseContent,
        type: responseType,
      });
      setResponseContent('');
      setResponseType('Yay');
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error posting response:', error);
    }
  };

  const handleSteelmanSubmit = async (responseId) => {
    console.log(`Submitting steelman for response ${responseId} with content: ${steelmanContent[responseId]}`);
    try {
      await axios.post(`http://localhost:5001/api/responses/${responseId}/steelman`, {
        content: steelmanContent[responseId] || '',
      });
      setSteelmanContent({ ...steelmanContent, [responseId]: '' });
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error posting steelman response:', error);
    }
  };

  const handleUpvote = async (responseId) => {
    try {
      await axios.post(`http://localhost:5001/api/responses/${responseId}/upvote`);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error upvoting response:', error);
    }
  };

  const handleDownvote = async (responseId) => {
    try {
      await axios.post(`http://localhost:5001/api/responses/${responseId}/downvote`);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error downvoting response:', error);
    }
  };

  if (!argument) {
    return <div>Loading...</div>;
  }

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
                    {argument.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {argument.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <form onSubmit={handleResponseSubmit} style={{ width: '100%' }}>
                    <TextField
                      select
                      label="Type"
                      value={responseType}
                      onChange={(e) => setResponseType(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    >
                      <MenuItem value="Yay">Yay</MenuItem>
                      <MenuItem value="Nay">Nay</MenuItem>
                    </TextField>
                    <TextField
                      label="Response"
                      value={responseContent}
                      onChange={(e) => setResponseContent(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      rows={4}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Submit
                    </Button>
                  </form>
                </CardActions>
              </Card>
              <Typography variant="h5" component="h2" gutterBottom mt={4}>
                Responses
              </Typography>
              <List>
                {responses.map((response) => (
                  <ListItem key={response._id} alignItems="flex-start">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{response.type}</Typography>
                            <Typography variant="body1">{response.content}</Typography>
                            <Typography variant="caption">Upvotes: {response.upvotes}</Typography>
                          </CardContent>
                          <CardActions>
                            <IconButton aria-label="upvote" onClick={() => handleUpvote(response._id)}>
                              <ThumbUp />
                            </IconButton>
                            <IconButton aria-label="downvote" onClick={() => handleDownvote(response._id)}>
                              <ThumbDown />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Steelman Responses
                            </Typography>
                            {(response.steelman || []).map((steelman, index) => (
                              <Typography key={index} variant="body2" color="text.primary">
                                {steelman.content}
                              </Typography>
                            ))}
                            <TextField
                              label="Steelman Response"
                              value={steelmanContent[response._id] || ''}
                              onChange={(e) => setSteelmanContent({ ...steelmanContent, [response._id]: e.target.value })}
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              multiline
                              rows={2}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleSteelmanSubmit(response._id)}
                            >
                              Add Steelman
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ArgumentPage;
