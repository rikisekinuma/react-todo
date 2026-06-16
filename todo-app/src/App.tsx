import { useState } from 'react'
import './App.css'
import { Form, TodoList } from '.'
import type { Todo } from './types/Todo'

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