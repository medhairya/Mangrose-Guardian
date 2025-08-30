import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ReportForm.css';

const ReportForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    severity: 'medium'
  });
  
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [gpsCoordinates, setGpsCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Try to extract GPS coordinates from photo metadata
      extractGPSFromPhoto(file);
    }
  };

  const extractGPSFromPhoto = (file) => {
    // In a real app, you would use a library like exif-js to extract GPS data
    // For now, we'll simulate this process
    console.log('Extracting GPS data from photo...');
    
    // Simulate GPS extraction delay
    setTimeout(() => {
      // Mock GPS coordinates - in real app, this would come from photo metadata
      const mockCoordinates = {
        latitude: 12.9716 + (Math.random() - 0.5) * 0.1, // Random coordinates around a sample location
        longitude: 77.5946 + (Math.random() - 0.5) * 0.1,
        accuracy: Math.floor(Math.random() * 10) + 5 // 5-15 meters accuracy
      };
      
      setGpsCoordinates(mockCoordinates);
      setFormData(prev => ({
        ...prev,
        location: `${mockCoordinates.latitude.toFixed(6)}, ${mockCoordinates.longitude.toFixed(6)}`
      }));
    }, 1000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setGpsCoordinates(coords);
          setFormData(prev => ({
            ...prev,
            location: `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`
          }));
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location. Please enter coordinates manually.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!photo) {
      setError('Please upload a photo');
      return;
    }

    if (!formData.location) {
      setError('Please provide location coordinates');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create report object
      const report = {
        id: Date.now().toString(),
        userId: user.id,
        username: user.username,
        timestamp: new Date().toISOString(),
        description: formData.description,
        location: formData.location,
        gpsCoordinates: gpsCoordinates,
        severity: formData.severity,
        photo: photo.name,
        status: 'pending'
      };

      // In a real app, you would send this to your backend API
      console.log('Submitting report:', report);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo purposes
      const existingReports = JSON.parse(localStorage.getItem('mangroveReports') || '[]');
      existingReports.push(report);
      localStorage.setItem('mangroveReports', JSON.stringify(existingReports));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      description: '',
      location: '',
      severity: 'medium'
    });
    setPhoto(null);
    setPhotoPreview(null);
    setGpsCoordinates(null);
    setError('');
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (success) {
    return (
      <div className="report-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>Report Submitted Successfully!</h2>
          <p>Your mangrove cutting report has been logged and will be reviewed by our team.</p>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <h1>Report Mangrove Cutting Incident</h1>
        <p>Help us track and prevent mangrove destruction by reporting incidents</p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-section">
          <h3>📸 Photo Evidence</h3>
          <div className="photo-upload-area">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="photo-input"
            />
            <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="photo-preview" />
              ) : (
                <div className="upload-text">
                  <div className="upload-icon">📷</div>
                  <p>Click to upload photo</p>
                  <p className="upload-hint">Upload a clear photo of the mangrove cutting incident</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>📍 Location Information</h3>
          <div className="location-controls">
            <button 
              type="button" 
              onClick={getCurrentLocation}
              className="location-btn"
              disabled={loading}
            >
              {loading ? 'Getting Location...' : '📍 Get Current Location'}
            </button>
            <p className="location-hint">Or enter coordinates manually below</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">GPS Coordinates</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., 12.9716, 77.5946"
              required
            />
          </div>

          {gpsCoordinates && (
            <div className="gps-info">
              <h4>GPS Data Extracted:</h4>
              <div className="gps-details">
                <span>Latitude: {gpsCoordinates.latitude.toFixed(6)}</span>
                <span>Longitude: {gpsCoordinates.longitude.toFixed(6)}</span>
                <span>Accuracy: ±{gpsCoordinates.accuracy}m</span>
              </div>
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>📝 Incident Details</h3>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what you observed (e.g., number of trees cut, tools used, etc.)"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity Level</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
            >
              <option value="low">Low - Few trees affected</option>
              <option value="medium">Medium - Moderate damage</option>
              <option value="high">High - Extensive damage</option>
              <option value="critical">Critical - Large scale destruction</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={resetForm} className="reset-btn">
            Reset Form
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
