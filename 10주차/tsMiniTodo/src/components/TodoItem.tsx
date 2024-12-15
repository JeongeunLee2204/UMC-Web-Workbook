import React from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <Item>
      <Text completed={todo.completed} onClick={() => onToggle(todo.id)}>
        {todo.text}
      </Text>
      <DeleteButton onClick={() => onDelete(todo.id)}>x</DeleteButton>
    </Item>
  );
}

export default TodoItem;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Text = styled.span<{ completed: boolean }>`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
`;
