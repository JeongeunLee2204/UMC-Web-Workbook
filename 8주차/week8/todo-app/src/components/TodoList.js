import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <ListContainer>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ListContainer>
  );
}

export default TodoList;
