import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  amount: number;
  category: string;
  created_at: string;
}

interface CreateTransactionInput {
  description: string;
  amount: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const url = query ? `/transactions?description=${query}` : "/transactions";
    const response = await api.get(url);
    setTransactions(response.data?.transactions);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, amount, category, type } = data;
      const response = await api.post("/transactions", {
        description,
        amount,
        category,
        type,
        created_at: new Date(),
      });

      setTransactions((state) => [response.data?.transaction[0], ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
