import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="추가하기"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button type="submit"> + </Button>
    </Form>
  );
}

export default TodoInput;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
`;

const Button = styled.button`
  padding: 0 16px;
  border: 1px solid #ddd;
  border-left: none;
  background: #eee;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
`;
