import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

//Aqui estaria herdando somente os campos escolhidos
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

//Herda todos os campos do Transaction, menos o id e o createdAt
type TransactionInput = Omit<Transaction, "id" | "createdAt">;

//aceita qualquer tipo de conteúdo válido por react
interface TransactionsProviderProps {
  children: ReactNode;
}

//Vai ter um array de transaction
//E uma função que recebe por parâmetro uma transaction que é do tipo TransactionInput.
//E ela devolve um Promise, pois é assíncrona, e void.
interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//crio um novo componente para poder passar os dados para qualquer componente da aplicação
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

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

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    //Seguindo o conceito de mutabilidade do React,
    //sempre que quero adicionar uma nova informação em um vetor no estado do React,
    //sempre copio as informações que estão lá dentro e adiciono a nova.
    setTransactions([...transactions, transaction]);
  }
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
