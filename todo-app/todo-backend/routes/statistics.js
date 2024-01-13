const express = require('express');
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

router.get('/', async (_, res) => {
  let counter = await getAsync('counter')
  if (!counter) counter = 0
  res.send({
    "added todos":counter
  });
});


module.exports = router;