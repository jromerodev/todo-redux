import {
  ActionTypes,
  ADD_TODO,
  DELETE_TODO,
  SET_TODOS,
  TOGGLE_TODO,
  SET_NEWTODO,
  UPDATE_TODO,
} from './actions';
import { Store } from './types';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

//Redux implementation reducer takes initial state

//action types
function todoReducer(
  state: Store = { todos: [], newTodo: '' },
  action: ActionTypes
) {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SET_NEWTODO:
      return {
        ...state,
        newTodo: action.payload,
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: updateTodo(state.todos, action.payload.id, action.payload.text),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        newTodo: '',
        todos: toggleTodo(state.todos, action.payload),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: removeTodo(state.todos, action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        newTodo: '',
        todos: addTodo(state.todos, state.newTodo),
      };

    default:
      return state;
  }
}
//create store with reducer and apply the middleware
//const store = createStore(todoReducer);
const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;
