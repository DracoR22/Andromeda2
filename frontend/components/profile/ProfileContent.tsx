import styles from "@/styles/styles"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";
import { deleteUserAddress, loadUser, updatUserAddress, updateUserInformation } from "@/redux/actions/user";
import { toast } from "react-toastify"
import axios from "axios";
import { server } from "@/utils/server";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city"
import { getAllOrdersOfUser } from "@/redux/actions/order";

interface Props {
    active: any
}

const ProfileContent = ({ active }: Props) => {

    const { user, error, successMessage } = useSelector((state: any) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState<any>(null);
    const dispatch = useDispatch();

    
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  // UPLOAD IMAGE
  const handleImage = async (e: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios.put(`${server}/user/update-avatar`, { avatar: reader.result }, { withCredentials: true })
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


    const handleSubmit = (e: any) => {
      e.preventDefault()
      dispatch(updateUserInformation(name, email, phoneNumber))
    }

  return (
    <div className="w-full">
    {/* profile */}
    {active === 1 && (
      <>
        <div className="flex justify-center w-full">
          {/* UPLOAD IMAGE */}
          <div className="relative">
            <Image
              src={`${user?.avatar?.url || "/profile.jpg"}`}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              alt="" width={1000} height={1000}
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full px-5">
          <form onSubmit={handleSubmit} aria-required={true}>
            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Full Name</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Email Address</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full 800px:flex block pb-3">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Phone Number</label>
                <input
                  type="number"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              
            </div>
            <input
              className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </form>
        </div>
      </>
    )}

    {/* order */}
    {active === 2 && (
      <div>
        <AllOrders />
      </div>
    )}

    {/* Refund */}
    {active === 3 && (
      <div>
        <AllRefundOrders />
      </div>
    )}

    {/* Track order */}
    {active === 5 && (
      <div>
        <TrackOrder />
      </div>
    )}

    {/* Change Password */}
    {active === 6 && (
      <div>
        <ChangePassword />
      </div>
    )}

    {/*  user Address */}
    {active === 7 && (
      <div>
        <Address />
      </div>
    )}

    {/*  Payment Methods */}
    {/* {active === 8 && (
      <div>
         <PaymentMethod/>
      </div>
    )} */}
  </div>
  )
}

const AllOrders = () => {
    const { user } = useSelector((state: any) => state.user);
    const { orders } = useSelector((state: any) => state.order);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id));
    }, []);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params: any) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";

        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params: any) => {
          return (
            <>
              <Link href={`/user/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row: any = [];
  
    orders && orders.forEach((item: any) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
      });
  
    return (
      <div className="px-8 pt-1 ">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight className="bg-white"
        />
      </div>
    );
  };
  
  const AllRefundOrders = () => {
    const { user } = useSelector((state: any) => state.user);
    const { orders } = useSelector((state: any) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id));
    }, []);
  
    const eligibleOrders = orders && orders.filter((item: any) => item.status === "Processing refund");
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params: any) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params: any) => {
          return (
            <>
              <Link href={`/user/order/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row: any = [];
  
    eligibleOrders && eligibleOrders.forEach((item: any) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
      });
  
    return (
      <div className="mx-8 pt-1 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
        />
      </div>
    );
  };
  
  const TrackOrder = () => {
    const { user } = useSelector((state: any) => state.user);
    const { orders } = useSelector((state: any) => state.order);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id));
    }, []);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 130,
        flex: 0.7,
        cellClassName: (params: any) => {
          return params.row.status === "Delivered" ? "greenColor" : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 130,
        flex: 0.7,
      },
  
      {
        field: "total",
        headerName: "Total",
        type: "number",
        minWidth: 130,
        flex: 0.8,
      },
  
      {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params: any) => {
          return (
            <>
              <Link href={`/user/track-order/${params.id}`}>
                <Button>
                  <MdTrackChanges size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row: any = [];
  
    orders && orders.forEach((item: any) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
      });
  
    return (
      <div className="mx-8 pt-1 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
        />
      </div>
    );
  };

  const PaymentMethod = () => {
    return (
      <div className="w-full px-5">
        <div className="flex w-full items-center justify-between">
           <h1 className="text-[25px] font-[600] pb-2">
            Payment Methods
           </h1>
           <div className={`${styles.button} rounded-md`}>
             <span className="text-white">Add new</span>
           </div>        
        </div>
        <br />
        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
          <div className="flex items-center">
            <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
            <h5 className="pl-5 font-[600]">Bryan Vega</h5>
          </div>
          <div className="pl-8 flex items-center">
             <h6>1234 **** *** ****</h6>
             <h5 className="pl-6">08/2022</h5>
          </div>
          <div className="min-w-[10%] flex items-center justify-between pl-8">
            <AiOutlineDelete size={25} className="cursor-pointer"/>
          </div>
        </div>
      </div>
    )
  }

  const Address: any = () => {

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState<any>();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit =  async (e: any) => {
    e.preventDefault()

    if(addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields")
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  }

  const handleDelete = (item: any) => {
    dispatch(deleteUserAddress(item._id))
  }

    return (
      <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)}/>
            </div>
            <h1 className="text-center font-semibold text-2xl">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country && Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State && State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e: any) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user && user.addresses.map((item: any, index: number) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-neutral-600">
          You do not have any saved addresses!
        </h5>
      )}
    </div>
    )
  }
  
  const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const passwordChangeHandler = async (e: any) => {
      e.preventDefault();
  
      await axios.put(`${server}/user/update-user-password`, { oldPassword, newPassword, confirmPassword }, { withCredentials: true })
        .then((res) => {
          toast.success("Your password has been updated");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    return (
      <div className="w-full px-5">
        <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
          Change Password
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            <div className=" w-[100%] 800px:w-[50%] mt-5">
              <label className="block pb-2">Enter your old password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2">Enter your new password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2">Enter your confirm password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

export default ProfileContent
