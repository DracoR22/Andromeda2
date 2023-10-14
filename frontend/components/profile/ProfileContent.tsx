import styles from "@/styles/styles"
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";

interface Props {
    active: any
}

const ProfileContent = ({ active }: Props) => {

    const { user, error, successMessage } = useSelector((state: any) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();

    const handleImage = () => {

    }

    const handleSubmit = () => {

    }

  return (
    <div className="w-full">
    {/* profile */}
    {active === 1 && (
      <>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img
              src={`${user?.avatar?.url || "/profile.jpg"}`}
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              alt=""
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

              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Enter your password</label>
                <input
                  type="password"
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
        {/* <ChangePassword /> */}
      </div>
    )}

    {/*  user Address */}
    {active === 7 && (
      <div>
        <Address />
      </div>
    )}

    {/*  Payment Methods */}
    {active === 8 && (
      <div>
         <PaymentMethod/>
      </div>
    )}
  </div>
  )
}

const AllOrders = () => {
    const { user } = useSelector((state: any) => state.user);
    // const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const orders = [
        {
            _id: "32434234oeortekt43ktl343",
            orderItems: [
                {
                    name: "Sapoooo"
                }
            ],
            totalPrice: 120,
            orderStatus: "Processing"
        }
    ]
  
    // useEffect(() => {
    //   dispatch(getAllOrdersOfUser(user._id));
    // }, []);
  
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
  
    orders && orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        });
      });
  
    return (
      <div className="pl-8 pt-1">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
        />
      </div>
    );
  };
  
  const AllRefundOrders = () => {
    const { user } = useSelector((state: any) => state.user);
    // const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const orders = [
      {
          _id: "32434234oeortekt43ktl343",
          orderItems: [
              {
                  name: "Sapoooo"
              }
          ],
          totalPrice: 120,
          orderStatus: "Processing"
      }
  ]
  
    // useEffect(() => {
    //   dispatch(getAllOrdersOfUser(user._id));
    // }, []);
  
    const eligibleOrders =
      orders && orders.filter((item) => item.orderStatus === "Processing refund");
  
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
  
    orders && orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        });
      });
  
    return (
      <div className="pl-8 pt-1">
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
    // const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const orders = [
      {
          _id: "32434234oeortekt43ktl343",
          orderItems: [
              {
                  name: "Sapoooo"
              }
          ],
          totalPrice: 120,
          orderStatus: "Processing"
      }
  ]
  
    // useEffect(() => {
    //   dispatch(getAllOrdersOfUser(user._id));
    // }, []);
  
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
              <Link href={`/user/track/order/${params.id}`}>
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
  
    orders && orders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.orderItems.length,
          total: "US$ " + item.totalPrice,
          status: item.orderStatus,
        });
      });
  
    return (
      <div className="pl-8 pt-1">
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

  const Address = () => {
    return (
      <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
         <h1 className="text-[25px] font-[600] pb-2">
            My Addresses
         </h1>
         <div className={`${styles.button} rounded-md`}>
           <span className="text-white">Add new</span>
         </div>        
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="pl-8 flex items-center">
           <h6>Address field</h6>
        </div>
        <div className="pl-8 flex items-center">
           <h6>Phone number field</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer"/>
        </div>
      </div>
    </div>
    )
  }
  
  // const ChangePassword = () => {
  //   const [oldPassword, setOldPassword] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  
  //   const passwordChangeHandler = async (e) => {
  //     e.preventDefault();
  
  //     await axios
  //       .put(
  //         `${server}/user/update-user-password`,
  //         { oldPassword, newPassword, confirmPassword },
  //         { withCredentials: true }
  //       )
  //       .then((res) => {
  //         toast.success(res.data.success);
  //         setOldPassword("");
  //         setNewPassword("");
  //         setConfirmPassword("");
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //       });
  //   };
  //   return (
  //     <div className="w-full px-5">
  //       <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
  //         Change Password
  //       </h1>
  //       <div className="w-full">
  //         <form
  //           aria-required
  //           onSubmit={passwordChangeHandler}
  //           className="flex flex-col items-center"
  //         >
  //           <div className=" w-[100%] 800px:w-[50%] mt-5">
  //             <label className="block pb-2">Enter your old password</label>
  //             <input
  //               type="password"
  //               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
  //               required
  //               value={oldPassword}
  //               onChange={(e) => setOldPassword(e.target.value)}
  //             />
  //           </div>
  //           <div className=" w-[100%] 800px:w-[50%] mt-2">
  //             <label className="block pb-2">Enter your new password</label>
  //             <input
  //               type="password"
  //               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
  //               required
  //               value={newPassword}
  //               onChange={(e) => setNewPassword(e.target.value)}
  //             />
  //           </div>
  //           <div className=" w-[100%] 800px:w-[50%] mt-2">
  //             <label className="block pb-2">Enter your confirm password</label>
  //             <input
  //               type="password"
  //               className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
  //               required
  //               value={confirmPassword}
  //               onChange={(e) => setConfirmPassword(e.target.value)}
  //             />
  //             <input
  //               className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
  //               required
  //               value="Update"
  //               type="submit"
  //             />
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

export default ProfileContent
