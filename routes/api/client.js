const express = require('express');
const router = express.Router();

//@route   GET api/client/test
//@desc    Test client route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'Client Works'}));

module.exports = router;