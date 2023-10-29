import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface Props {
    children: React.ReactNode
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const { loading, isAuthenticated, user } = useSelector((state: any) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      redirect("/login");
    } else if(user.role !== "Admin"){
        redirect("/");;
    }
    return children;
  }
};

export default ProtectedAdminRoute;