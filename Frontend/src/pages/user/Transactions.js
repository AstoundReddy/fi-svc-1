import React, { useCallback, useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddAndDate from "../../components/AddAndDate";
import TransactionsTable from "../../components/TransactionsTable";
import { AuthContext } from "../../context/AuthContext";
import { categoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";

function Transactions() {
  const { user } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.getCategoriesByUser(user?.userId);
      setCategories(response?.data);
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId]);
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div>
      <div className="flex flex-row w-full justify-center items-center">
        <AddAndDate categories={categories} fetchCategories={getCategories} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </div>
      <div>
        <TransactionsTable categories={categories} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}

export default Transactions;
