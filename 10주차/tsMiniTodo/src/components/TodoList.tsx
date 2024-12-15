import React, { useState } from 'react';
import styled from 'styled-components';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <Container>
      <Title>TS로 만든 투두리스트</Title>
      <TodoInput onAdd={addTodo} />
      <List>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </List>
    </Container>
  );
}

export default TodoList;

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  font-family: sans-serif;
`;

const Title = styled.h1`
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;
