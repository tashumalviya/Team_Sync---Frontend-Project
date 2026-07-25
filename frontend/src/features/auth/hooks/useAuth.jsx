import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee } from "../state/auth/authAction";
import { axiosInstance } from "../../../config/axiosInstance";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Register
  const onRegisterSubmit = async (data) => {
    try {
      const registerData = {
        name: data.fullname,
        email: data.email,
        password: data.password,
        role: "employee",
      };

      const res = await axiosInstance.post("/auth/register", registerData);

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  // Login
  const onLoginSubmit = (data) => {
    dispatch(loginEmployee(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    onRegisterSubmit,
    onLoginSubmit,
    navigate,
  };
};