import React, { useCallback, useRef } from 'react';
import './App.css';
import {
  TodosProvider,
  useTodosManager,
  useAddTodos,
  useRemoveTodo,
  useTodos,
} from './hooks/useTodos';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

/**
 * takes in a generic list of items,
 * and a render prop to handle that item being rendered
 * totally hands off all render logic to the implementationu
 * EXTREMELY NICE
 * By adding the DetailedHTMLProps it also extends it to a common ul
 * you can add classes etc
 */
function UL<T>({
  items,
  itemClick,
  render,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  items: T[];
  itemClick: (item: T) => void;
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodos();
  const removeTodo = useRemoveTodo();

  // used to get value for non controlled components
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  const onRemoveTodo = (id: number) => removeTodo(id);

  return (
    <div>
      <Heading title="Introduction" />
      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={({ id, text }) => (
          <>
            {text}
            <button onClick={() => onRemoveTodo(id)}>Remove</button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

/**
 * Using Todo Context
 * @returns
 */
const AppWrapper = () => (
  <TodosProvider initalTodos={[{ id: 0, text: 'get coffee', done: false }]}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
      }}
    >
      <App />
      <App />
    </div>
  </TodosProvider>
);

export default AppWrapper;
