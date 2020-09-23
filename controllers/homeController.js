/*eslint-disable*/
import mongoose from 'mongoose'; 

export const getHome = (req, res) => {
  res.status(200).send('Go to home.');
  res.send('We are finally at the home page');
  res.json('we made it');
};

