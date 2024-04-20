import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loading from "../assets/loading2svg.svg";
import { AuthContext } from "../context/AuthContext";
import { categoryApi } from "../api/categoryApi";
Modal.setAppElement("#root");

function AddCategoryModal({ isOpen, onClose, fetchCategories }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const addCategory = async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.addCategory(user?.userId, {
        name,
      });
      fetchCategories();
      onClose();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Category"
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add Category</h3>
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="mt-2">
          <label className=" self-center block mt-4">
            <div className=" flex space-x-2">
              <span className="font-semibold text-gray-700 self-center">Name</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
              required
            />
          </label>

          <div className="mt-4">
            <button onClick={addCategory} className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
