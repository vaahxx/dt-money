import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width='50%'>Website development</td>
              <td>
                <PriceHighlight variant='income'>12,000.00 $</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/01/2023</td>
            </tr>
            <tr>
              <td width='50%'>Dinner</td>
              <td>
                <PriceHighlight variant='outcome'>-25.99 $</PriceHighlight>
              </td>
              <td>Food</td>
              <td>10/01/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
