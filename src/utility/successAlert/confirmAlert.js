import Swal from 'sweetalert2'

export const showConfirmAlert = (title, subtitle, callBack, cancelCallBack) => {
    return Swal.fire({
        title: title,
        html: subtitle,
        icon: '',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        // confirmButtonColor: "#850037",
        confirmButtonClass: 'confirmAlert',
        // cancelButtonColor: 'rgb(214, 38, 46)',
        cancelButtonClass: 'cancelAlert',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        
        if (result.value) {
            callBack();
        } else if (result.dismiss) {
            // cancelCallBack();
        }
    })
}