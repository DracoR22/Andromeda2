'use client'

import { getAllOrdersOfAdmin } from "@/redux/actions/order";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatLoader from "../loaders/CatLoader";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "@/styles/styles";
import { MdBorderClear } from "react-icons/md";
import Link from "next/link"
import { DataGrid } from "@mui/x-data-grid";
import { getAllSellers } from "@/redux/actions/seller";

const AdminDashboardMain = () => {

    const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector((state: any) => state.order);
  const { sellers } = useSelector((state: any) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

   const adminEarning = adminOrders && adminOrders.reduce((acc: number, item: any) => acc + item.totalPrice * .10, 0);


   const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params: any) => {
        return params.value === "Delivered"
          ? "greenColor"
          : "redColor";
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
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row: any = [];
  adminOrders &&
  adminOrders.forEach((item: any) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc: number, item: any) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });

  return (
    <>
      {
      adminOrderLoading ? (
        <CatLoader />
      ) : (
        <div className="w-full p-4">
        <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
        <div className="w-full block 800px:flex items-center justify-between">
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                Total Earning
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$ {adminBalance}</h5>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Sellers
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
            <Link href="/admin/sellers">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
            </Link>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
            <Link href="/admin/orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
        </div>
  
        <br />
        <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
          />
        </div>
      </div>
      )
    }
    </>
  )
}

export default AdminDashboardMain
