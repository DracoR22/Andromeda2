'use client'

import { loadSeller } from "@/redux/actions/user";
import styles from "@/styles/styles";
import { server } from "@/utils/server";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import Image from "next/image"
import Button from "../ui/Button";

const ShopSettings = () => {

    const { seller } = useSelector((state: any) => state.seller);
    const [avatar, setAvatar] = useState<any>();
    const [name, setName] = useState(seller && seller.name);
    const [description, setDescription] = useState(seller && seller.description ? seller.description : "");
    const [address, setAddress] = useState(seller && seller.address);
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
    const [zipCode, setZipcode] = useState(seller && seller.zipCode);

    const [isLoading, setIsLoading] = useState(false)
  
    const dispatch = useDispatch();
  
    // UPLOAD IMAGE
    const handleImage = async (e: any) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          axios.put(`${server}/shop/update-shop-avatar`, { avatar: reader.result }, { withCredentials: true })
            .then((res) => {
              dispatch(loadSeller());
              toast.success("Avatar updated successfully!");
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };
  
    const updateHandler = async (e: any) => {
      e.preventDefault();
      setIsLoading(true)
  
      await axios.put(`${server}/shop/update-seller-info`,
          {
            name,
            address,
            zipCode,
            phoneNumber,
            description,
          }, { withCredentials: true })
        .then((res) => {
          toast.success("Shop info updated succesfully!");
          dispatch(loadSeller());
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
  

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
    <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
      <div className="w-full flex items-center justify-center">
        {/* UPLOAD IMAGE */}
        <div className="relative">
          <Image src={avatar ? avatar : `${seller.avatar?.url}`} alt="" width={1000} height={1000}
           className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover"/>
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera/>
            </label>
          </div>
        </div>
      </div>

      {/* SHOP INFO */}
      <form className="flex flex-col items-center" onSubmit={updateHandler}>
        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2 font-semibold">Shop Name</label>
          </div>
          <input
            type="name"
            placeholder={`${seller.name}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>
        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2 font-semibold">Shop description</label>
          </div>
          <textarea
            placeholder={`${
              seller?.description
                ? seller.description
                : "Enter your shop description"
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
          />
        </div>
        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2 font-semibold">Shop Address</label>
          </div>
          <input
            type="name"
            placeholder={seller?.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2 font-semibold">Shop Phone Number</label>
          </div>
          <input
            type="number"
            placeholder={seller?.phoneNumber}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <div className="w-full pl-[3%]">
            <label className="block pb-2 font-semibold">Shop Zip Code</label>
          </div>
          <input
            type="number"
            placeholder={seller?.zipCode}
            value={zipCode}
            onChange={(e) => setZipcode(e.target.value)}
            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            required
          />
        </div>

        <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
          <Button isLoading={isLoading}
          className="bg-[#3bc177] hover:bg-[#399964] transition p-2 px-6 rounded-full text-white w-full flex justify-center">
            Update
          </Button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ShopSettings
