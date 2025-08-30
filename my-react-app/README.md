# 🌿 Mangrove Watch - User Reporting App

A React-based web application that allows local users to report mangrove cutting incidents with photo evidence and GPS coordinates.

## ✨ Features

### 🔐 User Authentication
- **Login/Signup System**: Users can create accounts using username, phone number, and password
- **Secure Authentication**: Protected routes and user session management
- **User Dashboard**: Personalized dashboard showing user information and statistics

### 📸 Incident Reporting
- **Photo Upload**: Users can upload photos of mangrove cutting incidents
- **GPS Coordinates**: Automatic extraction from photo metadata or manual input
- **Location Services**: Get current location using browser geolocation
- **Incident Details**: Description and severity level classification
- **Auto-timestamping**: Reports are automatically timestamped

### 🗺️ GPS & Location Features
- **Photo Metadata Extraction**: Attempts to extract GPS data from uploaded photos
- **Manual Coordinate Input**: Users can enter coordinates manually
- **Current Location**: One-click location detection using device GPS
- **Accuracy Information**: Shows GPS accuracy and coordinate details

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Beautiful Interface**: Modern gradient design with smooth animations
- **Intuitive Navigation**: Easy-to-use navigation and form interfaces
- **Real-time Feedback**: Loading states, success messages, and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the app

### Build for Production
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Login.jsx       # User login form
│   ├── SignUp.jsx      # User registration form
│   ├── Dashboard.jsx   # User dashboard
│   ├── ReportForm.jsx  # Incident reporting form
│   ├── Navbar.jsx      # Navigation component
│   └── *.css           # Component-specific styles
├── contexts/            # React contexts
│   └── AuthContext.jsx # Authentication state management
├── App.jsx             # Main application component
├── App.css             # Global application styles
├── index.css           # Base styles and resets
└── main.jsx            # Application entry point
```

## 🔧 Technical Details

### Frontend Technologies
- **React 19**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **CSS3**: Custom styling with gradients, animations, and responsive design
- **Local Storage**: Client-side data persistence for demo purposes

### Key Features Implementation
- **Photo Upload**: File input with preview and validation
- **GPS Extraction**: Simulated GPS data extraction from photos
- **Geolocation API**: Browser-based location services
- **Form Validation**: Client-side validation with error handling
- **State Management**: React Context for authentication state

### Data Flow
1. User uploads photo → GPS extraction attempted
2. Location data collected (GPS or manual input)
3. Incident details filled out
4. Report submitted and stored locally
5. Success confirmation and redirect

## 📱 Usage Guide

### For Users

1. **Create Account**: Sign up with username, phone, and password
2. **Login**: Access your personalized dashboard
3. **Report Incident**: Click "Report Incident" to submit a new report
4. **Upload Photo**: Select a photo of the mangrove cutting
5. **Set Location**: Use GPS or enter coordinates manually
6. **Add Details**: Describe the incident and set severity level
7. **Submit**: Complete the report submission

### Features Available
- ✅ User registration and authentication
- ✅ Photo upload with preview
- ✅ GPS coordinate extraction and manual input
- ✅ Current location detection
- ✅ Incident description and severity classification
- ✅ Automatic timestamping
- ✅ Report submission and storage
- ✅ Responsive design for all devices

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real API endpoints
- **Database Storage**: Persistent data storage
- **Photo Analysis**: AI-powered mangrove detection
- **Real-time Updates**: Live incident tracking
- **Admin Panel**: Management interface for authorities
- **Mobile App**: Native mobile application
- **Offline Support**: Work without internet connection
- **Map Integration**: Interactive map visualization

## 🛠️ Development

### Adding New Features
1. Create new component in `src/components/`
2. Add corresponding CSS file
3. Update routing in `App.jsx` if needed
4. Test responsiveness and functionality

### Styling Guidelines
- Use CSS custom properties for consistent theming
- Follow mobile-first responsive design
- Maintain accessibility standards
- Use smooth transitions and hover effects

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for mangrove conservation**
