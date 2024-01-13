const express = require('express');
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

router.get('/', async (_, res) => {
  const counter = await getAsync('counter')
  res.send({
    "added todos":counter
  });
});


module.exports = router;