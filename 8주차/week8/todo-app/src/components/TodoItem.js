import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;

  button {
    border: none;
    background-color: #ffb347;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #ffcc80;
    }
  }
`;

function TodoItem({ todo, onDelete }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  const updateTodoMutation = useMutation({
    mutationFn: (updatedTodo) =>
      fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSave = () => {
    const updatedTodo = { title, content };
    updateTodoMutation.mutate(updatedTodo);
    setEditing(false);
  };

  return (
    <ItemContainer>
      <Content>
        {editing ? (
          <>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
          </>
        )}
      </Content>
      <Buttons>
        {editing ? (
          <>
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setEditing(false)}>취소</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>수정</button>
            <button onClick={() => onDelete(todo.id)}>삭제</button>
          </>
        )}
      </Buttons>
    </ItemContainer>
  );
}

export default TodoItem;
