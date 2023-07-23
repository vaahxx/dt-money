import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, Spinner, X } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { register, handleSubmit, control, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
      defaultValues: {
        type: "income",
      },
    });

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const isCreatingTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.isCreatingTransaction;
    }
  );

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='description'
            required
            {...register("description")}
          ></input>
          <input
            type='number'
            placeholder='amount'
            required
            {...register("amount", { valueAsNumber: true })}
          ></input>
          <input
            type='text'
            placeholder='category'
            required
            {...register("category")}
          ></input>

          <Controller
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={(value: NewTransactionFormInputs["type"]) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Expense
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type='submit'>
            {isCreatingTransaction ? (
              <div>
                <Spinner size={24} />
                <span>Creating...</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
