import React, { useState } from 'react';
import { submitContactMessage } from '../services/api';
import { SectionHeader } from '../components/SectionHeader';
import './Contact.css';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await submitContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <SectionHeader title="Get In Touch" bgText="CONTACT" subtitle="Have a project in mind? Let's talk." />

        <div style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem' }}>
          <a href="https://github.com/VASAVIGUPTHA777" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'underline' }}>
            GitHub: VASAVIGUPTHA777
          </a>
          <a href="https://www.linkedin.com/in/vasavi-vanaparthy/" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'underline' }}>
            LinkedIn: vasavi-vanaparthy
          </a>
          <a href="tel:+916302851862" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'underline' }}>
            Phone: +91 6302851862
          </a>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact__input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact__input"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="contact__input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="contact__input contact__textarea"
          />

          <button type="submit" disabled={status === 'loading'} className="btn btn--primary contact__btn">
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && <p className="contact__msg contact__msg--success">Message sent successfully!</p>}
          {status === 'error' && <p className="contact__msg contact__msg--error">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
};