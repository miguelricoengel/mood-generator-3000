const express = require('express');
const router = express.Router();
const Vibe = require("../models/Vibe.model");
const mongoose = require("mongoose");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/library", (req, res, next) => {
    Vibe.find()
    .then((data) => {
        res.render('auth/library', { vibes: data }); // Pass the data as { vibes: data }
    })
    .catch((error) => {
        console.log('Error fetching vibes:', error);
        next(error);
    });
});


router.post('/library', isLoggedIn, (req, res, next) => {
    const { atmos, sounds, visuals, title, user } = req.body;
    Vibe.create({ atmos, sounds, visuals, title, user })
      .then(vibeFromDB => {
        res.redirect("/library");
        console.log(`New vibe created: ${vibeFromDB}.`)
      })
    .catch(error => {
      console.log('Error creating vibe:', error);
      next(error)
    });
  });
  
  router.post('/vibe/:vibeId', isLoggedIn, (req, res, next) => {
    const vibeId = req.params.vibeId;
    Vibe.findById(vibeId)
      .then(data => {
        console.log('Vibe ID', data);
        res.render('vibes', { vibes: data });
        res.redirect("/library");
      })
      .catch(err => {
        console.log('Error while searching vibes:', err);
        next(err);
      });
  });

  router.post('/library/delete/:vibeId', isLoggedIn, (req, res) => {
    const vibeId = req.params.vibeId;
    console.log(vibeId)
    Vibe
    .findByIdAndDelete(vibeId)
    .then(() => {
      res.redirect(`/library`);
    })
    .catch(error => console.log(error));
  });

module.exports = router;

router.get('/vibe/:vibeId', isLoggedIn, (req, res, next) => {
    const vibeId = req.params.vibeId;
    Vibe.findById(vibeId)
      .then(vibe => {
        res.render('vibe', { vibe });
      })
      .catch(error => {
        console.log(`Error: ${vibeId}:`, error);
        next(error);
      });
  });

  router.get('/edit/:vibeId', isLoggedIn, (req, res, next) => {
    const {vibeId} = req.params;
    const { atmos, sounds, visuals, title, user} = req.query;
    console.log(vibeId);
    Vibe.findByIdAndUpdate(vibeId, { atmos, sounds, visuals, title, user }, { new: true })
      .then(vibe => {
        console.log(vibe)
        res.render(`edit.hbs`, { vibe: vibe });
      })
      .catch(error => {
        console.log(`Error : ${vibeId}:`, error);
        next(error);
      });
  });
  
  router.post('/edit/:vibeId', (req, res, next) => {
    const {vibeId} = req.params;
    const { atmos, sounds, visuals, title, user } = req.body;
    Vibe
    .findByIdAndUpdate(vibeId, { atmos, sounds, visuals, title, user }, { new: true })
      .then(updatedVibe => res.redirect(`/library`))
      .catch(error => next(error));
  });

  const saveUserVibes = async (userId, vibes) => {
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
      
      if (!user) {
        // Handle error if user is not found
        throw new Error('User not found');
      }
  
      // Add the vibes to the user's vibes array
      user.vibes.push(...vibes);
  
      // Save the updated user
      await user.save();
  
      // Return the updated user object if needed
      return user;
    } catch (error) {
      // Handle any errors that occur
      console.error('Error saving user vibes:', error);
      throw error;
    }
  };


  module.exports = router;