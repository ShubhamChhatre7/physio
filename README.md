# Physiophy - Physiotherapy Center Website

A modern, responsive website for a physiotherapy center built with React + Vite, featuring smooth animations and an intuitive user interface.

## Features

- 🏥 Modern and responsive design
- 🌊 Smooth page transitions and animations
- 📱 Mobile-friendly navigation
- 🔄 Smooth scroll functionality
- 🎨 Interactive UI elements
- 📑 Multiple page sections (Home, About, Services, etc.)

## Tech Stack

- React + Vite
- Framer Motion (animations)
- Lucide React (icons)
- React Scroll (smooth scrolling)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Physiophy
```

2. Install the base dependencies:
```bash
npm install
```

3. Install required packages:
```bash
# Navigation and smooth scrolling
npm install react-scroll

# Animations
npm install framer-motion

# Icons
npm install  
```

## Project Structure

```
Physiophy/
└── src/
    ├── App.css
    ├── App.jsx
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── About.css
    │   ├── About.jsx
    │   ├── Appointment.css
    │   ├── Appointment.jsx
    │   ├── Auth.css
    │   ├── Contact.css
    │   ├── Contact.jsx
    │   ├── FAQ.css
    │   ├── FAQ.jsx
    │   ├── Home.jsx
    │   ├── Logo.png
    │   ├── Navbar.css
    │   ├── Navbar.jsx
    │   ├── Services.css
    │   ├── Services.jsx
    │   ├── SignIn.jsx
    │   └── SignUp.jsx
    ├── index.css
    └── main.jsx

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

## Component Features

### Navbar
- Responsive navigation menu
- Smooth scroll functionality
- Mobile hamburger menu
- Logo integration
- Scroll-based styling changes

### Home Page
- Hero section
- Service highlights
- Call-to-action buttons
- Feature cards

### About Page
- Team member profiles
- Mission and vision statements
- Company history
- Interactive cards with animations

### Services Page
- Heading added
- Services Details Added

### Appotment Booking Page
- Interactive date selection:

- Shows next 14 available days (excluding weekends)
- Clear visual feedback for selected dates
  
## Time slot selection:
- Multiple time slots throughout the day
- Morning and afternoon availability
- Visual feedback for selected time
  
## Patient details form:
- Full name
- Email address
- Phone number
- Problem description
- Success message

### Contact Page
- Contact Form
- Catchy heading
- Attractive design

### Sign In Page 
- Email and password fields
- Remember me option
- Forgot password link
- Link to sign up page
- Form validation
- Loading states

### Sign Up Page 
- Full name, email, phone fields
- Password and confirm password
- Terms & conditions checkbox
- Link to sign in page
- Comprehensive form validation

### FAQ Page 
- A prominent header with title and description
- Six common physiotherapy-related FAQs
- Expandable/collapsible answers
- A footer with contact information
- Smooth animations and transitions
- A professional, medical-appropriate color scheme


## Styling

The project uses CSS variables for consistent theming:

```css
:root {
  --primary-green: #98D8AA;
  --dark-green: #2C5530;
  --light-green: #E3F2E7;
  --white: #ffffff;
}
```

## Animation Features

The project uses Framer Motion for animations:
- Page transitions
- Scroll-based animations
- Hover effects
- Interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact
[Shubham Chhatre] 📧 ShubhamChhatre20@gmail.com
