import styled from 'styled-components';

export const AddItemButton = styled.button`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: #000000;
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 272px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const NewItemButton = styled.button`
  height: 35px;
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`;

export const NewItemInput = styled.input`
  height: 35px;
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;
