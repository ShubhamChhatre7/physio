import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, User, Settings, UserCircle } from 'lucide-react';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll";
import supabase from './SupabaseClient';
import Logo from './Logo.png';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogin, onLogout, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
    setShowUserMenu(false);
    setFullName('');
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserFullName = async () => {
      if (isLoggedIn && userProfile?.email) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('users')
            .select('full_name')
            .eq('email', userProfile.email)
            .single();
  
          if (data?.full_name) {
            setFullName(data.full_name);
          } else {
            setFullName(userProfile.email.split('@')[0]);
          }
        } catch (err) {
          console.error('Error fetching full name:', err);
          setFullName(userProfile.email.split('@')[0]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
  
    fetchUserFullName();
  }, [isLoggedIn, userProfile]);

  const renderNavLink = (to, text) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={to}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="nav-link"
          onClick={closeMenu}
        >
          {text}
        </ScrollLink>
      );
    }
    return (
      <RouterLink to={`/#${to}`} className="nav-link" onClick={closeMenu}>
        {text}
      </RouterLink>
    );
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <RouterLink to="/" className="logo" onClick={closeMenu}>
          <img src={Logo} alt="PhysioHealth Logo" className="logo-image" />
        </RouterLink>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>{renderNavLink("home", "Home")}</li>
            <li>{renderNavLink("about", "About Us")}</li>
            <li>{renderNavLink("services", "Services")}</li>
            <li>{renderNavLink("appointment", "Book Now")}</li>
            <li>{renderNavLink("contact", "Contact")}</li>
            <li>{renderNavLink("faq", "FAQs")}</li>
            <li>
              <RouterLink to="/media" className="nav-link" onClick={closeMenu}>
                Media
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/blog" className="nav-link" onClick={closeMenu}>
                Blog
              </RouterLink>
            </li>
          </ul>

          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="user-avatar">
                  <UserCircle />
                </div>
                <span className="username">
                  {isLoading ? "Loading..." : fullName}
                </span>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <RouterLink to="/profile" className="dropdown-item" onClick={closeMenu}>
                      <User />
                      <span>Profile</span>
                    </RouterLink>
                    <RouterLink to="/settings" className="dropdown-item" onClick={closeMenu}>
                      <Settings />
                      <span>Settings</span>
                    </RouterLink>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <LogOut />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-button" onClick={onLogin}>
                <LogIn />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;