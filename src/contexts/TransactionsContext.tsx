import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface Transaction {
  id: string;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions() {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
