import Swal from 'sweetalert2'
import { toast as createToast } from "sonner"

let loading = null;

const loadingOption = Swal.mixin({
    title: 'Loading',
    didOpen: () => {
        Swal.showLoading()
    }
});

const toast = ({ type, msg }) => {
    if (type === 'success') {
        createToast.success(msg)

    } else if (type === 'error') {
        createToast.error(msg)

    } else {
        createToast(msg)

    }  
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