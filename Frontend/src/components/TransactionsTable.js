import React, { useCallback, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { transactionApi } from "../api/transactionApi";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import ReactSelect from "react-select";
import ReactSlider from "react-slider";
import AddTransactionModal from "./Modals/AddTransactionModal";
import Loading from "../assets/loading2svg.svg";

function TransactionsTable({ startDate, endDate, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedTransaction, setSelectedTransaction] = useState();

  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [range, setRange] = useState([0, 10000]);
  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    openModal();
  };

  const fetchUserTransactions = async () => {
    setIsLoading(true);
    if (!startDate || !endDate) return;
    try {
      const filters = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        categories: selectedCategories?.map((category) => category.value).join(","),
        minAmount: range[0],
        maxAmount: range[1],
      };
      const response = await transactionApi.getTransactionsByUser(user?.userId, filters);
      setTransactions(response.data.content);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    setIsLoading(true);
    try {
      await transactionApi.deleteTransaction(transactionId);
      fetchUserTransactions();

      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [startDate, endDate, selectedCategories, range, user?.userId]);

  return (
    <div>
      <div className="w-full">
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <AddTransactionModal fetchUserTransactions={fetchUserTransactions} transaction={selectedTransaction} onClose={closeModal} isOpen={isModalOpen} categories={categories} />

        <div className="bg-gray-200 p-4 px-10 rounded-lg shadow-lg mx-auto mt-5 flex w-1/2 justify-between items-center space-x-4">
          <div className="flex-1 max-w-xs">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Categories</label>
            <ReactSelect id="categories" options={categoryOptions} isMulti className="basic-multi-select" classNamePrefix="select" value={selectedCategories} onChange={handleCategoryChange} />
          </div>
          <div className="flex-1 max-w-sm ">
            <label className="block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2">Amount</label>
            <ReactSlider
              onChange={(value) => {
                setRange(value);
              }}
              className="w-full bg-gray-700 font-bold h-2 cursor-pointer rounded-full"
              thumbClassName="absolute  w-2 py-1 h-2 bg-blue-900 rounded-full focus:outline-none"
              trackClassName=" bg-gray-900 rounded-full"
              defaultValue={[0, 10000]}
              max={10000}
              ariaLabel={["Lower thumb", "Upper thumb"]}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => (
                <div className="mt-2" {...props}>
                  {state.valueNow}
                </div>
              )}
              pearling
              minDistance={10}
              renderTrack={(props, state) => {
                let className = "h-2 rounded-full ";
                className += state.index === 1 ? "bg-blue-500" : "bg-gray-300";
                return <div {...props} className={className} style={{ ...props.style }} />;
              }}
            />
          </div>
        </div>
      </div>

      <table className="mt-4 w-7xl mx-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={fetchUserTransactions}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </button>
            </th>
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
      {transactions.length === 0 && <div className="text-center font-sans font-bold text-lg mt-10">No transactions found</div>}
    </div>
  );
}

export default TransactionsTable;
