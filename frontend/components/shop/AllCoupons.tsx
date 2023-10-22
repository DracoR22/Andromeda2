'use client'

import  Button  from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CatLoader from "../loaders/CatLoader";
import styles from "@/styles/styles";
import { DataGrid } from "@mui/x-data-grid";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify";
import { getAllProductsShop } from "@/redux/actions/product";

const AllCoupons = () => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [minAmount, setMinAmout] = useState<any>(null);
    const [maxAmount, setMaxAmount] = useState<any>(null);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [value, setValue] = useState<any>(null);
    

    const { seller } = useSelector((state: any) => state.seller);
    const { products } = useSelector((state: any) => state.products);
  
    const dispatch = useDispatch();

  // GET ALL SHOP PRODUCTS
  useEffect(() => {
    setIsLoading(true)
    dispatch(getAllProductsShop(seller._id));
    axios.get(`${server}/coupon/get-coupon/${seller._id}`, { withCredentials: true })
    .then((res) => {setIsLoading(false); setCoupons(res.data.couponCodes)})
    .catch((error) => {setIsLoading(false)});
  }, [dispatch]);


  const handleDelete = async (id: any) => {
    await axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
    window.location.reload();
    toast.success("Coupon code created!")
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    try {
        setIsLoading(true)
        await axios.post(`${server}/coupon/create-coupon-code`, {
            name,
            minAmount,
            maxAmount,
            selectedProducts,
            value,
            shopId: seller._id
        }, { withCredentials: true })
        toast.success("Coupon code created!")
        setOpen(false)
        window.location.reload();
    } catch (error) {
       toast.error("Something went wrong!")
    } finally {
        setIsLoading(false)
    }
  }

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
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

  coupons && coupons.forEach((item: any) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });


  return (
    <>
    {isLoading ? (
      <CatLoader/>
    ) : (
      <div className="w-full mx-8 pt-1 mt-4 bg-white">
        <div className="w-full flex justify-end">
          <div
            className={`${styles.button} hover:bg-gray-900 transition !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
            onClick={() => setOpen(true)}
          >
            <span className="text-white">Create Coupon Code</span>
          </div>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          autoHeight
        />
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
              <div className="w-full flex justify-end">
                <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)}/>
              </div>
              
              {/* create coupoun code */}
              <form onSubmit={handleSubmit} aria-required={true}>
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your coupon code name..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Discount Percentenge{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={value}
                    required
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your coupon code value..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Min Amount</label>
                  <input
                    type="number"
                    name="value"
                    value={minAmount}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setMinAmout(e.target.value)}
                    placeholder="Enter your coupon code min amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Max Amount</label>
                  <input
                    type="number"
                    name="value"
                    value={maxAmount}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Enter your coupon code max amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Selected Product</label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={selectedProducts} onChange={(e) => setSelectedProducts(e.target.value)} >
                    <option value="Choose your selected products">
                      Choose a selected product
                    </option>
                    {products && products.map((i: any) => (
                        <option value={i.name} key={i.name}>
                           {i.name.length > 20 ? i.name.slice(0, 20) + "..." : i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
                  <Button isLoading={isLoading}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border cursor-pointer bg-[#3bc177] hover:bg-[#379461] transition rounded-full text-white sm:text-sm">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )}
  </>
  )
}

export default AllCoupons
