import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" onClick={closeMenu}>YASH</Link>
            </div>

            <button className="hamburger" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`links ${isOpen ? 'open' : ''}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/projects" onClick={closeMenu}>Projects</Link>
                <Link to="/blog" onClick={closeMenu}>Blog</Link>
                <Link to="/playground" onClick={closeMenu}>Playground</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
