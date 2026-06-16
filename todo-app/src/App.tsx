import { useState } from 'react'
import './App.css'

type Todo = {
    id: number;
    text: string;
    completed: boolean;
    dueDate:string;
  }

export default function TodoApp() {
  // タスクのリストを管理するための状態
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力されたタスクを管理するための状態
  const [inputTodo, setInputTodo] = useState<Todo>({ id: 0, text: "", completed: false, dueDate: "" });
  // 全選択状態を取得
  const isCheckedAll = todos.length > 0 && todos.every((todo) => todo.completed);
  // 作成日のソートフラグ
  const [sortedByCreated, setSortedByCreated] = useState<boolean>(true);
  // 期日順ソートフラグ
  const [sortedByDueDate, setSortedByDueDate] = useState<boolean>(false);

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
    setInputTodo({ id: 0, text: "", completed: false, dueDate: "" });
  }

  // チェックボックスの状態を変更する関数
  function checkTodo( id: number, checked: boolean) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    ))
  }

  // タスクを編集モードにする関数
  function update(id: number, text: string, dueDate: string) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text, dueDate } : todo
    ))
  }

  // 全選択する関数
  function changeCheckedAll(checked: boolean) {
    setTodos(todos.map((todo) => (
      { ...todo, completed: checked }
    )));
  }

  // 作成日昇順ソート関数
  function sortByCreatedAsc() {
    setTodos([...todos].sort((a, b) => a.id - b.id));
  }

  // 作成日降順ソート関数
  function sortByCreatedDesc() {
    setTodos([...todos].sort((a, b) => b.id - a.id));
  }

  // 作成日ソート関数
  function sortByCreated() {
    if(!sortedByCreated) {
      sortByCreatedAsc();
    } else {
      sortByCreatedDesc();
    }
    setSortedByCreated(!sortedByCreated);
  }

  // 期日順昇順ソート関数
  function sortByDueDateAsc() {
    setTodos([...todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate)));
  }

  // 期日順降順ソート関数
  function sortByDueDateDesc() {
    setTodos([...todos].sort((a, b) => b.dueDate.localeCompare(a.dueDate)));
  }

  // 期日順ソート関数
  function sortByDueDate() {
    if(!sortedByDueDate) {
      sortByDueDateAsc();
    } else {
      sortByDueDateDesc();
    }
    setSortedByDueDate(!sortedByDueDate);
  }


  return (
    <>
      <div className="header">
        <h1>Todo App</h1>
        <Form 
          inputTodo={inputTodo} 
          setInputTodo={setInputTodo} 
          addTodo={addTodo}
          deleteTodos={deleteTodos} 
          changeCheckedAll={changeCheckedAll}
          isCheckedAll={isCheckedAll}
          sortByCreated={sortByCreated}
          sortByDueDate={sortByDueDate}
        />
      </div>
      <TodoList todos={todos}
        checkTodo={checkTodo}
        deleteTodo={deleteTodo} 
        update={update}
      />
    </>
  )
}

// 入力フォームのコンポーネント
function Form({ inputTodo, setInputTodo, addTodo, deleteTodos, changeCheckedAll, isCheckedAll, sortByCreated, sortByDueDate
 }: { 
  inputTodo: Todo; 
  setInputTodo: React.Dispatch<React.SetStateAction<Todo>>; 
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteTodos: () => void;
  changeCheckedAll: (checked: boolean) => void;
  isCheckedAll: boolean;
  sortByCreated: () => void;
  sortByDueDate: () => void;
 }) {

  return (
    <div className="form-container">
      <form onSubmit={addTodo}>
        <input 
          className="formInput"
          type="text"
          value={inputTodo.text}
          onChange={(e) => setInputTodo({ ...inputTodo, text: e.target.value })}
          placeholder="タスクを入力" 
        />
        <input 
          className="formInput"
          type="date"
          value={inputTodo.dueDate}
          onChange={(e) => setInputTodo({ ...inputTodo, dueDate: e.target.value })}
        />
        <button type="submit">追加</button>
        <button type="button" onClick={deleteTodos}>選択行削除</button>
        {isCheckedAll ? (
          <button type="button" onClick={() => changeCheckedAll(false)}>選択解除</button>
          ) : (
          <button type="button" onClick={() => changeCheckedAll(true)}>全選択</button>  
        )}
        <br></br>
        <div className="sort-container">
          <button className="sort-button" type="button" onClick = {sortByCreated}>作成日順</button>
          <button className="sort-button" type="button" onClick = {sortByDueDate}>期日順</button>
        </div>
      </form>
    </div>
  )
}

// タスクのリストを表示するコンポーネント
function TodoList({ todos, checkTodo, deleteTodo, update }: { 
  todos: Todo[]; 
  checkTodo: (id: number, checked: boolean) => void;
  deleteTodo: (id: number) => void;
  update: (id: number, text: string, dueDate: string) => void;
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
  update: (id: number, text: string, dueDate: string) => void;
 }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);
  const [editingDueDate, setEditingDueDate] = useState(todo.dueDate);

  function startEdit() {
    setIsEditing(true);
    setEditingText(todo.text);
    setEditingDueDate(todo.dueDate);
  }

  function saveEdit(id: number, text: string, dueDate: string) {
    update(id, text, dueDate);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditingText(todo.text);
    setEditingDueDate(todo.dueDate);
  }

  return (
    <li>
      <input type="checkbox" 
        checked={todo.completed} 
        onChange={(e) => checkTodo(todo.id, e.target.checked)} />
      {isEditing ? (
        <>  
          <input 
            value={editingText} 
            onChange={(e) => setEditingText(e.target.value)} 
          />
          <span>期日: </span>
          <input 
            type="date"
            value={editingDueDate} 
            onChange={(e) => setEditingDueDate(e.target.value)} 
          />
          <button onClick={() => saveEdit(todo.id, editingText, editingDueDate)}>変更を保存</button>
          <button onClick={() => cancelEdit()}>キャンセル</button>
        </>
      ) : (
        <>
          <input 
            value={todo.text}
            readOnly={true}
          />
          <span>期日:{todo.dueDate || "未設定"}</span>
          <button onClick={() => startEdit()}>変更</button>
          <button onClick={() => deleteTodo(todo.id)}>削除</button>
        </>
      )}
    </li>
  )
}