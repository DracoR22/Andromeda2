'use client'

import { createProduct } from "@/redux/actions/product"
import { categoriesData } from "@/static/data"
import { server } from "@/utils/server"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

interface Props {
    seller: any
}

const CreateProduct = ({ seller }: Props) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [images, setImages] = useState<any>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState<any>();
  const [discountPrice, setDiscountPrice] = useState<any>();
  const [stock, setStock] = useState<any>();

  const { isLoading, success, error } = useSelector((state: any) => state.products)

  //Upload Images
  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old: any) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Submit Form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const newForm = new FormData();

    images.forEach((image: any) => {
      newForm.set("images", image);
    });
    await axios.post(`${server}/product/create-product`, {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images,
  }, { withCredentials: true })

  toast.success("Product Created!")
   router.push("/dashboard")
   router.refresh()
    } catch (error: any) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
        <h5 className="text-[30px] font-semibold text-center">Create Product</h5>
          {/* CREATE PRODUCT FORM */}
          <form onSubmit={handleSubmit}>
        <br />
        <div>
            {/* NAME */}
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
            {/* DESCRIPTION */}
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea required name="description" value={description} className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)} placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
            {/* CATEGORIES */}
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
            {/* TAGS */}
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
            {/* PRICE */}
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
            {/* DISCOUNT PRICE */}
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
            {/* PRODUCTS IN STOCK */}
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
            {/* PRODUCT IMAGES */}
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3 cursor-pointer" color="#555" />
            </label>
            {images && images.map((i: any) => (
                <img src={i} key={i} alt="" className="h-[120px] w-[120px] object-cover m-2"/>
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
