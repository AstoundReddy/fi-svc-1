import Modal from "react-modal";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { categoryApi } from "../../api/categoryApi";
import Loading from "../../assets/loading2svg.svg";
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
      toast.success("Category added successfully");
      setName("");
      onClose();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name?.length > 0;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Category"
        className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        overlayClassName="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        {isLoading && (
          <div className="flex justify-center items-center">
            <img src={Loading} className="w-12" alt="Loading" />
          </div>
        )}
        <div className="mt-2">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0"
            required
          />

          <div className="mt-4">
            <button
              onClick={addCategory}
              disabled={!isFormValid}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
