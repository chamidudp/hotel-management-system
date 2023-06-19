import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2';

import '../../styles/dashboard.css'

import contactUsService from '../../services/contactUs.service';

export default function AdminMessages() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        contactUsService.getAllContactUs().then(response => {
            setMessages(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    async function handleDelete(id) {
        //ask from user
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this message!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await contactUsService.deleteContactUs(id).then(
                    response => {
                        if (response.status === 204) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Message has been deleted.',
                            })

                                .then(() => {
                                    contactUsService.getAllContactUs().then(response => {
                                        setMessages(response.data);
                                    }).catch(error => {
                                        console.log(error);
                                    })
                                })
                        }
                    },
                    error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                )
            }
        })
    }

    return (
        <>
            <div className="dashContainerNorm">
                <h1>Messages</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {messages.map((message, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{message.name}</td>
                                <td>{message.email}</td>
                                <td>{message.subject}</td>
                                <td>{message.message}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(message.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <br /><br /><br /><br /><br />
        </>
    )
}
