import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import AddTransactionModal from "./Modals/AddTransactionModal";
import AddCategoryModal from "./AddCategoryModal";

function AddAndDate({ startDate, setStartDate, endDate, setEndDate, categories, fetchCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-xl">
      <AddTransactionModal onClose={closeModal} isOpen={isModalOpen} categories={categories} />
      <AddCategoryModal fetchCategories={fetchCategories} onClose={closeCategoryModal} isOpen={isCategoryModalOpen} />
      <div className="flex flex-row justify-between space-x-4 w-1/2">
        <div className="flex flex-col space-y-2">
          <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Transaction
          </button>
          <label className="text-gray-700 text-sm font-bold" htmlFor="start-date">
            Start Date:
          </label>
          <ReactDatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button onClick={openCategoryModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Category
          </button>
          <label className="text-gray-700 text-sm font-bold" htmlFor="end-date">
            End Date:
          </label>
          <ReactDatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
}

export default AddAndDate;
