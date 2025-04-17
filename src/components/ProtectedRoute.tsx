import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  if (!token) {
    navigate("./login");
  }

  return element;
};

export default ProtectedRoute;
