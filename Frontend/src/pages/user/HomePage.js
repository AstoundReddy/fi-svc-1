import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Graphs from "./Graphs";
import { categoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";
import Filters from "../../components/Filters";
import TransactionsTable from "../../components/TransactionsTable";
import Loading from "../../assets/loading2svg.svg";
function HomePage({ index }) {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

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
    <div className="bg-gray-900 pt-4 h-full">
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={Loading} className="w-12" alt="loading" />
        </div>
      )}
      <Filters index={index} setTransactions={setTransactions} getCategories={getCategories} categories={categories} />

      {index === 0 ? (
        <div>
          <Graphs transactions={transactions} categories={categories} />
        </div>
      ) : (
        <div>
          <TransactionsTable transactions={transactions} categories={categories} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
