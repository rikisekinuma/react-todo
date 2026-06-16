import type { Todo } from '../types/Todo'
import { TodoItem } from '..'

// タスクのリストを表示するコンポーネント
export default function TodoList({ todos, checkTodo, deleteTodo, update }: { 
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