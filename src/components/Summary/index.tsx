import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { amountFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Summary() {
  const summary = useSummary();

  const totalAmount = useContextSelector(
    TransactionsContext, (context) => {
      return context.totalAmount;
    }
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Incomes</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>
        <strong>{amountFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Outcomes</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>
        <strong>{amountFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#fff' />
        </header>
        <strong>{amountFormatter.format(totalAmount)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
