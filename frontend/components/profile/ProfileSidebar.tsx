import Link from "next/link"
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook, TbCreditCard } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useRouter, redirect } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "@/utils/server";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

interface Props {
    active: any
    setActive: any
}

const ProfileSidebar = ({ active, setActive }: Props) => {

  const router = useRouter()
  const {user} = useSelector((state: any) => state.user);

  const logoutHandler = async () => {
   await axios.get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        router.push("/")
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      await signOut()
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(1)}
    >
      <RxPerson size={20} color={active === 1 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 1 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Profile
      </span>
    </div>
    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(2)}
    >
      <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 2 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Orders
      </span>
    </div>
    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(3)}
    >
      <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 3 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Refunds
      </span>
    </div>

    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(4) || router.push("/inbox")}
    >
      <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 4 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Inbox
      </span>
    </div>

    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(5)}
    >
      <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 5 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Track Order
      </span>
    </div>

    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(6)}
    >
      <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 6 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Change Password
      </span>
    </div>

    <div
      className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={() => setActive(7)}
    >
      <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 7 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Address
      </span>
    </div>

    {user && user?.role === "Admin" && (
      <Link href="/admin/dashboard">
        <div
          className="flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
          onClick={() => setActive(8)}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            color={active === 9 ? "red" : ""}
          />
          <span
            className={`pl-3 ${
              active === 9 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Admin Dashboard
          </span>
        </div>
      </Link>
    )}
    <div
      className="single_item flex items-center cursor-pointer w-full mb-8 hover:text-[red] transition"
      onClick={logoutHandler}
    >
      <AiOutlineLogin size={20} color={active === 10 ? "red" : ""} />
      <span
        className={`pl-3 ${
          active === 10 ? "text-[red]" : ""
        } 800px:block hidden`}
      >
        Log out
      </span>
    </div>
  </div>
  )
}

export default ProfileSidebar
