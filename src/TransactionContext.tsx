import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

//aceita qualquer tipo de conteúdo válido por react
interface TransactionsProviderProps {
  children: ReactNode;
}

//crio um novo componente para poder passar os dados para qualquer componente da aplicação
export const TransactionsContext = createContext<Transaction[]>([]);

/*Ao invés de criar esse estado dentro do App, se tivesse mais contextos, teria que adicionar mais código em App
Então eu crio um componente e dentro dele crio o estado que recebe os dados.
Retorno o TransactionsContext.Provider com o valor das transações.
E em App eu importo só o TransactionsProvider.
*/
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  //um array de transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
