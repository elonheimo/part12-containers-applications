const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET todos listing. */
router.get('todos/:id', async (req, res) => {
  const todos = await Todo.find({id:req.params.id})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = {
    text: req.body.text,
    done: req.body.done,
    _id: req.todo._id
  }
  const todo = await Todo.findOneAndUpdate({_id : req.todo._id }, body, {new: true})
  res.send(todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
