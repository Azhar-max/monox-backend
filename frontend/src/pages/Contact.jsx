import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { language, t } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };

  const getText = (key) => {
    const texts = {
      contactUs: { en: 'Contact Us', it: 'Contattaci' },
      getInTouch: { en: 'Get In Touch', it: 'Mettiti in Contatto' },
      contactText: { 
        en: 'We\'d love to hear from you! Reach out with any questions or inquiries.', 
        it: 'Ci piacerebbe sentirti! Contattaci per qualsiasi domanda o richiesta.'
      },
      
      // Contact info
      email: { en: 'Email', it: 'Email' },
      phone: { en: 'Phone', it: 'Telefono' },
      phoneText: { en: 'Available on request', it: 'Disponibile su richiesta' },
      location: { en: 'Location', it: 'Posizione' },
      locationText1: { en: 'Reggio Emilia, Italy', it: 'Reggio Emilia, Italia' },
      locationText2: { 
        en: 'Fresh flower delivery available in province only', 
        it: 'Consegna di fiori freschi disponibile solo in provincia'
      },
      businessHours: { en: 'Business Hours', it: 'Orari di Lavoro' },
      mondayFriday: { en: 'Monday-Friday: 9:00 AM - 6:00 PM', it: 'Lunedì-Venerdì: 9:00 - 18:00' },
      saturday: { en: 'Saturday: 10:00 AM - 4:00 PM', it: 'Sabato: 10:00 - 16:00' },
      sunday: { en: 'Sunday: Closed', it: 'Domenica: Chiuso' },
      
      // Social media
      followUs: { en: 'Follow Us', it: 'Seguici' },
      
      // Form
      sendMessage: { en: 'Send us a Message', it: 'Inviaci un Messaggio' },
      thankYou: { 
        en: 'Thank you for your message! We\'ll get back to you soon.', 
        it: 'Grazie per il tuo messaggio! Ti risponderemo presto.'
      },
      name: { en: 'Name', it: 'Nome' },
      nameLabel: { en: 'Your name', it: 'Il tuo nome' },
      emailAddress: { en: 'Email', it: 'Indirizzo Email' },
      emailPlaceholder: { en: 'your.email@example.com', it: 'tuo.email@esempio.com' },
      subject: { en: 'Subject', it: 'Oggetto' },
      subjectLabel: { en: 'How can we help?', it: 'Come possiamo aiutarti?' },
      message: { en: 'Message', it: 'Messaggio' },
      messagePlaceholder: { 
        en: 'Your message...', 
        it: 'Il tuo messaggio...'
      },
      send: { en: 'Send Message', it: 'Invia Messaggio' },
      sending: { en: 'Sending...', it: 'Invio in corso...' }
    };
    return texts[key][language];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2 text-manox-fuchsia">{getText('contactUs')}</h1>
      <p className="text-gray-600 mb-8">{getText('contactText')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{getText('getInTouch')}</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-manox-fuchsia text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{getText('email')}</h3>
                <p className="text-gray-600">giftboxitaly@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-manox-fuchsia text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{getText('phone')}</h3>
                <p className="text-gray-600">{getText('phoneText')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-manox-fuchsia text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{getText('location')}</h3>
                <p className="text-gray-600">{getText('locationText1')}</p>
                <p className="text-gray-600">{getText('locationText2')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-manox-fuchsia text-white p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{getText('businessHours')}</h3>
                <p className="text-gray-600">{getText('mondayFriday')}</p>
                <p className="text-gray-600">{getText('saturday')}</p>
                <p className="text-gray-600">{getText('sunday')}</p>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Our Location</h3>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500">Google Maps integration will be available after deployment</p>
                <p className="text-sm text-gray-400 mt-1">Reggio Emilia, Italy</p>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">{getText('followUs')}</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/manox._b" target="_blank" rel="noopener noreferrer" className="bg-manox-fuchsia text-white p-3 rounded-full hover:bg-manox-blue transition duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://tiktok.com/@MANOX" target="_blank" rel="noopener noreferrer" className="bg-manox-fuchsia text-white p-3 rounded-full hover:bg-manox-blue transition duration-300">
                <span className="sr-only">TikTok</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{getText('sendMessage')}</h2>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>{getText('thankYou')}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{getText('name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                placeholder={getText('nameLabel')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{getText('emailAddress')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                placeholder={getText('emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">{getText('subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                placeholder={getText('subjectLabel')}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">{getText('message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-manox-fuchsia"
                placeholder={getText('messagePlaceholder')}
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-manox-fuchsia hover:bg-manox-blue'
              }`}
            >
              {isSubmitting ? getText('sending') : getText('send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}