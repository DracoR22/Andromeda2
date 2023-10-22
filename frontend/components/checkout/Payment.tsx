'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const Payment = () => {

const [orderData, setOrderData] = useState([]);
const [open, setOpen] = useState(false);
const { user } = useSelector((state: any) => state.user);

useEffect(() => {
 const orderData = localStorage.getItem("latestOrder");
  if (orderData) {
    setOrderData(JSON.parse(orderData));
  }
}, [])

  return (
    <div className="w-full flex flex-col items-center py-8">
    <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
      <div className="w-full 800px:w-[65%]">
        {/* <PaymentInfo
          user={user}
          open={open}
          setOpen={setOpen}
          onApprove={onApprove}
          createOrder={createOrder}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
        /> */}
      </div>
      <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
        <CartData orderData={orderData} />
      </div>
    </div>
  </div>
  )
}

interface CartDataProps {
    orderData: any
}

const CartData = ({ orderData }: CartDataProps) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          ${orderData?.totalPrice}
        </h5>
        <br />
      </div>
    );
  };

export default Payment
