import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { UploadCloud, FileText, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearMedicine, setMedicine } from "../redux/Medicine/medicineDetailSlice.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButtons from "../components/LoadingButton.jsx";

export default function AddMedicine() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const medicineDetails = useSelector((state) => state.addmedicine.value);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const categories = [
        "Painkiller",
        "Antibiotic",
        "Muscle Relaxant",
        "Diabetes",
        "Acid Reducer",
        "Heart",
        "Anti-inflammatory",
        "Supplement",
        "Epilepsy/Anxiety",
    ];

     useEffect(()=>{
        const token = localStorage.getItem("adminToken");
    
        if (!token) {
          navigate("/admin/login");
        }

        dispatch(clearMedicine());
      }, []);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 5) {
            setErrors((prev) => ({ ...prev, image: "File size exceeds 5MB" }));
            setImage(null);
            return;
        }
        setErrors((prev) => ({ ...prev, image: "" }));
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!medicineDetails.name) newErrors.name = "Medicine name is required";
        if (!medicineDetails.description)
            newErrors.description = "Description is required";
        if (!medicineDetails.category)
            newErrors.category = "Category is required";
        if (!medicineDetails.price) newErrors.price = "Price is required";
        if (!image) newErrors.image = "Please select an image";
        if (medicineDetails.price <= 0) newErrors.price = "Price must be greater than 0";
        if(!/^\d*$/.test(medicineDetails.price)) newErrors.price = "Price must be a valid number";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const formData = new FormData();
        formData.append("name", medicineDetails.name);
        formData.append("description", medicineDetails.description);
        formData.append("category", medicineDetails.category);
        formData.append("price", medicineDetails.price);
        formData.append("image", image);
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/medicine/add`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` },
                body: formData,
            });
            setIsLoading(false);
            if (!response.ok) {
                toast.error("Failed to add medicine");
            }

            const result = await response.json();
            if (result.success) {
                setImage(null);
                dispatch(clearMedicine());
                toast.success(result.message)
                setTimeout(() => {
                    navigate("/admin");
                }, 2000);
            } else {
                toast.error(result.message || "Failed to add medicine");
                if(response.status === 401) {
                    localStorage.removeItem("adminToken");
                    navigate("/admin/login");
                }
            }
        } catch (error) {
            toast.error(result.message || "Failed to add medicine");
        }

    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-100 to-green-100 p-6">
            <NavbarAdmin />
            <ToastContainer />
            <div className="bg-gradient-to-br from-gray-100 to-green-100 p-4 flex justify-center items-start">
                <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6 text-center">
                        Add New Medicine
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Medicine Name */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm flex items-center gap-1">
                                <FileText size={14} /> Medicine Name*
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter medicine name"
                                value={medicineDetails.name}
                                onChange={(e) =>
                                    dispatch(
                                        setMedicine({ key: "name", value: e.target.value })
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm flex items-center gap-1">
                                <UploadCloud size={14} /> Upload Image*
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg"
                                onChange={handleUploadImage}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer text-sm"
                            />
                            {errors.image && (
                                <div className="text-red-500 text-xs mt-1">{errors.image}</div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm flex items-center gap-1">
                                <FileText size={14} /> Description*
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter description"
                                value={medicineDetails.description}
                                onChange={(e) =>
                                    dispatch(
                                        setMedicine({ key: "description", value: e.target.value })
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                                rows={3}
                            />
                            {errors.description && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm flex items-center gap-1">
                                <Tag size={14} /> Category*
                            </label>
                            <select
                                name="category"
                                value={medicineDetails.category}
                                onChange={(e) =>
                                    dispatch(
                                        setMedicine({ key: "category", value: e.target.value })
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.category}
                                </div>
                            )}
                        </div>

                        {/* Medicine Price */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm flex items-center gap-1">
                                <FileText size={14} /> Medicine Price* (per quantity)
                            </label>
                            <input
                                type="text"
                                name="price"
                                placeholder="Enter medicine price"
                                value={medicineDetails.price}
                                onChange={(e) =>
                                    dispatch(
                                        setMedicine({ key: "price", value: e.target.value })
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                            />
                            {errors.price && (
                                <div className="text-red-500 text-xs mt-1">{errors.price}</div>
                            )}
                        </div>

                        {/* Submit Button */}
                        {!isLoading && (
                            <button
                                type="submit"
                                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base"
                            >
                                Add Medicine
                            </button>
                        )}
                        {isLoading && <LoadingButtons text="Adding" />}
                    </form>
                </div>
            </div>
        </div>
    );
}
