import { useState } from 'react'
import './App.css'

type Todo = {
    id: number;
    text: string;
    completed: boolean;
  }

export default function TodoApp() {
  // タスクのリストを管理するための状態
  const [todos,setTodos] = useState<Todo[]>([]);
  // 入力されたタスクを管理するための状態
  const [inputTodo, setInputTodo] = useState<Todo>({ id: 0, text: "", completed: false });
  
  // 選択されたタスクをリストから削除する関数
  function deleteTodos(){
    setTodos(todos.filter((todo) => !todo.completed));
  }

  // 入力したタスクをリストに追加する関数
  function addTodo( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputTodo.text.trim() === "") return;

    // 今あるTodosを全部コピーして、inputTodoを追加したものを新しいTodosとしてセットする
    setTodos([...todos, { ...inputTodo, id: Date.now() }]);
    setInputTodo({ id: 0, text: "", completed: false });
  }

  // チェックボックスの状態を変更する関数
  function checkTodo( id: number, checked: boolean) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    ))
  }

  return (
    <>
      <h1>Todo App</h1>
      <Form 
        inputTodo={inputTodo} 
        setInputTodo={setInputTodo} 
        addTodo={addTodo}
        deleteTodos={deleteTodos} />
      <TodoList todos={todos}
        checkTodo={checkTodo} />
    </>
  )
}

// 入力フォームのコンポーネント
function Form({ inputTodo, setInputTodo, addTodo, deleteTodos }: { 
  inputTodo: Todo; 
  setInputTodo: React.Dispatch<React.SetStateAction<Todo>>; 
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteTodos: () => void;
 }) {

  return (
    <form onSubmit={addTodo}>
      <input type="text"
        value={inputTodo.text}
        onChange={(e) => setInputTodo({ ...inputTodo, text: e.target.value })}
        placeholder="タスクを入力"  />
      <button type="submit">追加</button>
      <button type="button" onClick={deleteTodos}>選択行削除</button>
    </form>
  )
}

// タスクのリストを表示するコンポーネント
function TodoList({ todos, checkTodo }: { 
  todos: Todo[]; 
  checkTodo: (id: number, checked: boolean) => void }) {

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          checkTodo={checkTodo} />
      ))}
    </ul>
  )
}

// タスクのアイテムを表示するコンポーネント
function TodoItem({ todo, checkTodo }: { 
  todo: Todo; 
  checkTodo: (id: number, checked: boolean) => void}) {
  
  return (
    <li>
      <input type="checkbox" 
        checked={todo.completed} 
        onChange={(e) => checkTodo(todo.id, e.target.checked)} />
      {todo.text}
      <button>変更</button>
      <button>削除</button>
    </li>
  )
}