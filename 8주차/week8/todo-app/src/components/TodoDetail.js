import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;

  span {
    font-weight: bold;
  }
`;

const BackButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: none;
  background-color: #ffb347;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ffcc80;
  }
`;

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/todo/${id}`)
      .then(response => response.json())
      .then(data => setTodo(data))
      .catch(err => console.error('Error fetching todo:', err));
  }, [id]);

  if (!todo) {
    return <div>로딩 중...</div>;
  }

  return (
    <DetailContainer>
      <Header>⚡ UMC ToDoList ⚡</Header>
      <DetailItem>
        <span>Id:</span> {todo.id}
      </DetailItem>
      <DetailItem>
        <span>제목:</span> {todo.title}
      </DetailItem>
      <DetailItem>
        <span>내용:</span> {todo.content}
      </DetailItem>
      <DetailItem>
        <span>생성일:</span> {todo.createdAt}
      </DetailItem>
      <DetailItem>
        <span>상태:</span> {todo.checked ? '완료' : '미완료'}
      </DetailItem>
      <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
    </DetailContainer>
  );
}

export default TodoDetail;
