import { useState } from 'react'
import './App.css'

export default function TodoApp() {
  // タスクのリストを管理するための状態
  const [todos,setTodos] = useState<string[]>([]);
  // 入力されたタスクを管理するための状態
  const [inputTodo, setInputTodo] = useState<string>("");
  
  // 選択されたタスクをリストから削除する関数
  function deleteTodo(){}

  // 入力したタスクをリストに追加する関数
  function addTodo( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputTodo.trim() === "") return;

    setTodos([...todos, inputTodo]);
    setInputTodo("");
  }

  return (
    <>
      <h1>Todo App</h1>
      <Form 
        inputTodo={inputTodo} 
        setInputTodo={setInputTodo} 
        addTodo={addTodo} />
      <TodoList todos={todos} />
    </>
  )
}

// 入力フォームのコンポーネント
function Form({ inputTodo, setInputTodo, addTodo }: { 
  inputTodo: string; 
  setInputTodo: React.Dispatch<React.SetStateAction<string>>; 
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void }) {




  return (
    <form onSubmit={addTodo}>
      <input type="text"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
        placeholder="タスクを入力"  />
      <button type="submit">追加</button>
      <button type="button">削除</button>
    </form>
  )
}

// タスクのリストを表示するコンポーネント
function TodoList({ todos }: { todos: string[] }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  )
}

// タスクのアイテムを表示するコンポーネント
function TodoItem({ todo }: { todo: string }) {
  return (
    <li>
      <input type="checkbox" />
      {todo}
      <button>変更</button>
      <button>削除</button>
    </li>
  )
}