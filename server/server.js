const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/steelman', { useNewUrlParser: true, useUnifiedTopology: true });

const argumentSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const responseSchema = new mongoose.Schema({
    argumentId: mongoose.Schema.Types.ObjectId,
    content: String,
    type: String, // Yay or Nay
    upvotes: { type: Number, default: 0 },
    steelman: [steelmanSchema], // Array of steelman responses
  });

const Argument = mongoose.model('Argument', argumentSchema);
const Response = mongoose.model('Response', responseSchema);

app.post('/api/arguments', async (req, res) => {
  try {
    const argument = new Argument(req.body);
    await argument.save();
    res.status(201).send(argument);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/arguments', async (req, res) => {
  try {
    const arguments = await Argument.find();
    res.send(arguments);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/arguments/:id', async (req, res) => {
  try {
    const argument = await Argument.findById(req.params.id);
    res.send(argument);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/arguments/:id/responses', async (req, res) => {
  try {
    const response = new Response({ ...req.body, argumentId: req.params.id });
    await response.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/arguments/:id/responses', async (req, res) => {
  try {
    const responses = await Response.find({ argumentId: req.params.id });
    res.send(responses);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/responses/:id/upvote', async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    response.upvotes += 1;
    await response.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/responses/:id/downvote', async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    response.upvotes -= 1;
    await response.save();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/api/arguments/:id', async (req, res) => {
  try {
    const argumentId = req.params.id;
    await Response.deleteMany({ argumentId: argumentId });
    await Argument.findByIdAndDelete(argumentId);
    res.status(200).send({ message: 'Argument and its responses deleted successfully.' });
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const steelmanSchema = new mongoose.Schema({
    content: String,
    upvotes: { type: Number, default: 0 },
  });

  app.post('/api/responses/:id/steelman', async (req, res) => {
    try {
      const response = await Response.findById(req.params.id);
      response.steelman.push({ content: req.body.content });
      await response.save();
      res.status(201).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post('/api/responses/:id/steelman', async (req, res) => {
    try {
      const response = await Response.findById(req.params.id);
      response.steelman.push({ content: req.body.content });
      await response.save();
      res.status(201).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  app.post('/api/responses/:id/steelman', async (req, res) => {
    try {
      const response = await Response.findById(req.params.id);
      response.steelman.push({ content: req.body.content });
      await response.save();
      res.status(201).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

 
  

  
  
  

  
