'use client'

import { getAllOrdersOfShop } from "@/redux/actions/order";
import { getAllProductsShop } from "@/redux/actions/product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link"
import { Button } from "@mui/material";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "@/styles/styles";
import { MdBorderClear } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";

const DashboardMain = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector((state: any) => state.order);
    const { seller } = useSelector((state: any) => state.seller);
    const { products } = useSelector((state: any) => state.products);
  
    useEffect(() => {
       dispatch(getAllOrdersOfShop(seller._id));
       dispatch(getAllProductsShop(seller._id));
    }, [dispatch]);
  
    const availableBalance = seller?.availableBalance.toFixed(2);
  
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
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params: any) => {
          return (
            <>
              <Link href={`/order/${params.id}`}>
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
          itemsQty: item.cart.reduce((acc: number, item: any) => acc + item.qty, 0),
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
    });

  return (
    <div className="w-full p-8">
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
            Account Balance{" "}
            <span className="text-[16px]">(with 10% service charge)</span>
          </h3>
        </div>
        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance}</h5>
        <Link href="/dashboard/withdraw">
          <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
        </Link>
      </div>

      <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
        <div className="flex items-center">
          <MdBorderClear size={30} className="mr-2" fill="#00000085" />
          <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
            All Orders
          </h3>
        </div>
        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
        <Link href="/dashboard/orders">
          <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
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
            All Products
          </h3>
        </div>
        <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
        <Link href="/dashboard/products">
          <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
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

export default DashboardMain
