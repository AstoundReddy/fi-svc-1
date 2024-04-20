import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddAndDate from "../../components/AddAndDate";
import Graphs from "./Graphs";
import { categoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";
function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
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
    <div className="">
      <div className="flex flex-row w-full justify-center">
        <AddAndDate fetchCategories={getCategories} categories={categories} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </div>
      <div>
        <Graphs categories={categories} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}

export default HomePage;
