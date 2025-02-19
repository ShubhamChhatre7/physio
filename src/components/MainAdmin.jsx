import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Camera,
  Pointer,
  User,
  Menu,
  X,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MainAdmin.css';

// ✅ Ensure correct imports
import Home from './Home';
import AdminPanel from './AdminPanel';
import Testimonials from './Testimonials';
import MediaUpload from './MediaUpload';
import AdminAppointment from './AdminAppointment';
import Doctors from './Doctors';
import AdminInstructions from './AdminInstructions';

function MainAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Instructions'); // Store only one active tab at a time
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'Instructions', icon: <LayoutDashboard size={20} />, label: 'Instructions', component: <AdminInstructions/> },
    { id: 'Users', icon: <User size={20} />, label: 'User', component: <AdminPanel /> },
    { id: 'Testimonial', icon: <Users size={20} />, label: 'Testimonial', component: <Testimonials /> },
    { id: 'Media Upload', icon: <Camera size={20} />, label: 'Media Upload', component: <MediaUpload /> },
    { id: 'Appointments', icon: <Pointer size={20} />, label: 'Appointments', component: <AdminAppointment /> },
    { id: 'Doctors Section', icon: <GraduationCap size={20} />, label: 'Doctors Section', component: <Doctors /> }
  ];

  const toggleTab = (id) => {
    setActiveTab(id); // Set only one active tab
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_email"); // Remove admin session
    navigate("/#Home"); // Redirect to sign-in page
  };

  return (
    <div className="zd-dental-dashboard">
      <div className="zd-app-container">
        <button
          className="zd-sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside className={`zd-sidebar ${isSidebarOpen ? 'zd-open' : ''}`}>
          <div className="zd-sidebar-content">
            <nav className="zd-nav-menu">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleTab(item.id)}
                  className={`zd-nav-item ${activeTab === item.id ? 'zd-active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button onClick={handleLogout} className="zd-logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="zd-main-content">
          <header className="zd-header">
            <div className="zd-header-content">
              <h1>{activeTab}</h1>
            </div>
          </header>

          <main className="zd-content">
            {sidebarItems.map((item) =>
              item.id === activeTab ? (
                <div key={item.id} className="zd-component">
                  {item.component}
                </div>
              ) : null
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainAdmin;
