import Swal from 'sweetalert2'

let loading = null;

const loadingOption = Swal.mixin({
    title: 'Loading',
    didOpen: () => {
        Swal.showLoading()
    }
});

const toast = ({ icon = 'success', msg }) => {
    const toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
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

const showLoading = () => {
    if (!loading)  {
        loading = loadingOption
        loading.fire()
    }
}

const dismissLoading = () => {
    if (loading)  {
        loading.close()
        loading = null
    }
}

export default {
    toast,
    showLoading,
    dismissLoading,
}