const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/home', ensureGuest ,(req, res) => {
    res.send({signup:'login'})
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.send({signup:'index'})
})
module.exports=router;