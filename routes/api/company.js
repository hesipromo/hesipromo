const express = require('express');
const router = express.Router();

//@route   GET api/company/test
//@desc    Test company route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'Company Works'}));

module.exports = router;