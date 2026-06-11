import { useState } from 'react'
import './App.css'

export default function TodoApp() {
  

  return (
    <>
      <h1>Todo App</h1>
      <Form />
      <TodoList />
    </>
  )
}

function Form() {
  return (
    <form>
      <input type="text" placeholder="タスクを入力" />
      <button type="submit">追加</button>
    </form>
  )
}

function TodoList() {
  return (
    <ul>
      <TodoItem />
    </ul>
  )
}

function TodoItem() {
  return (
    <li>
      <input type="checkbox" />
      タスク
      <button>変更</button>
      <button>削除</button>
    </li>
  )
}