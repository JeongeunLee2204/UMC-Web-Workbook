import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoList from '../components/TodoList';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    border: none;
    background-color: #ffb347;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #ffcc80;
    }

    &:disabled {
      background-color: #ffe0b2;
      cursor: not-allowed;
    }
  }
`;

function HomePage() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Fetch todos
  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:3000/todo').then((res) => res.json()),
  });

  // Add todo
  const addTodoMutation = useMutation({
    mutationFn: (newTodo) =>
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCreate = () => {
    const newTodo = {
      title: newTitle,
      content: newContent,
    };
    addTodoMutation.mutate(newTodo);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (id) => {
    deleteTodoMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading todos...</div>;

  return (
    <PageContainer>
      <Header>⚡ UMC ToDoList ⚡</Header>
      <InputContainer>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={handleCreate} disabled={!newTitle || !newContent}>
          ToDo 생성
        </button>
      </InputContainer>
      <TodoList todos={todos} onDelete={handleDelete} />
    </PageContainer>
  );
}

export default HomePage;
