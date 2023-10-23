'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import styles from "@/styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import Link from "next/link"
import { getAllOrdersOfShop } from "@/redux/actions/order";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify";
import Image from "next/image"

interface OrderDetailsProps {
    id: string
}

const OrderDetails = ({ id }: OrderDetailsProps) => {

    const { orders, isLoading } = useSelector((state: any) => state.order);
    const { seller } = useSelector((state: any) => state.seller);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const router = useRouter()

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
      }, [dispatch]);
    
      const data = orders && orders.find((item: any) => item._id === id);
    
      const orderUpdateHandler = async (e: any) => {
        await axios.put(`${server}/order/update-order-status/${id}`, { status }, { withCredentials: true })
          .then((res) => {
            toast.success("Order updated!");
            router.push("/dashboard/orders");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      };
    
      const refundOrderUpdateHandler = async (e: any) => {
        await axios.put(`${server}/order/order-refund-success/${id}`, { status }, { withCredentials: true })
        .then((res) => {
          toast.success("Order updated!");
          dispatch(getAllOrdersOfShop(seller._id));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      }
    

  return (
    <div className={`py-4 min-h-screen ${styles.section} mx-10`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-semibold mt-1
          ">Order Details</h1>
        </div>
        <Link href="/dashboard/orders">
          <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data && data?.cart.map((item: any, index: number) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <Image
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px] object-cover" width={100} height={100}
            />
            <div className="w-full">
              <h5 className="pl-3 font-semibold">{item.name}</h5>
              <h5 className="pl-3 text-[#00000091] text-sm">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-sm">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-neutral-600">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-neutral-600 ">{data?.shippingAddress.country}</h4>
          <h4 className="text-neutral-600 ">{data?.shippingAddress.city}</h4>
          <h4 className="text-neutral-600">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
           <h4 className="text-neutral-600 ">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Processing",
            "Transferred to delivery partner",
            "Shipping",
            "Received",
            "On the way",
            "Delivered",
          ]
            .slice(
              [
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            "Processing refund",
            "Refund Success",
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  )
}

export default OrderDetails
