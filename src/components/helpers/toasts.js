import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const handleError = (error) => {
  return toast.error(error, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const handleSuccess = (success) =>
  toast.success(success, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
