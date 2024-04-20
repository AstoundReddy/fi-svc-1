import React, { useCallback, useContext, useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import AddCategoryModal from "../../components/AddCategoryModal";
import { transactionApi } from "../../api/transactionApi";

function AddTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.getCategoriesByUser(user?.userId);
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId]);

  const addTransaction = async () => {
    setIsLoading(true);
    try {
      const response = await transactionApi.addTransaction(user?.userId, {
        amount,
        category: {
          id: categories.find((c) => c.name === category).id,
        },
        user: {
          id: user?.userId,
        },
        date,
        description: note,
      });
      console.log(response.data);
      setAmount("");
      setCategory("");
      setDate("");
      setNote("");
      toast.success("Transaction added successfully");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const isFormValid = amount && category && date && note;

  return (
    <div>
      <AddCategoryModal fetchCategories={getCategories} isOpen={isOpen} onClose={closeModal} />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Add Transaction</h1>
          <button
            onClick={addTransaction}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
            disabled={!isFormValid}>
            Add Transaction
          </button>
          <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Category
          </button>
        </div>
        <div className="mt-8">
          <form className="flex justify-around">
            <div className="flex flex-col ">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="amount">
                Amount
              </label>
              <input className="border py-2 px-3 text-grey-darkest" type="number" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="flex flex-col ">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="category">
                Category
              </label>
              <select className="border py-2 px-3 text-grey-darkest" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option className="py-1 px-2 text-grey-darkest hover:bg-gray-200" key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="date">
                Date
              </label>
              <input className="border py-2 px-3 text-grey-darkest" type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="flex flex-col ">
              <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="note">
                Description
              </label>
              <textarea className="border py-2 px-3 text-grey-darkest" id="note" name="note" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
