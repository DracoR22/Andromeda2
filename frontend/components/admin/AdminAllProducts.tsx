'use client'

import { server } from "@/utils/server";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

const AdminAllProducts = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {setData(res.data.products);})
    }, []);
  
    const columns = [
      { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 180,
        flex: 1.4,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 100,
        flex: 0.6,
      },
      {
        field: "Stock",
        headerName: "Stock",
        type: "number",
        minWidth: 80,
        flex: 0.5,
      },
  
      {
        field: "sold",
        headerName: "Sold out",
        type: "number",
        minWidth: 130,
        flex: 0.6,
      },
      {
        field: "Preview",
        flex: 0.8,
        minWidth: 100,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params: any) => {
          return (
            <>
              <Link href={`/product/${params.id}`}>
                <Button>
                  <AiOutlineEye size={20} />
                </Button>
              </Link>
            </>
          );
        },
      },
    ];
  
    const row: any = [];
  
    data &&
    data.forEach((item: any) => {
        row.push({
          id: item._id,
          name: item.name,
          price: "US$ " + item.discountPrice,
          Stock: item.stock,
          sold: item?.sold_out,
        });
      });
  

  return (
    <>
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
          />
        </div>
    </>
  )
}

export default AdminAllProducts
