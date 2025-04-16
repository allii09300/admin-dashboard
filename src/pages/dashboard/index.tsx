import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const { token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className={styles.DashboardContainer}>
      <h1>Wellcome to dashboard</h1>
      <h3>your Token:{token}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
