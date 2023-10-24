'use client'

import { getAllOrdersOfUser } from "@/redux/actions/order";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  id: string
}

const TrackOrder = ({ id }: Props) => {

    const { orders } = useSelector((state: any) => state.order);
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);
  
    const data = orders && orders.find((item: any) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
    {" "}
    <>
      {data && data?.status === "Processing" ? (
        <h1 className="text-neutral-600">Your Order is processing in shop.</h1>
      ) : data?.status === "Transfered to delivery partner" ? (
        <h1 className="text-neutral-600">
          Your order is on the way for delivery partner.
        </h1>
      ) : data?.status === "Shipping" ? (
        <h1 className="text-neutral-600">
          Your order is on the way with our delivery partner.
        </h1>
      ) : data?.status === "Received" ? (
        <h1 className="text-neutral-600">
          Your order is in your city. Our Delivery man will deliver it.
        </h1>
      ) : data?.status === "On the way" ? (
        <h1 className="text-neutral-600">
          Our Delivery man is going to deliver your order.
        </h1>
      ) : data?.status === "Delivered" ? (
        <h1 className="text-neutral-600">Your order is delivered!</h1>
      ) : data?.status === "Processing refund" ? (
        <h1 className="text-neutral-600">Your refund request has been sent to the shop</h1>
      ) : data?.status === "Refund Success" ? (
        <h1 className="text-neutral-600">Your refund request has been accepted by the shop!</h1>
      ) : null}
    </>
  </div>
  )
}

export default TrackOrder
