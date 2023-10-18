'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Button from "../ui/Button";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import CatLoader from "../loaders/CatLoader";
import { DataGrid } from "@mui/x-data-grid";
import { deleteEvent, getAllEventsShop } from "@/redux/actions/event";

const AllEvents = () => {

  const { events, isLoading } = useSelector((state: any) => state.events)
  const { seller } = useSelector((state: any) => state.seller)

  const dispatch = useDispatch()

  // GET ALL EVENTS PRODUCTS
  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  // DELETE EVENT
  const handleDelete = (id: any) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  }

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
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row: any = [];

  events && events.forEach((item: any) => {
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
    {isLoading ? (
      <CatLoader />
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

export default AllEvents
