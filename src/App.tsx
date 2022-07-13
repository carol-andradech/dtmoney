import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

//Por uma questão de acessibilidade, informar o element root da aplicação
Modal.setAppElement("#root");

export function App() {
  //Estado do modal, se está aberto ou fechado
  const [isNewTransactionModalOpen, setIsNewTransactinModalOpen] =
    useState(false);

  //Função para Modal Aberto
  function handleOpenNewTransactionModal() {
    setIsNewTransactinModalOpen(true);
  }

  //Função para Modal Fechado
  function handleCloseNewTransactionModal() {
    setIsNewTransactinModalOpen(false);
  }

  /*Passo para o Header a propriedade e seu valor.
  Conseguimos fazer componentes filhos alterarem 
  informações do componente pai através do repasse de funções.

  Em NewTransactionModal, passo o isOpen e o estado, e onRequestClose a função que fecha o Modal.
  */
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
