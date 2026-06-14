import { useState } from 'react'
import './App.css'

type Todo = {
    id: number;
    text: string;
    completed: boolean;
  }

export default function TodoApp() {
  // タスクのリストを管理するための状態
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力されたタスクを管理するための状態
  const [inputTodo, setInputTodo] = useState<Todo>({ id: 0, text: "", completed: false });

  // 選択されたタスクをリストから削除する関数
  function deleteTodos(){
    setTodos(todos.filter((todo) => !todo.completed));
  }
  // Todoリストから個別にタスクを削除する関数
  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
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

  // タスクを編集モードにする関数
  function update(id: number, text: string){
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    ))
    setEditingId(null);
    setEditingText("");
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
        checkTodo={checkTodo}
        deleteTodo={deleteTodo} 
        update={update}
      />
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
        placeholder="タスクを入力" />
      <button type="submit">追加</button>
      <button type="button" onClick={deleteTodos}>選択行削除</button>
    </form>
  )
}

// タスクのリストを表示するコンポーネント
function TodoList({ todos, checkTodo, deleteTodo, update }: { 
  todos: Todo[]; 
  checkTodo: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
  update: (id: number, text: string) => void;
 }) {

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          checkTodo={checkTodo}
          deleteTodo={deleteTodo}
          update={update} />
      ))}
    </ul>
  )
}

// タスクのアイテムを表示するコンポーネント
function TodoItem({ todo, checkTodo, deleteTodo, update }: { 
  todo: Todo; 
  checkTodo: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
  update: (id: number, text: string) => void;
 }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);

  function startEdit() {
    setIsEditing(true);
    setEditingText(todo.text);
  }

  function saveEdit(id: number, text: string) {
    update(id, text);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditingText(todo.text);
  }

  return (
    <li>
      <input type="checkbox" 
        checked={todo.completed} 
        onChange={(e) => checkTodo(todo.id, e.target.checked)} />
      {isEditing ? (
        <>  
          <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <button onClick={() => saveEdit(todo.id, editingText)}>変更を保存</button>
          <button onClick={() => cancelEdit()}>キャンセル</button>
        </>
      ) : (
        <>
          {todo.text}
          <button onClick={() => startEdit()}>変更</button>
          <button onClick={() => deleteTodo(todo.id)}>削除</button>
        </>
      )}
    </li>
  )
}