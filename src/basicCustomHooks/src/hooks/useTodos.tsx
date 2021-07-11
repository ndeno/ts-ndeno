import { useCallback, useReducer, createContext, useContext } from 'react';

const TodoContext = createContext<UseTodosManagerResult>({
  addTodo: () => {},
  removeTodo: () => {},
  todos: [],
});

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

/**
 * NICE - entirely wraps away useReducer logic, gives handy apis
 * @param initialTodos
 * @returns
 */
export const useTodosManager = (
  initialTodos: Todo[]
): {
  addTodo: (ActionType: string) => void;
  removeTodo: (id: number) => void;
  todos: Todo[];
} => {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error('Action not found');
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      id,
      type: 'REMOVE',
    });
  }, []);

  return {
    addTodo,
    removeTodo,
    todos,
  };
};

// the value gives a handy reducer hook with the default value
export const TodosProvider: React.FunctionComponent<{
  initalTodos: Todo[];
}> = ({ initalTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initalTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): UseTodosManagerResult['todos'] => {
  const { todos } = useContext(TodoContext);

  return todos;
};
export const useAddTodos = (): UseTodosManagerResult['addTodo'] => {
  const { addTodo } = useContext(TodoContext);

  return addTodo;
};
export const useRemoveTodo = (): UseTodosManagerResult['removeTodo'] => {
  const { removeTodo } = useContext(TodoContext);

  return removeTodo;
};
