import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useRef,
} from 'react';
import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: '1rem',
      fontWeight: 'bold',
    }}
  >
    {children}
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  // basic useReducer
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
  }, []);

  // used to get value for non controlled components
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: 'ADD',
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = '';
    }
  }, []);

  /**
   * This thing is basic, but it leaks data everywhere
   * Can be greatly improved with ReturnTypes
   * use a custom hook
   */
  //  const [value, setValue] = useState<number>(0);
  // const Incrementor: React.FunctionComponent<{
  //   value: number,
  //   setValue: React.Dispatch<React.SetStateAction<number>>
  // }> = ({value, setValue}) => (
  //   <button onClick={() => setValue(value + 1)}> Add Value</button>
  // );

  /**
   *  useNumber + betterIncrementor
   *  really nice way to pass setState values down into components
   *  handles really complex state very well without
   *  passing the entire obj in
   */
  const useNumber = (initialValue: number = 0) =>
    useState<number>(initialValue);
  type UseNumberValue = ReturnType<typeof useNumber>[0];
  type SetNumberValue = ReturnType<typeof useNumber>[1];

  const [numberValue, setNumberValue] = useNumber();
  const BetterIncrememntor: React.FunctionComponent<{
    value: UseNumberValue;
    setValue: SetNumberValue;
  }> = ({ value, setValue }) => (
    <button onClick={() => setValue(value + 1)}> Add Value: {value}</button>
  );

  /**
   * typing a custom component for reuse with intrinsic styles
   * intrinsic types found here
   * https://unpkg.com/@types/react@16.4.7/index.d.ts
   */
  type IntrinsicButtonType = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  const BiggerButton: React.FunctionComponent<IntrinsicButtonType> = ({
    children,
    style,
    ...rest
  }) => (
    <button
      {...rest}
      style={{
        ...style,
        backgroundColor: 'red',
        color: 'white',
        fontSize: 'xx-large',
        margin: '30px',
      }}
    >
      {children}
    </button>
  );

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={['one', 'two', 'three']} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <BetterIncrememntor value={numberValue} setValue={setNumberValue} />

      <BiggerButton
        onClick={() => alert('clicked')}
        style={{ padding: '10px' }}
      >
        Hi
      </BiggerButton>

      <Heading title="Todos" />
      {todos.map(({ id, text }) => (
        <div key={id}>
          {text}
          <button
            onClick={() =>
              dispatch({
                id,
                type: 'REMOVE',
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
