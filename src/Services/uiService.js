import Swal from 'sweetalert2'

const toast = ({icon = 'success', msg}) => {
    const toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });
    toast.fire({
        icon,
        title: msg
    })
}

export default { 
    toast
}