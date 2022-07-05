import React from 'react';
import Swal from 'sweetalert2'
import * as actions from '../../redux/actions/index';
import { useDispatch, } from 'react-redux';

const ipAPI = '//api.ipify.org?format=json'

const DeleteAlert = (deleteFunction, id) => {

    const dispatch = useDispatch();
    return Swal.queue([{
        title: 'Your public IP',
        confirmButtonText: 'Show my public IP',
        text:
            'Your public IP will be received ' +
            'via AJAX request',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return dispatch(actions.deleteDeck(id))
                // fetch(ipAPI)
                .then(response => response.json())
                .then(data => Swal.insertQueueStep(data.ip))
                .catch(() => {
                    Swal.insertQueueStep({
                        icon: 'error',
                        title: 'Unable to get your public IP'
                    })
                })
        }
    }])
}

export default DeleteAlert;