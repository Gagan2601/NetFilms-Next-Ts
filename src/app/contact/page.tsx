import React from 'react'
import ContactCard from '../components/ContactCard'
import styles from './contact.module.css';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Contact Us</h1>
        <ContactCard />
        <section className={styles.contact_section}>
          <h2>We love to hear <span>from you </span></h2>
          <ContactForm />
        </section>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m25!1m12!1m3!1d3556.6970172445954!2d75.78314722590382!3d26.944818076628007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m10!3e6!4m3!3m2!1d26.9448968!2d75.7857255!4m4!2s26.944778%2C75.785738!3m2!1d26.944778!2d75.785738!5e0!3m2!1sen!2sin!4v1699769573562!5m2!1sen!2sin" width={100} height={450} style={{ border: 0 }} allowFullScreen={true} className={styles.mapping} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </>
  )
}

export default Contact