import React, { useState } from "react";
import { transactionApi } from "../api/transactionApi";
import { toast } from "react-toastify";
import AddTransactionModal from "./Modals/AddTransactionModal";
import Loading from "../assets/loading2svg.svg";

function TransactionsTable({ transactions, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedTransaction, setSelectedTransaction] = useState();

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    openModal();
  };

  const deleteTransaction = async (transactionId) => {
    setIsLoading(true);
    try {
      await transactionApi.deleteTransaction(transactionId);
      toast.success("Transaction deleted successfully, reload to see changes");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} alt="loading" />
        </div>
      )}
      <AddTransactionModal categories={categories} isOpen={isModalOpen} onClose={closeModal} transaction={selectedTransaction} />
      <table className="my-8 rounded p-4 w-7xl mx-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y font-sans divide-gray-200">
          {transactions?.length > 0 &&
            transactions?.map((transaction) => (
              <tr key={transaction?.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction?.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="mx-2" onClick={() => handleEdit(transaction)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                    </svg>
                  </button>
                  <button className="mx-2" onClick={() => deleteTransaction(transaction.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {transactions?.length === 0 && <div className="text-center text-white font-sans font-bold text-lg mt-10">No transactions found</div>}
    </div>
  );
}

export default TransactionsTable;
