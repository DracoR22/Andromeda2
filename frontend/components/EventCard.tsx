import styles from "@/styles/styles"

interface Props {
  active?: boolean
}

const EventCard = ({ active }: Props) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className="text-lg font-semibold">
         Iphone 14 pro max
        </h2>
        <p className="text-sm text-neutral-600">
            fwfweffkefskfmskfmsfmd,.fmdf,.md,fmeieieeiieq
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-red-500 pr-3 line-through">
               12345678
            </h5>
            <h5 className="font-semibold text-[20px]">
                $645958902308342
            </h5>
          </div>
          <span className="text-sm pr-3 font-medium text-neutral-600">
            120 sold
          </span>
        </div>
        {/* <CountDown/> */}
      </div>
    </div>
  )
}

export default EventCard
