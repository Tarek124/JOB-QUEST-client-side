import Swal from "sweetalert2";

export default function useSwal() {
  const swalErr = (text) => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
    });
  };
  const swalSuccess = (text) => {
    return Swal.fire({
      icon: "success",
      text,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return { swalErr, swalSuccess };
}
