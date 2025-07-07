import toast from "react-hot-toast";
const toastMessage = (type,messsage) => {
  switch (type) {
    case "success":
      return toast.success(messsage,{position:"top-right"});
    case "error":
      return toast.error(messsage,{position:"top-right"});

    default:
      break;
  }
};

export default toastMessage;