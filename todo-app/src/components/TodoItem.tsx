import { useState } from 'react'
import type { Todo } from '../types/Todo'


// タスクのアイテムを表示するコンポーネント
export default function TodoItem({ todo, checkTodo, deleteTodo, update }: { 
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