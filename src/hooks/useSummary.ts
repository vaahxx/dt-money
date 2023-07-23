import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else {
          acc.outcome += (transaction.amount * -1) * -1;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
      }
    );
  }, [transactions]);
  return summary;
}
