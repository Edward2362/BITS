//Importing required modules 
const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/home' }),
    (req, res) => {
      res.redirect('http://localhost:3000/login')
    }
  )

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/home')
  })
  
  module.exports = router
  