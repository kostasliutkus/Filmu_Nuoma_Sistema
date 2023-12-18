const express = require('express');
const { DataTypes } = require('sequelize');
const router = express.Router();
const sequelize = require('./db');

const Review = sequelize.define('atsiliepimas', {
  kurejas: DataTypes.STRING,
  ivertinimas: DataTypes.INTEGER,
  aprasymas: DataTypes.STRING,
  teigiamas: DataTypes.INTEGER,
  neigiamas: DataTypes.INTEGER,
  fk_Filmasid: DataTypes.INTEGER,
  fk_Klientasid: DataTypes.INTEGER,
}, {
  timestamps: false,
});

// Sync the database and create the table if not exists
sequelize.sync()
  .then(() => {
    console.log('Database and table synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// GET all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a review by ID
router.get('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.json(review);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new review
router.post('/reviews', async (req, res) => {
  const { kurejas, ivertinimas, aprasymas, teigiamas, neigiamas, fk_Filmasid, fk_Klientasid } = req.body;
  try {
    const newReview = await Review.create({
      kurejas,
      ivertinimas,
      aprasymas,
      teigiamas,
      neigiamas,
      fk_Filmasid,
      fk_Klientasid,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) a review by ID
router.put('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  const { kurejas, ivertinimas, aprasymas, teigiamas, neigiamas, fk_Filmasid, fk_Klientasid } = req.body;
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      await review.update({
        kurejas,
        ivertinimas,
        aprasymas,
        teigiamas,
        neigiamas,
        fk_Filmasid,
        fk_Klientasid,
      });
      res.json(review);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a review by ID
router.delete('/reviews/:id', async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      await review.destroy();
      res.json({ message: 'Review deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
