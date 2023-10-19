import styles from "@/styles/styles"
import { useRouter } from "next/navigation"

interface Props {
    categoriesData: any
    setDropDown: any
}

const DropDown = ({ categoriesData, setDropDown }: Props) => {

  const router = useRouter()

  const submitHandle = (i: any) => {
    router.push(`/products?category=${i.title}`);
    setDropDown(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="pb-4 w-[270px] bg-slate-50 top-[100px] absolute z-30 rounded-b-md shadow-sm">
    {categoriesData && categoriesData.map((i: any, index: number) => (
        <div
          key={index}
          className={`${styles.noramlFlex}`}
          onClick={() => submitHandle(i)}
        >
          <img
            src={i.image_Url}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
            alt=""
          />
          <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
        </div>
      ))}
  </div>
  )
}

export default DropDown
