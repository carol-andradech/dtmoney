import styled from "styled-components";
import { darken, transparentize } from "polished";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e8ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    //Os inputs que tiverem um input antes dele, recebem margin top
    //Ou seja, começa a aplicar no segundo input
    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.2s;

    &:hover {
      //Diminuo a luminosidade
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

/* Vou criar uma nova propriedade pro botão chamada isActive
Defino o tipo usando TypeScript*/
interface RadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

/*Vou criar as cores em uma string,
pois como vou utilizar dentro do javaScipt
ele não vai reconhecer o valor global do css */
const colors = {
  green: "#33CC95",
  red: "#E62E4D",
};

/* Passo para o StyledComponents utilizando a funcionalidade
do TypeScript chamada generic*/
export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  /*O styled components tem uma funcionalidade que 
  toda vez que eu passar uma função dentro de uma interpolação, 
  essa função vai ser chamada automaticamente pelo styled components, 
  passando todas as propriedades do meu componente. 
  Dessa forma, eu tenho acesso a propriedade isActive.
  
  Coloco o css dentro de aspas, pois agr isso é javaScript.
  
  Quando eu não coloco chaves por volta de uma função, 
  o conteúdo dela, faz um retorno automático.
  É o mesmo que:
 (props) => {
    return props.isActive ? "#ccc" : "transparent";
  }};

  Se o prop isActive tem valor true,
  mudo a cor para o que retorna de
  props.activeColor, que retorna red ou green,
  e pego o hexadecimal do valor retornado. 
  E passo pelo filtro do polarize.
  Se o isActive é falsa, o background é transparente.
  */

  background: ${(props) =>
    props.isActive
      ? transparentize(0.9, colors[props.activeColor])
      : "transparent"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: filter 0.2s;

  &:hover {
    // Utilizo a função darken do polished
    // Para escurecer em 10% a cor d7d7d7
    border-color: ${darken(0.1, "#d7d7d7")};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;
