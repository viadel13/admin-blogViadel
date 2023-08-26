const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');

router.post('/contact', blogController.contact)

module.exports = router;