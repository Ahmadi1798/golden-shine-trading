import ContactForm from '../Contact/ContactForm';

const Contact = ({ content = {}, siteSettings = null }) => (
	<ContactForm content={content} siteSettings={siteSettings} />
);

export default Contact;
