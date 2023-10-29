'use client'

import { getAllOrdersOfAdmin } from "@/redux/actions/order";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminAllOrders = () => {

    const dispatch = useDispatch();

    const { adminOrders, adminOrderLoading } = useSelector((state: any) => state.order);
  
    useEffect(() => {
      dispatch(getAllOrdersOfAdmin());
    }, []);
  
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
    adminOrders && adminOrders.forEach((item: any) => {
        row.push({
          id: item._id,
          itemsQty: item?.cart?.reduce((acc: number, item: any) => acc + item.qty, 0),
          total: item?.totalPrice + " $",
          status: item?.status,
          createdAt: item?.createdAt.slice(0,10),
        });
      });

  return (
    <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
    <div className="w-[97%] flex justify-center">
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
      />
    </div>
  </div>
  )
}

export default AdminAllOrders
