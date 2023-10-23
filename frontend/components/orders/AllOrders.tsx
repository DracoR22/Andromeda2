'use client'

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { getAllOrdersOfShop } from "@/redux/actions/order";
import Link from "next/link"
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import CatLoader from "../loaders/CatLoader";

const AllOrders = () => {

    const { orders, isLoading } = useSelector((state: any) => state.order);
    const { seller } = useSelector((state: any) => state.seller);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);
  
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
                  <AiOutlineArrowRight size={20}/>
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row: any = [];
  
    orders &&
      orders.forEach((item: any) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: "US$ " + item.totalPrice,
          status: item.status,
        });
      });

  return (
    <>
    {isLoading ? (
      <CatLoader/>
    ) : (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
        />
      </div>
    )}
  </>
  )
}

export default AllOrders
