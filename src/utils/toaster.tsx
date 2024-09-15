import { ToastContainer, toast } from "react-toastify";

const toastMethods = {
  error: toast.error,
  success: toast.success,
  info: toast.info,
  warning: toast.warning,
};

export default function toastMsg(
  type: "error" | "success" | "info" | "warning",
  message: string,
  duration: number = 5000,
  position: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left" = "top-right"
) {
  if (toastMethods[type]) {
    toastMethods[type](message, {
      position: position,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    console.error(`Invalid toast type: ${type}`);
  }
}