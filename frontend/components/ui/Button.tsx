import { BiLoaderAlt } from "react-icons/bi";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({ isLoading, children, ...props }: Props) => {
  return (
    <button disabled={isLoading} {...props}>
      {isLoading ? <BiLoaderAlt className="h-5 w-5 animate-spin " /> : children}
    </button>
  );
};

export default Button;