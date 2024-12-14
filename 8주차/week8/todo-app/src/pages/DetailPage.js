// pages/DetailPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import TodoDetail from '../components/TodoDetail';
import styled from 'styled-components';

const PageContainer = styled.div`
  /* 스타일링 */
`;

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, loading, error } = useFetch(`http://localhost:3000/todo/${id}`);

  const handleUpdate = updatedTodo => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then(() => {
        // 업데이트 후 처리
      })
      .catch(error => {
        // 에러 처리
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        // 에러 처리
      });
  };
  

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <PageContainer>
      <TodoDetail todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
    </PageContainer>
  );
}

export default DetailPage;
