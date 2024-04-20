import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { transactionApi } from "../../api/transactionApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ReactModal from "react-modal";
import Loading from "../../assets/loading2svg.svg";
function AddTransactionModal({ isOpen, onClose, categories, transaction }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const addTransaction = async () => {
    setIsLoading(true);
    try {
      const response = await transactionApi.addTransaction(user?.userId, {
        amount,
        category: {
          id: category,
        },
        user: {
          id: user?.userId,
        },
        date,
        description: description,
      });
      //   fetchUserTransactions();
      onClose();
      console.log(response.data);
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      toast.success("Transaction added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const editTransaction = async () => {
    setIsLoading(true);
    try {
      await transactionApi.editTransaction({
        ...transaction,
        amount,
        category: {
          id: category,
        },
        user: {
          id: user?.userId,
        },
        date,
        description: description,
      });
      onClose();
      //   fetchUserTransactions();
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      toast.success("Transaction edited successfully");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    if (transaction?.id) {
      editTransaction();
    } else {
      addTransaction();
    }
  };

  const isFormValid = amount && category && date;
  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setCategory(transaction.category.id);
      setDate(transaction.date);
      setDescription(transaction.description);
    }
  }, [transaction]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Category"
      className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
      overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div className="space-y-3">
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="flex flex-col ">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Amount</label>
          <input className="border py-2 px-3 text-grey-darkest" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="flex flex-col ">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Category</label>
          <select className="border py-2 px-3 text-grey-darkest" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option className="py-1 px-2 text-grey-darkest hover:bg-gray-200" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Date</label>
          <input className="border py-2 px-3 text-grey-darkest" type="date" value={date} onChange={(e) => setDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="flex flex-col ">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Description</label>
          <textarea className="border py-2 px-3 text-grey-darkest" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button
          onClick={() => handleClick()}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
          disabled={!isFormValid}>
          Save
        </button>
      </div>
    </ReactModal>
  );
}

export default AddTransactionModal;
