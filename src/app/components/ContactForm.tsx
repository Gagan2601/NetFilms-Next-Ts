'use client'
import styles from '@/app/contact/contact.module.css'
import { useState } from 'react';

interface User {
    username: string;
    email: string;
    phone: string;
    message: string;
}

const ContactForm = () => {
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        phone: "",
        message: ""
    })
    const [status, setStatus] = useState("");


    const handleChange = (e: { target: { name: string, value: string } }) => {
        const name: string = e.target.name;
        const value: string = e.target.value;

        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            })
            if (response.status === 200) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form className={styles.contact_form} onSubmit={handleSubmit}>
            <div className={styles.input_field}>
                <label htmlFor="username" className={styles.label}>
                    Enter your name
                    <input type='text' name='username' id='username' placeholder='Enter your name' value={user.username}
                        onChange={handleChange}
                        required />
                </label>
            </div>
            <div className={styles.input_field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                    <input type='text' name='email' id='email' placeholder='Enter your email' value={user.email}
                        onChange={handleChange} autoComplete="off"
                        required />
                </label>
            </div>
            <div className={styles.input_field}>
                <label htmlFor="phone" className={styles.label}>
                    Contact No.
                    <input type='text' name='phone' id='phone' placeholder='Enter your phone' value={user.phone}
                        onChange={handleChange} autoComplete="off"
                        required />
                </label>
            </div>
            <div className={styles.input_field}>
                <label htmlFor="message" className={styles.label}>
                    Message
                    <textarea name='message' rows={5} id='message' placeholder='Enter your message' value={user.message}
                        onChange={handleChange} autoComplete="off"
                        required />
                </label>
            </div>
            <div>
                {status === 'success' && <p className={styles.success_msg}>Thank you for your message!</p>}
                {status === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}
                <button type='submit'>Send Message</button>
            </div>
        </form>
    )
}

export default ContactForm