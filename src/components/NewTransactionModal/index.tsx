import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  //que é uma função que não retorna nada
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  //Crio uma const para cada dado que vou receber
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  /*Nos inputs, eu adiciono o  amount {}, 
  e a função onChange() que executa toda vez que o valor 
  daquele input é alterado. Ele retorna um event.
  event.target.value - retorna o que foi digitado,
  e então seto o valor em sua const.
  Porém, onChange() retorna sempre uma string,
  independetemente do tipo do input,
  então eu posso usar o construtor Number() para transformar em número.
  */

  //Crio um estado para verificar o tipo do botão
  const [type, setType] = useState("deposit");

  /*Essa função é disparada pelo submit do formulário
  O formulário é o componente Container
  O onSubmit retorna um evento.
  Então recebemos esse event no formato FormEvent.
  event.preventDefault - previne o padrão do form html que é atualizar toda a página
  */
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            className={type === "deposit" ? "active" : ""}
            //utilizo uma arrow function para mudar o estado do type
            onClick={() => {
              setType("deposit");
            }}
            /*Crio uma propriedade com o nome que eu quiser
            isActive retorna true se o type for deposit 
            e false se não for. */
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            //utilizo uma arrow function para mudar o estado do type
            onClick={() => {
              setType("withdraw");
            }}
            /*Crio uma propriedade com o nome que eu quiser
            isActive retorna true se o type for withdraw 
            e false se não for. */
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
