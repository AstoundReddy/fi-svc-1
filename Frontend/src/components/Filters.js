import React, { useContext, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { transactionApi } from "../api/transactionApi";
import { AuthContext } from "../context/AuthContext";
import ReactSlider from "react-slider";
import Loading from "../assets/loading2svg.svg";
import AddTransactionModal from "./Modals/AddTransactionModal";
import AddCategoryModal from "./Modals/AddCategoryModal";
import "react-datepicker/dist/react-datepicker.css";
function Filters({ categories, setTransactions, getCategories }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [range, setRange] = useState([0, 10000]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  const categoryOptions = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
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
      console.log(response);
      setTransactions(response?.data?.content);
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserTransactions();
  }, [startDate, endDate, selectedCategories, range, user?.userId]);
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} className="w-12" alt="Loading" />
        </div>
      )}
      <AddTransactionModal categories={categories} isOpen={isModalOpen} onClose={closeModal} />
      <AddCategoryModal fetchCategories={getCategories} isOpen={isCategoryModalOpen} onClose={closeCategoryModal} />
      <div className="justify-between mx-10 my-2 flex">
        <button onClick={openModal} className="bg-violet-200 mx-1 hover:bg-violet-400 text-slate-600 rounded font-bold p-2 shadow-lg">
          ➕ Transaction
        </button>
        <button onClick={fetchUserTransactions}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#9467bd" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        </button>
        <button onClick={openCategoryModal} className="bg-violet-200 mx-1 hover:bg-violet-400 text-slate-600 rounded font-bold p-2 shadow-lg">
          ➕ Category
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-between px-12">
        <div className="flex-1 max-w-xs">
          <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">Categories</label>
          <ReactSelect id="categories" options={categoryOptions} isMulti className="basic-multi-select" classNamePrefix="select" value={selectedCategories} onChange={handleCategoryChange} />
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-200 text-sm font-bold" htmlFor="start-date">
              Start Date:
            </label>
            <ReactDatePicker
              id="start-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-200 text-sm font-bold" htmlFor="end-date">
              End Date:
            </label>
            <ReactDatePicker
              id="end-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex min-w-60 flex-col space-y-2">
          <label className="text-gray-100 text-sm font-bold" htmlFor="end-date">
            Amount
          </label>
          <ReactSlider
            onAfterChange={(value) => {
              setRange(value);
            }}
            className="w-full bg-gray-700 text-white font-bold h-2 cursor-pointer rounded-full"
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
  );
}

export default Filters;
