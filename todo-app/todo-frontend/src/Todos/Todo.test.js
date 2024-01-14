import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'
import userEvent from '@testing-library/user-event'

test('<Todo /> calls delete', async () => {
  const delete_todo = jest.fn()
  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={delete_todo}> Delete </button>
      </span>
    </>
  )
  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
    </>
  )
  const todo = {
      text: "test todo",
      done: true
    }
  render(<Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />)
  
  const todoText = screen.getByText('test todo')
  expect(todoText).toBeInTheDocument()

  const deleteButton = screen.getByText('Delete')
  await userEvent.click(deleteButton)
  expect(delete_todo.mock.calls).toHaveLength(1)
})