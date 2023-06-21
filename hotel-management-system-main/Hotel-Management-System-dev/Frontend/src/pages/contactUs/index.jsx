import React from 'react'
import Swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import '../../styles/view.css'

import ContactUsService from '../../services/contactus.service';

export default function ContactUs() {

    //contact us schema
    const ContactUsSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        subject: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
    });

    async function handleContactUsSubmit(values) {
        console.log(values);

        const contactUsData = {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
        }

        ContactUsService.addContactUs(contactUsData)
            .then((response) => {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your message has been sent successfully!',
                }).then((result) => {
                    window.location.href = '/';
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
    }

    return (
        <>
            <br />
            <div className="contactUs">
                <h1>Contact Us</h1>

                <div className="contForm">
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
                            message: '',
                        }}

                        validationSchema={ContactUsSchema}

                        onSubmit={(values) => {
                            handleContactUsSubmit(values)
                        }}

                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.name}</div>

                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.email}</div>

                                    <label htmlFor="subject">Subject</label>
                                    <Field name="subject" type="text" className={'form-control' + (errors.subject && touched.subject ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.subject}</div>

                                    <label htmlFor="message">Message</label>
                                    <Field name="message" type="text" className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')} />
                                    <div className="invalid-feedback">{errors.message}</div>

                                    <br />
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>

                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>


            </div>
            <br />
        </>
    )
}
