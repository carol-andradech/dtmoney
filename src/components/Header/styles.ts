import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  //vai ter uma largura máxima
  max-width: 1120px;
  //centralizar
  margin: 0 auto;
  //rem equivale ao font-size no root
  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    transition: filter 0.2s;

    &:hover {
      //vai levemente escurecer
      filter: brightness(0.9);
    }
  }
`;
