import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2';

import '../../styles/dashboard.css'

import customerService from '../../services/customer.service';

export default function AdminCustomers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customerService.getAllCustomers().then(response => {
            setCustomers(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    async function handleDelete(id) {
        //ask from user
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this customer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await customerService.deleteCustomer(id).then(
                    response => {
                        if (response.status === 204) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Customer has been deleted.',
                            })
                                .then(() => {
                                    customerService.getAllCustomers().then(response => {
                                        setCustomers(response.data);
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
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>NIC</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.password}</td>
                                <td>{customer.nic}</td>
                                <td>{customer.address}</td>
                                <td><Button variant="danger" onClick={() => {
                                    handleDelete(customer.id)
                                }}>Delete</Button>{' '}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <br /><br /><br /><br /><br />
        </>
    )
}
