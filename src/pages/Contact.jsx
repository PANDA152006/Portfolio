import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Send, MapPin } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

const Contact = () => {
    const [formData, setFormData] = useState({
        message: ''
    });
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create WhatsApp message with form data
        const whatsappLink = `https://wa.me/919560341235?text=${encodeURIComponent(formData.message)}`;
        window.open(whatsappLink, '_blank');
    };

    const socialLinks = [
        {
            name: 'WhatsApp',
            icon: WhatsAppIcon,
            url: 'https://wa.me/919560341235',
            color: '#25D366'
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:yashduttsharma8@gmail.com',
            color: '#ea4335'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/PANDA152006',
            color: '#ffffff'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/yourusername', // Replace with your LinkedIn
            color: '#0077b5'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            url: 'https://www.instagram.com/the_camera._.guy',
            color: '#e4405f'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="page contact" style={{ padding: '120px 20px 60px' }}>
            <motion.div
                style={{ maxWidth: '1000px', margin: '0 auto' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.h2
                    variants={itemVariants}
                    style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    style={{
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '4rem',
                        maxWidth: '600px',
                        margin: '0 auto 4rem'
                    }}
                >
                    Have a project in mind or just want to chat? Send me a message on WhatsApp!
                </motion.p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Contact Form */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>
                            Send a WhatsApp Message
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Fill out the form below and we'll connect on WhatsApp
                        </p>



                        {/* Message Input */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.95rem',
                                color: 'var(--text-secondary)'
                            }}>
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '0.9rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: '#25D366',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <WhatsAppIcon size={20} color="white" />
                            Send via WhatsApp
                        </motion.button>
                    </motion.form>

                    {/* Contact Info & Social Links */}
                    <motion.div variants={itemVariants}>
                        {/* Direct Contact */}
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                                Contact Info
                            </h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: 'rgba(37, 211, 102, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <WhatsAppIcon size={24} color="#25D366" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem 0' }}>WhatsApp</p>
                                    <a
                                        href="https://wa.me/919560341235"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontSize: '1.05rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        +91 9560341235
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: 'rgba(234, 67, 53, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={24} color="#ea4335" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem 0' }}>Email</p>
                                    <a
                                        href="mailto:yashduttsharma8@gmail.com"
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            fontSize: '1.05rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        yashduttsharma8@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <MapPin size={24} color="var(--accent-color)" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem 0' }}>Location</p>
                                    <p style={{ color: 'white', margin: 0, fontSize: '1.05rem', fontWeight: '500' }}>
                                        Dehradun, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                                Connect With Me
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -3 }}
                                        onHoverStart={() => setHoveredSocial(social.name)}
                                        onHoverEnd={() => setHoveredSocial(null)}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            padding: '1.5rem',
                                            background: hoveredSocial === social.name
                                                ? `linear-gradient(135deg, ${social.color}22 0%, rgba(255,255,255,0.05) 100%)`
                                                : 'rgba(255,255,255,0.05)',
                                            borderRadius: '12px',
                                            border: `1px solid ${hoveredSocial === social.name ? social.color : 'rgba(255,255,255,0.1)'}`,
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <social.icon
                                            size={32}
                                            color={hoveredSocial === social.name ? social.color : 'white'}
                                            style={{ transition: 'color 0.3s ease' }}
                                        />
                                        <span style={{
                                            color: hoveredSocial === social.name ? social.color : 'white',
                                            fontSize: '0.95rem',
                                            fontWeight: '600',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            {social.name}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
