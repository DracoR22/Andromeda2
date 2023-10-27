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
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import Image from "next/image"

// CONECT TO SOCKET SERVER
const ENDPOINT = "http://localhost:4000/"
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]})

const DashboardMessages = () => {

  // STATES
  const { seller, isLoading } = useSelector((state: any) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  // CONNECT SOCKET
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        //@ts-ignore
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    //@ts-ignore
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

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

  // ACTIVE STATUS
  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
      setOnlineUsers(data);
      });
    }
  }, [seller]);

    const onlineCheck = (chat: any) => {
    const chatMembers = chat.members.find((member: any) => member !== seller?._id);
    const online = onlineUsers.find((user: any) => user.userId === chatMembers);

    return online ? true : false;
  };

  // GET ALL MESSAGES
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`${server}/message/get-all-messages/${currentChat?._id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

   // CREATE NEW MESSAGE
   const sendMessageHandler = async (e: any) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member: any) => member.id !== seller._id);

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios.post(`${server}/message/create-new-message`, message)
          .then((res) => {setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE LAST MESSAGE
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {/* ALL MESSAGES LIST */}
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-semibold">All Messages</h1>
           {conversations && conversations.map((item, i) => (
             <MessageList data={item} key={i} index={i} setOpen={setOpen} setCurrentChat={setCurrentChat}
             me={seller._id} setUserData={setUserData} isLoading={isLoading} online={onlineCheck(item)}
             setActiveStatus={setActiveStatus}/>
           ))}
        </>
      )}

      {/* SELLER INBOX */}
      {open && (
        <>
          <SellerInbox setOpen={setOpen} newMessage={newMessage} setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler} messages={messages} sellerId={seller._id}
          userData={userData} activeStatus={activeStatus}/>
        </>
      )}
    </div>
  )
}

interface MessageListProps {
  data: any
  index: number
  setOpen: any
  setCurrentChat: any
  me: any
  setUserData: any
  isLoading: any
  online: any
  setActiveStatus: any
}

// SEE THE CONVERSATIONS THAT HAVE THE SELLER
const MessageList = ({ data, index, setOpen, setCurrentChat, me, setUserData, isLoading, online, setActiveStatus }: MessageListProps) => {

  const [active, setActive] = useState(0);
  const [user, setUser] = useState<any>([]);

  const router = useRouter()

  // NAVIGATE TO CONVERSATION ID
  const handleClick = (id: any) => {
    router.push(`?${id}`)
    setOpen(true)
  }

  // GET THE OTHER USER INFORMATION, REMEMBER THIS PAGE IS ONLY FOR SELLERS
  useEffect(() => {
    const userId = data.members.find((user: any) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);


  return (
    <div className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"}  cursor-pointer`}
    onClick={(e) =>
      //@ts-ignore
      setActive(index) ||
      handleClick(data._id) ||
      setCurrentChat(data) ||
      setUserData(user) ||
      setActiveStatus(online)
    }>
    <div className="relative">
      <img src={`${user?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full oject-cover" />
      {online ? (
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
      ) : (
        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
      )}
    </div>
    <div className="pl-3">
      <h1 className="text-[18px] font-semibold">{user?.name}</h1>
      <p className="text-sm text-neutral-600">
        {!isLoading && data?.lastMessageId !== user?._id
          ? "You:"
          : `${user?.name}:`}{" "}
        {data?.lastMessage}
      </p>
    </div>
  </div>
  )
}

interface SellerInboxProps {
  setOpen: any
  newMessage: any
  setNewMessage: any
  sendMessageHandler: (arg0: any) => void
  messages: any
  sellerId: string
  userData: any
  activeStatus: any
}

const SellerInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId, userData, activeStatus }: SellerInboxProps) => {

  return (
    <div className="w-full min-h-full flex flex-col justify-between">
    {/* message header */}
    <div className="w-full flex p-3 items-center justify-between border-b">
      <div className="flex">
        <img src={`${userData?.avatar?.url}`} alt="" className="w-[60px] h-[60px] rounded-full" />
        <div className="pl-3">
          <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
         
          <h1 className="text-sm text-neutral-600">{activeStatus ? "Active Now" : "Innactive"}</h1>
        </div>
      </div>
      <AiOutlineArrowRight size={20} className="cursor-pointer" onClick={() => setOpen(false)}
       />
    </div>

    {/* messages */}
    <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
      {messages && messages.map((item: any, index: number) => {
          return (
            <div className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`} key={index}
              // ref={scrollRef}
              >
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
                  <div className={`w-max p-2 px-4 rounded-2xl font-[400] ${item.sender === sellerId ? "bg-emerald-700" : "bg-neutral-800"} text-[#fff]`}>
                    <p>{item.text}</p>
                  </div>

                  <p className="text-xs text-[#000000d3] pt-1">
                  {format(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>

    {/* SEND MESSAGE INPUT */}
    <form
      aria-required={true}
      className="p-3 relative w-full flex justify-between items-center"
      onSubmit={sendMessageHandler}
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
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={`${styles.input} ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-[#25D366]`}
        />
        <input type="submit" value="Send" className="hidden" id="send" />
        <label htmlFor="send">
          <AiOutlineSend size={20} className="absolute right-5 top-[23px] cursor-pointer"/>
        </label>
      </div>
    </form>
  </div>
  )
}

export default DashboardMessages
