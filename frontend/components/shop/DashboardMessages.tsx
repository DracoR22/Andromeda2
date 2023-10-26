'use client'

import styles from "@/styles/styles";
import { server } from "@/utils/server";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { TfiGallery } from "react-icons/tfi"
import { BiImageAdd } from "react-icons/bi";


const DashboardMessages = () => {

  const { seller,isLoading } = useSelector((state: any) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

   // GET SELLER CONVERSATIONS
  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(`${server}/conversation/get-all-conversation-seller/${seller?._id}`, { withCredentials: true }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [seller, messages]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {/* ALL MESSAGES LIST */}
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-semibold">All Messages</h1>
           {conversations && conversations.map((item, i) => (
             <MessageList data={item} key={i} index={i} setOpen={setOpen}/>
           ))}
        </>
      )}

      {/* SELLER INBOX */}
      {open && (
        <>
          <SellerInbox setOpen={setOpen}/>
        </>
      )}
    </div>
  )
}

interface MessageListProps {
  data: any
  index: number
  setOpen: any
}

const MessageList = ({ data, index, setOpen }: MessageListProps) => {

  const [active, setActive] = useState(0);

  const router = useRouter()

  const handleClick = (id: any) => {
    router.push(`?${id}`)
    setOpen(true)
  }

  return (
    <div className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"}  cursor-pointer`}
    onClick={(e) =>
      //@ts-ignore
      setActive(index) ||
      handleClick(data._id)
      // setCurrentChat(data) ||
      // setUserData(user) ||
      // setActiveStatus(online)
    }>
    <div className="relative">
      fwefwewe
      {/* <img
        src={`${user?.avatar?.url}`}
        alt=""
        className="w-[50px] h-[50px] rounded-full"
      /> */}
      {/* {online ? (
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
      ) : (
        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
      )} */}
    </div>
    {/* <div className="pl-3">
      <h1 className="text-[18px]">{user?.name}</h1>
      <p className="text-[16px] text-[#000c]">
        {!isLoading && data?.lastMessageId !== user?._id
          ? "You:"
          : user?.name.split(" ")[0] + ": "}{" "}
        {data?.lastMessage}
      </p>
    </div> */}
  </div>
  )
}

interface SellerInboxProps {
  setOpen: any
}

const SellerInbox = ({ setOpen }: SellerInboxProps) => {

  return (
    <div className="w-full min-h-full flex flex-col justify-between">
    {/* message header */}
    <div className="w-full flex p-3 items-center justify-between bg-neutral-100">
      <div className="flex">
        {/* <img src={`${userData?.avatar?.url}`} alt="" className="w-[60px] h-[60px] rounded-full" /> */}
        user image(delete)
        <div className="pl-3">
          {/* <h1 className="text-[18px] font-[600]">{userData?.name}</h1> */}
          username (delete)
          {/* <h1>{activeStatus ? "Active Now" : ""}</h1> */}
          Acive now
        </div>
      </div>
      <AiOutlineArrowRight size={20} className="cursor-pointer" onClick={() => setOpen(false)}
       />
    </div>

    {/* messages */}
    <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
      {/* {messages && messages.map((item, index) => {
          return (
            <div className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`}
              ref={scrollRef}>
              {item.sender !== sellerId && (
                <img src={`${userData?.avatar?.url}`} className="w-[40px] h-[40px] rounded-full mr-3" alt=""/>
              )}
              {item.images && (
                <img
                  src={`${item.images?.url}`}
                  className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                />
              )}
              {item.text !== "" && (
                <div>
                  <div
                    className={`w-max p-2 rounded ${
                      item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                    } text-[#fff] h-min`}
                  >
                    <p>{item.text}</p>
                  </div>

                  <p className="text-[12px] text-[#000000d3] pt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          );
        })} */}
    </div>

    {/* send message input */}
    <form
      aria-required={true}
      className="p-3 relative w-full flex justify-between items-center"
      // onSubmit={sendMessageHandler}
    >
      <div className="w-[30px]">
        <input
          type="file"
          name=""
          id="image"
          className="hidden "
          // onChange={handleImageUpload}
        />
        <label htmlFor="image">
          <BiImageAdd className="cursor-pointer" size={25} />
        </label>
      </div>
      <div className="w-full">
        <input
          type="text"
          required
          placeholder="Enter your message..."
          // value={newMessage}
          // onChange={(e) => setNewMessage(e.target.value)}
          className={`${styles.input}`}
        />
        <input type="submit" value="Send" className="hidden" id="send" />
        <label htmlFor="send">
          <AiOutlineSend size={20} className="absolute right-4 top-5 cursor-pointer"/>
        </label>
      </div>
    </form>
  </div>
  )
}

export default DashboardMessages
