import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import ReactSlider from "react-slider";
import { categoryApi } from "../../api/categoryApi";
import { AuthContext } from "../../context/AuthContext";
import { transactionApi } from "../../api/transactionApi";
import BarGraph from "../../components/BarGraph";
import PieGraph from "../../components/PieGraph";
import Loading from "../../assets/loading2svg.svg";

function Graphs({ startDate, endDate, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [range, setRange] = useState([0, 10000]);
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const fetchUserTransactions = useCallback(async () => {
    setIsLoading(true);
    if (!startDate || !endDate) return;
    try {
      const filters = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        categories: selectedCategories.map((category) => category.value).join(","),
        minAmount: range[0],
        maxAmount: range[1],
      };
      const response = await transactionApi.getTransactionsByUser(user?.userId, filters);
      setTransactions(response?.data.content);
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, selectedCategories, range, user?.userId]);

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  return (
    <div>
      <div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="bg-gray-200 p-4 px-10 rounded-lg shadow-lg mx-auto mt-5 flex w-1/2 justify-between items-center space-x-4">
          <div className="flex-1 max-w-xs">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Categories</label>
            <ReactSelect id="categories" options={categoryOptions} isMulti className="basic-multi-select" classNamePrefix="select" value={selectedCategories} onChange={handleCategoryChange} />
          </div>
          <div className="flex-1 max-w-md ">
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
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
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

      {transactions.length === 0 ? (
        <div className="text-center font-sans font-bold text-lg mt-10">No transactions found</div>
      ) : (
        <div className="">
          <BarGraph transactions={transactions} categories={categories} />

          <PieGraph transactions={transactions} categories={categories} />
        </div>
      )}
    </div>
  );
}

export default Graphs;
