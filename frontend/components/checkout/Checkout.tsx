'use client'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import styles from "@/styles/styles";
import { Country, State } from "country-state-city";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify";

const Checkout = () => {

    const { user } = useSelector((state: any) => state.user);
    const { cart } = useSelector((state: any) => state.cart);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [userInfo, setUserInfo] = useState(false);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState<any>(null);
    const router = useRouter()

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const paymentSubmit = () => {
      if(!user) {
        return toast.error("Please login to continue")
      }
        if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
           toast.error("Please choose your delivery address")
        } else {
            const shippingAddress = {
                address1,
                address2,
                zipCode,
                country,
                city,
            }
    
            const orderData = {
                cart,
                totalPrice,
                subTotalPrice,
                shipping,
                discountPrice,
                shippingAddress,
                user
            }
    
            // Updtate Local Storage
            localStorage.setItem("latestOrder", JSON.stringify(orderData))
            router.push("/payment")
        }
    }

    const subTotalPrice = cart.reduce((acc: number, item: any) => acc + item.qty * item.discountPrice, 0);
    // ADD 10% OF THE PRICE TO THE SHIPPING PRICE
    const shipping = subTotalPrice * 0.1;
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const name = couponCode

        await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
            const shopId = res.data.couponCode?.shopId;
            const couponCodeValue = res.data.couponCode?.value;
            if (res.data.couponCode !== null) {
              const isCouponValid =
                cart && cart.filter((item: any) => item.shopId === shopId);
      
              if (isCouponValid.length === 0) {
                toast.error("Coupon code is not valid for this shop");
                setCouponCode("");
              } else {
                const eligiblePrice = isCouponValid.reduce((acc: number, item: any) => acc + item.qty * item.discountPrice, 0);
                const discountPrice = (eligiblePrice * couponCodeValue) / 100;
                setDiscountPrice(discountPrice);
                setCouponCodeData(res.data.couponCode);
                setCouponCode("");
              }
            }
            if (res.data.couponCode === null) {
              toast.error("Coupon code doesn't exists!");
              setCouponCode("");
            }
          });
    }

    const discountPercentenge = couponCodeData ? discountPrice : "";

    const totalPrice = couponCodeData ? (subTotalPrice + shipping - discountPercentenge).toFixed(2) : (subTotalPrice + shipping).toFixed(2);
  
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
          <div className="w-full 800px:w-[65%]">
            <ShippingInfo user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}/>
          </div>
          <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData
             handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}/>
          </div>
      </div>
      <div className={`${styles.button} hover:bg-gray-900 transition w-[150px] 800px:w-[280px] mt-10`} onClick={paymentSubmit}>
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  )
}

interface ShippingInfoProps {
    user: any
    country: any
    setCountry: any
    city: any
    setCity: any
    userInfo: any
    setUserInfo: any
    address1: string
    setAddress1: any
    address2: string
    setAddress2: any
    zipCode: any
    setZipCode: any
}

const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    userInfo,
    setUserInfo,
    address1,
    setAddress1,
    address2,
    setAddress2,
    zipCode,
    setZipCode,
  }: ShippingInfoProps) => {
    return (
      <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
        <h5 className="text-xl font-semibold">Shipping Address</h5>
        <br />
        <form>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Full Name</label>
              <input
                type="text"
                value={user && user.name}
                required
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Email Address</label>
              <input
                type="email"
                value={user && user.email}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Phone Number</label>
              <input
                type="number"
                required
                value={user && user.phoneNumber}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Zip Code</label>
              <input
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your country
                </option>
                {Country && Country.getAllCountries().map((item: any) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">City</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your City
                </option>
                {State && State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2 font-semibold">Address1</label>
              <input
                type="address"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Address2</label>
              <input
                type="address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div></div>
        </form>
        <h5
          className="text-sm font-semibold text-gray-600 cursor-pointer inline-block"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose From saved address
        </h5>
        {userInfo && (
          <div>
            {user && user.addresses.map((item: any, index: number) => (
                <div className="w-full flex mt-1" key={index}>
                  <input
                    type="checkbox"
                    className="mr-3"
                    value={item.addressType}
                    onClick={() =>
                      setAddress1(item.address1) ||
                      setAddress2(item.address2) ||
                      setZipCode(item.zipCode) ||
                      setCountry(item.country) ||
                      setCity(item.city)
                    }
                  />
                  <h2>{item.addressType}</h2>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  interface CartDataProps {
    handleSubmit: any
    totalPrice: any
    shipping: any
    subTotalPrice: any
    couponCode: any
    setCouponCode: any
    discountPercentenge: any
  }

  const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    couponCode,
    setCouponCode,
    discountPercentenge,
  }: CartDataProps) => {
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">
            - {discountPercentenge ? "$" + discountPercentenge.toString().slice(0, 4) : null}
          </h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`${styles.input} h-[40px] pl-2`}
            placeholder="Coupoun code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
          <input
            className={`w-full h-[40px] border bg-[#f63b60] text-center text-white rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Apply code"
            type="submit"
          />
        </form>
      </div>
    );
  };
  

export default Checkout
