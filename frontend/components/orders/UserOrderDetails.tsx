'use client'

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { getAllOrdersOfUser } from "@/redux/actions/order";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify"
import styles from "@/styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Link from "next/link"
import Image from "next/image"

interface UserOrderDetailsProps {
    id: string
}

const UserOrderDetails = ({ id }: UserOrderDetailsProps) => {

  const { orders } = useSelector((state: any) => state.order);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<any>(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rating, setRating] = useState<any>(1);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch,user._id]);

  const data = orders && orders.find((item: any) => item._id === id);

  const reviewHandler = async (e: any) => {
    await axios.put(`${server}/product/create-new-review`, {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`,{
      status: "Processing refund"
    }).then((res) => {
       toast.success(res.data.message);
    dispatch(getAllOrdersOfUser(user._id));
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-semibold mt-1">Order Details</h1>
        </div>
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
      {data && data?.cart.map((item: any, index: number) => {
          return(
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
            {!item.isReviewed && data?.status === "Delivered" ?  <div
                className={`${styles.button} text-[#fff]`}
                // @ts-ignore
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div> : (
             null
            )}
          </div>
          )
         })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div className={`${styles.button} text-white text-[20px] ml-3`}
            // @ts-ignore
            onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

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
          <h4 className="pt-3  text-neutral-600">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-neutral-600">{data?.shippingAddress.country}</h4>
          <h4 className="text-neutral-600">{data?.shippingAddress.city}</h4>
          <h4 className="text-neutral-600">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4 className="text-neutral-600">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          <br />
           {
            data?.status === "Delivered" && (
              <div className={`${styles.button} text-white`}
              onClick={refundHandler}
              >Give a Refund</div>
            )
           }
        </div>
      </div>
      <br />
      <Link href="/">
        <div className={`${styles.button} hover:bg-gray-900 transition text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>
  )
}

export default UserOrderDetails
