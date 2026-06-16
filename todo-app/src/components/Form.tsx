import type { Todo } from '../types/Todo'

// 入力フォームのコンポーネント
export default function Form({ inputTodo, setInputTodo, addTodo, deleteTodos, changeCheckedAll, isCheckedAll, sortByCreated, sortByDueDate
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