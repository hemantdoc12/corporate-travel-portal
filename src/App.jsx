import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import inventoryService from './services/inventoryService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('travelUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('travelUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    localStorage.removeItem('travelUser');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content container">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="var(--elite-primary)" />
              <path d="M20 12L24 18L30 20L26 26L28 32L20 28L12 32L14 26L8 20L14 18L20 12Z" fill="var(--elite-accent)" />
            </svg>
            <h1 className="logo-text">TravelPortal</h1>
          </div>
          <nav className="main-nav">
            <button 
              className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`} 
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-button ${activeTab === 'bookings' ? 'active' : ''}`} 
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button 
              className={`nav-button ${activeTab === 'policies' ? 'active' : ''}`} 
              onClick={() => setActiveTab('policies')}
            >
              Policies
            </button>
            <button 
              className={`nav-button ${activeTab === 'reports' ? 'active' : ''}`} 
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button 
              className={`nav-button ${activeTab === 'subscriptions' ? 'active' : ''}`} 
              onClick={() => setActiveTab('subscriptions')}
            >
              Subscriptions
            </button>
            <button 
              className={`nav-button ${activeTab === 'inventory' ? 'active' : ''}`} 
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
          </nav>
          <div className="user-actions">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'bookings' && <Bookings user={user} />}
          {activeTab === 'policies' && <Policies />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'subscriptions' && <Subscriptions />}
          {activeTab === 'inventory' && <InventoryManagement />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="section-header">
        <h2 className="text-heading-lg">Executive Dashboard</h2>
        <p className="text-body-md text-secondary">Welcome back, {user?.name || 'Travel Manager'}</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card card">
          <div className="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Upcoming Trips</h3>
          <p className="stat-value">3</p>
          <p className="stat-description text-secondary">Scheduled for this quarter</p>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V5" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19V23" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.93 4.93L7.76 7.76" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.24 16.24L19.07 19.07" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12H5" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H23" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.93 19.07L7.76 16.24" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.24 7.76L19.07 4.93" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="5" stroke="var(--elite-accent)" strokeWidth="2"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Total Spend</h3>
          <p className="stat-value">₹2,45,000</p>
          <p className="stat-description text-secondary">Year-to-date expenditure</p>
        </div>
        
        <div className="stat-card card">
          <div className="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Policy Compliance</h3>
          <p className="stat-value">92%</p>
          <p className="stat-description text-secondary">Corporate policy adherence</p>
        </div>
      </div>
      
      <div className="recent-activity card">
        <div className="activity-header">
          <h3 className="text-heading-md">Recent Activity</h3>
          <button className="btn btn-secondary btn-small">View All</button>
        </div>
        <ul className="activity-list">
          <li className="activity-item">
            <div className="activity-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="var(--elite-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12L15 14" stroke="var(--elite-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="activity-content">
              <p className="text-body-md">John Doe booked a flight to New York</p>
              <p className="text-body-sm text-tertiary">2 hours ago</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="var(--elite-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="var(--elite-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="activity-content">
              <p className="text-body-md">Sarah Smith submitted expense report</p>
              <p className="text-body-sm text-tertiary">5 hours ago</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="activity-content">
              <p className="text-body-md">Travel policy updated</p>
              <p className="text-body-sm text-tertiary">Yesterday</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Bookings({ user }) {
  const [bookingStep, setBookingStep] = useState(1); // 1: Search, 2: Select, 3: Passenger, 4: Payment, 5: Confirmation
  const [selectedOption, setSelectedOption] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    passport: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate search results
    const results = [
      {
        id: 1,
        route: 'Delhi → Mumbai',
        date: '10 Sep 2025',
        options: [
          { id: 1, source: 'Real-time', price: '₹45,000', airline: 'Air India', class: 'First Class', time: '08:00-11:30', rating: 5, type: 'realtime' },
          { id: 2, source: 'Blocked 1', price: '₹42,000', airline: 'Vistara', class: 'Business', time: '09:00-12:30', rating: 4, type: 'blocked' },
          { id: 3, source: 'Blocked 2', price: '₹48,000', airline: 'IndiGo', class: 'Business', time: '14:00-17:30', rating: 4, type: 'blocked' }
        ]
      },
      {
        id: 2,
        route: 'Mumbai → Bangalore',
        date: '12 Sep 2025',
        options: [
          { id: 4, source: 'Real-time', price: '₹8,500', airline: 'IndiGo', class: 'Economy', time: '16:00-17:30', rating: 4, type: 'realtime' },
          { id: 5, source: 'Blocked 1', price: '₹7,800', airline: 'SpiceJet', class: 'Economy', time: '18:00-19:30', rating: 3, type: 'blocked' }
        ]
      }
    ];
    setSearchResults(results);
    setBookingStep(2);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setBookingStep(3);
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    setBookingStep(4);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setBookingStep(5);
    }, 1500);
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedOption(null);
    setPassengerDetails({
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      passport: ''
    });
    setPaymentMethod('credit');
    setSearchResults([]);
  };

  const renderBookingStep = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="booking-section">
            <h2 className="text-heading-lg">Arrange New Journey</h2>
            <form className="booking-search-form" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="origin" className="text-body-sm text-secondary">From</label>
                  <input type="text" id="origin" placeholder="Departure city" className="input-field" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="destination" className="text-body-sm text-secondary">To</label>
                  <input type="text" id="destination" placeholder="Destination city" className="input-field" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dates" className="text-body-sm text-secondary">Travel Dates</label>
                  <input type="date" id="dates" className="input-field" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passengers" className="text-body-sm text-secondary">Passengers</label>
                  <select id="passengers" className="input-field">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4+ Passengers</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn btn-accent">Search Elite Options</button>
            </form>
          </div>
        );
      
      case 2:
        return (
          <div className="booking-section">
            <h2 className="text-heading-lg">Select Your Journey</h2>
            <div className="results-grid">
              {searchResults.map(item => (
                <div key={item.id} className="inventory-item card">
                  <div className="item-header">
                    <h3 className="text-heading-sm">{item.route}</h3>
                    <p className="text-body-md text-secondary">{item.date}</p>
                  </div>
                  <div className="item-options">
                    {item.options.map(option => (
                      <div key={option.id} className="option-card">
                        <div className="option-header">
                          <span className="source-tag">{option.source}</span>
                          <span className="price-tag">{option.price}</span>
                        </div>
                        <div className="option-details">
                          <p className="text-body-md">{option.airline}</p>
                          <p className="text-body-sm text-secondary">{option.class}</p>
                          <p className="text-body-sm text-secondary">{option.time}</p>
                          <div className="rating">
                            {'★'.repeat(option.rating)}
                            {'☆'.repeat(5 - option.rating)}
                          </div>
                        </div>
                        <button 
                          className="btn btn-accent btn-small"
                          onClick={() => handleSelectOption(option)}
                        >
                          Select Journey
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => setBookingStep(1)}>
              Back to Search
            </button>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-section">
            <h2 className="text-heading-lg">Passenger Details</h2>
            <div className="travel-details">
              <div className="detail-card">
                <div className="detail-header">
                  <h3 className="text-heading-sm">Journey Details</h3>
                </div>
                <div className="detail-content">
                  <p className="text-body-md">Delhi → Mumbai</p>
                  <p className="text-body-md">10 Sep 2025</p>
                  <p className="text-body-md">{selectedOption?.airline} - {selectedOption?.class}</p>
                  <p className="text-body-md">{selectedOption?.time}</p>
                  <p className="text-body-md text-accent">{selectedOption?.price}</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleContinueToPayment}>
              <div className="passenger-form">
                <div className="form-group">
                  <label htmlFor="firstName" className="text-body-sm text-secondary">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className="input-field" 
                    value={passengerDetails.firstName}
                    onChange={handlePassengerChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="text-body-sm text-secondary">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className="input-field" 
                    value={passengerDetails.lastName}
                    onChange={handlePassengerChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="text-body-sm text-secondary">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="input-field" 
                    value={passengerDetails.email}
                    onChange={handlePassengerChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="text-body-sm text-secondary">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="input-field" 
                    value={passengerDetails.phone}
                    onChange={handlePassengerChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="passport" className="text-body-sm text-secondary">Passport Number</label>
                  <input 
                    type="text" 
                    id="passport" 
                    name="passport" 
                    className="input-field" 
                    value={passengerDetails.passport}
                    onChange={handlePassengerChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setBookingStep(2)}>
                  Back
                </button>
                <button type="submit" className="btn btn-accent">
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        );
      
      case 4:
        return (
          <div className="booking-section">
            <h2 className="text-heading-lg">Payment Details</h2>
            
            <div className="payment-methods">
              <div 
                className={`payment-method ${paymentMethod === 'credit' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('credit')}
              >
                <div className="payment-method-icon">💳</div>
                <div className="text-body-md">Credit Card</div>
              </div>
              
              <div 
                className={`payment-method ${paymentMethod === 'debit' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('debit')}
              >
                <div className="payment-method-icon">💳</div>
                <div className="text-body-md">Debit Card</div>
              </div>
              
              <div 
                className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="payment-method-icon">📱</div>
                <div className="text-body-md">UPI</div>
              </div>
              
              <div 
                className={`payment-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                <div className="payment-method-icon">🏦</div>
                <div className="text-body-md">Net Banking</div>
              </div>
            </div>
            
            <div className="billing-details">
              <h3 className="text-heading-md">Billing Summary</h3>
              <div className="billing-row">
                <span>Base Fare</span>
                <span>₹40,000</span>
              </div>
              <div className="billing-row">
                <span>Taxes & Fees</span>
                <span>₹5,000</span>
              </div>
              <div className="billing-row">
                <span>Service Fee</span>
                <span>₹1,500</span>
              </div>
              <div className="billing-row total">
                <span>Total</span>
                <span>₹46,500</span>
              </div>
            </div>
            
            <form onSubmit={handlePayment}>
              <div className="passenger-form">
                {paymentMethod !== 'upi' && paymentMethod !== 'netbanking' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardNumber" className="text-body-sm text-secondary">Card Number</label>
                      <input type="text" id="cardNumber" className="input-field" placeholder="1234 5678 9012 3456" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="expiry" className="text-body-sm text-secondary">Expiry Date</label>
                      <input type="text" id="expiry" className="input-field" placeholder="MM/YY" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv" className="text-body-sm text-secondary">CVV</label>
                      <input type="text" id="cvv" className="input-field" placeholder="123" required />
                    </div>
                  </>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="form-group">
                    <label htmlFor="upiId" className="text-body-sm text-secondary">UPI ID</label>
                    <input type="text" id="upiId" className="input-field" placeholder="yourname@upi" required />
                  </div>
                )}
                
                {paymentMethod === 'netbanking' && (
                  <div className="form-group">
                    <label htmlFor="bank" className="text-body-sm text-secondary">Select Bank</label>
                    <select id="bank" className="input-field">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setBookingStep(3)}>
                  Back
                </button>
                <button type="submit" className="btn btn-accent">
                  Pay ₹46,500
                </button>
              </div>
            </form>
          </div>
        );
      
      case 5:
        return (
          <div className="confirmation-section">
            <div className="confirmation-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="var(--elite-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-heading-xl">Booking Confirmed!</h2>
            <p className="text-body-lg text-secondary">Your journey has been successfully booked.</p>
            
            <div className="confirmation-details card">
              <h3 className="text-heading-md">Booking Details</h3>
              <div className="confirmation-item">
                <span>Booking Reference</span>
                <span className="text-accent">TP-789456</span>
              </div>
              <div className="confirmation-item">
                <span>Journey</span>
                <span>Delhi → Mumbai</span>
              </div>
              <div className="confirmation-item">
                <span>Date</span>
                <span>10 Sep 2025</span>
              </div>
              <div className="confirmation-item">
                <span>Airline</span>
                <span>{selectedOption?.airline}</span>
              </div>
              <div className="confirmation-item">
                <span>Class</span>
                <span>{selectedOption?.class}</span>
              </div>
              <div className="confirmation-item">
                <span>Passenger</span>
                <span>{passengerDetails.firstName} {passengerDetails.lastName}</span>
              </div>
              <div className="confirmation-item">
                <span>Total Paid</span>
                <span className="text-accent">₹46,500</span>
              </div>
            </div>
            
            <div className="confirmation-actions">
              <button className="btn btn-secondary" onClick={resetBooking}>
                Book Another Journey
              </button>
              <button className="btn btn-accent">
                Download E-Ticket
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bookings">
      <div className="section-header">
        <h2 className="text-heading-lg">Elite Booking Suite</h2>
        <p className="text-body-md text-secondary">Premium travel arrangements for your executive team</p>
      </div>
      
      <div className="booking-steps">
        {[1, 2, 3, 4, 5].map(step => (
          <div 
            key={step} 
            className={`step ${bookingStep === step ? 'active' : bookingStep > step ? 'completed' : ''}`}
          >
            <div className="step-indicator">
              {step}
            </div>
            <div className="step-label">
              {['Search', 'Select', 'Passenger', 'Payment', 'Confirmation'][step - 1]}
            </div>
          </div>
        ))}
      </div>
      
      {renderBookingStep()}
    </div>
  );
}

function Policies() {
  return (
    <div className="policies">
      <div className="section-header">
        <h2 className="text-heading-lg">Corporate Travel Standards</h2>
        <p className="text-body-md text-secondary">Executive guidelines for premium travel experiences</p>
      </div>
      
      <div className="policies-grid">
        <div className="policy-card card">
          <div className="policy-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3V9H22" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H12" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H12" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 13H8.01" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 17H8.01" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Flight Standards</h3>
          <ul className="policy-list">
            <li className="text-body-md">First class for flights over 4 hours</li>
            <li className="text-body-md">Business class for flights under 4 hours</li>
            <li className="text-body-md">Advance booking required (14 days minimum)</li>
            <li className="text-body-md">Premium lounge access included</li>
          </ul>
        </div>
        
        <div className="policy-card card">
          <div className="policy-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 9V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 9H4" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 9V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 21V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Accommodation Standards</h3>
          <ul className="policy-list">
            <li className="text-body-md">5-star luxury hotels only</li>
            <li className="text-body-md">Maximum ₹25,000 per night</li>
            <li className="text-body-md">Suite accommodations for stays over 3 nights</li>
            <li className="text-body-md">Breakfast and dinner included</li>
          </ul>
        </div>
        
        <div className="policy-card card">
          <div className="policy-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 9V7H7V9" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 13V11H7V13" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 17V15H7V17" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Expense Protocol</h3>
          <ul className="policy-list">
            <li className="text-body-md">All receipts required for expenses</li>
            <li className="text-body-md">Submission within 3 days of travel</li>
            <li className="text-body-md">₹1,000 daily meal allowance</li>
            <li className="text-body-md">Personal expenses not reimbursed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="reports">
      <div className="section-header">
        <h2 className="text-heading-lg">Executive Analytics</h2>
        <p className="text-body-md text-secondary">Comprehensive insights into corporate travel performance</p>
      </div>
      
      <div className="reports-grid">
        <div className="report-card card">
          <div className="report-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 5H9.5C8.43913 5 7.42172 5.42143 6.67157 6.17157C5.92143 6.92172 5.5 7.93913 5.5 9C5.5 10.0609 5.92143 11.0783 6.67157 11.8284C7.42172 12.5786 8.43913 13 9.5 13H17" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 17H9.5C8.43913 17 7.42172 17.4214 6.67157 18.1716C5.92143 18.9217 5.5 19.9391 5.5 21C5.5 22.0609 5.92143 23.0783 6.67157 23.8284C7.42172 24.5786 8.43913 25 9.5 25H17" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Annual Expenditure</h3>
          <p className="report-value">₹12,45,000</p>
          <div className="report-meta">
            <span className="budget-text">Annual Budget: ₹15,00,000</span>
            <span className="status-text success">Under budget</span>
          </div>
          <div className="report-trend">
            <span className="trend-text">↓ 12% from last year</span>
          </div>
        </div>
        
        <div className="report-card card">
          <div className="report-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Compliance Report</h3>
          <p className="report-value">92%</p>
          <div className="report-meta">
            <span className="violations-text">Policy Violations: 3</span>
          </div>
          <div className="report-trend">
            <span className="trend-text">↑ 8% improvement</span>
          </div>
        </div>
        
        <div className="report-card card">
          <div className="report-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 3.13C17.8604 3.35031 18.623 3.85071 19.1676 4.55232C19.7122 5.25392 20.0078 6.11683 20.0078 7.005C20.0078 7.89318 19.7122 8.75608 19.1676 9.45769C18.623 10.1593 17.8604 10.6597 17 10.88" stroke="var(--elite-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-heading-md">Travel Patterns</h3>
          <p className="report-value">Peak: December</p>
          <div className="report-meta">
            <span className="pattern-text">Most visited: Mumbai, Bangalore</span>
          </div>
          <div className="report-trend">
            <span className="trend-text">International: 35%</span>
          </div>
        </div>
      </div>
      
      <div className="report-chart card">
        <h3 className="text-heading-md">Quarterly Spending Trend</h3>
        <div className="chart-container">
          <div className="chart-bars">
            <div className="chart-bar">
              <div className="bar-fill" style={{height: '60%'}}></div>
              <span className="bar-label">Q1</span>
            </div>
            <div className="chart-bar">
              <div className="bar-fill" style={{height: '80%'}}></div>
              <span className="bar-label">Q2</span>
            </div>
            <div className="chart-bar">
              <div className="bar-fill" style={{height: '40%'}}></div>
              <span className="bar-label">Q3</span>
            </div>
            <div className="chart-bar">
              <div className="bar-fill" style={{height: '70%'}}></div>
              <span className="bar-label">Q4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState('enterprise');
  
  const plans = [
    {
      id: 'corporate',
      name: 'Corporate Plan',
      price: '₹15,000',
      period: '/month',
      features: [
        'Up to 25 executives',
        'First & business class flights',
        '5-star hotel accommodations',
        'Dedicated travel concierge',
        'Priority support',
        'Comprehensive analytics'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: '₹35,000',
      period: '/month',
      features: [
        'Unlimited executives',
        'Private jet charter options',
        'Luxury resort accommodations',
        'Personal travel assistant',
        '24/7 white-glove support',
        'Advanced analytics & reporting',
        'Custom policy integration',
        'API access'
      ]
    },
    {
      id: 'executive',
      name: 'Executive Plan',
      price: '₹75,000',
      period: '/month',
      features: [
        'Unlimited executives',
        'Private jet & helicopter services',
        'Ultra-luxury resort accommodations',
        'Dedicated travel manager',
        'Concierge services',
        'VIP airport experiences',
        'Personalized travel analytics',
        'Exclusive partner benefits'
      ]
    }
  ];

  return (
    <div className="subscriptions">
      <div className="section-header">
        <h2 className="text-heading-lg">Elite Membership Tiers</h2>
        <p className="text-body-md text-secondary">Premium subscription options for discerning organizations</p>
      </div>
      
      <div className="plans-container">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card card ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="plan-header">
              <h3 className="text-heading-md">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-value">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-body-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
                    <path d="M20 6L9 17L4 12" stroke="var(--elite-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`btn ${selectedPlan === plan.id ? 'btn-accent' : 'btn-secondary'} w-full`}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Selected ${plan.name}`);
              }}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Select Membership'}
            </button>
          </div>
        ))}
      </div>
      
      <div className="usage-tracking card">
        <h3 className="text-heading-md">Membership Utilization</h3>
        <div className="usage-stats">
          <div className="usage-stat">
            <div className="stat-header">
              <span className="text-body-md">Active Executives</span>
              <span className="text-body-md">42/∞</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{width: '84%'}}></div>
            </div>
          </div>
          
          <div className="usage-stat">
            <div className="stat-header">
              <span className="text-body-md">Journeys Booked</span>
              <span className="text-body-md">124/∞</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{width: '92%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryManagement() {
  const [inventorySources, setInventorySources] = useState([
    { id: 1, name: 'Real-time API', status: 'connected', lastSync: '5 minutes ago', itemCount: 12450, type: 'realtime' },
    { id: 2, name: 'Blocked Inventory 1 (Contract ABC)', status: 'connected', lastSync: '2 hours ago', itemCount: 8750, type: 'blocked', contractExpiry: '15 Dec 2025' },
    { id: 3, name: 'Blocked Inventory 2 (Agreement XYZ)', status: 'connected', lastSync: '4 hours ago', itemCount: 5200, type: 'blocked', contractExpiry: '30 Nov 2025' }
  ]);

  const [selectedSources, setSelectedSources] = useState(['all']);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch inventory data on component mount
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const allInventory = await inventoryService.fetchAllInventory();
      const normalizedInventory = inventoryService.normalizeInventory(allInventory);
      
      // Group inventory by route for display
      const groupedInventory = groupInventoryByRoute(normalizedInventory);
      setInventoryItems(groupedInventory);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupInventoryByRoute = (inventory) => {
    const grouped = {};
    
    inventory.forEach(item => {
      const routeKey = `${item.item.origin} → ${item.item.destination}`;
      const date = new Date(item.item.departureTime).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      
      if (!grouped[routeKey]) {
        grouped[routeKey] = {
          route: routeKey,
          date: date,
          options: []
        };
      }
      
      grouped[routeKey].options.push({
        id: item.id,
        source: item.source,
        price: `₹${item.pricing.totalPrice.toLocaleString()}`,
        airline: item.metadata.airline,
        class: item.metadata.class,
        time: `${new Date(item.item.departureTime).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}-${new Date(item.item.arrivalTime).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}`,
        rating: item.metadata.rating || 0,
        type: item.type
      });
    });
    
    return Object.values(grouped);
  };

  const toggleSource = (sourceType) => {
    if (sourceType === 'all') {
      setSelectedSources(['all']);
    } else {
      const newSources = selectedSources.includes(sourceType)
        ? selectedSources.filter(s => s !== sourceType && s !== 'all')
        : [...selectedSources.filter(s => s !== 'all'), sourceType];
      
      // If all sources are selected, set to 'all'
      if (newSources.length === 3) {
        setSelectedSources(['all']);
      } else {
        setSelectedSources(newSources);
      }
    }
  };

  const getConnectionStatus = (status) => {
    return status === 'connected' ? '● Connected' : '● Disconnected';
  };

  const getConnectionStatusClass = (status) => {
    return status === 'connected' ? 'status-connected' : 'status-disconnected';
  };

  return (
    <div className="inventory-management">
      <div className="section-header">
        <h2 className="text-heading-lg">Inventory Management</h2>
        <p className="text-body-md text-secondary">Unified view of all inventory sources</p>
      </div>
      
      <div className="inventory-actions">
        <button className="btn btn-accent">Add New Inventory</button>
        <button className="btn btn-secondary" onClick={fetchInventoryData}>Refresh All</button>
        <button className="btn btn-secondary">Export Report</button>
      </div>
      
      <div className="source-filters">
        <span className="text-body-md">Source Filter:</span>
        <button 
          className={`filter-button ${selectedSources.includes('all') ? 'active' : ''}`}
          onClick={() => toggleSource('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${selectedSources.includes('realtime') ? 'active' : ''}`}
          onClick={() => toggleSource('realtime')}
        >
          Real-time
        </button>
        <button 
          className={`filter-button ${selectedSources.includes('blocked') ? 'active' : ''}`}
          onClick={() => toggleSource('blocked')}
        >
          Blocked
        </button>
      </div>
      
      <div className="inventory-sources">
        {inventorySources.map(source => (
          <div key={source.id} className="source-card card">
            <div className="source-header">
              <h3 className="text-heading-md">{source.name}</h3>
              <span className={`status-indicator ${getConnectionStatusClass(source.status)}`}>
                {getConnectionStatus(source.status)}
              </span>
            </div>
            <div className="source-details">
              <p className="text-body-md">Last Sync: {source.lastSync}</p>
              <p className="text-body-md">Items: {source.itemCount.toLocaleString()}</p>
              {source.contractExpiry && (
                <p className="text-body-md">Contract Expires: {source.contractExpiry}</p>
              )}
            </div>
            <div className="source-actions">
              <button className="btn btn-secondary btn-small">Configure</button>
              <button className="btn btn-secondary btn-small">Test Connection</button>
              {source.contractExpiry && (
                <button className="btn btn-secondary btn-small">View Contract</button>
              )}
              <button className="btn btn-secondary btn-small">Force Sync</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="inventory-results">
        <h3 className="text-heading-md">Inventory Search Results</h3>
        {loading ? (
          <div className="loading">Loading inventory data...</div>
        ) : inventoryItems.length > 0 ? (
          inventoryItems.map(item => (
            <div key={`${item.route}-${item.date}`} className="inventory-item card">
              <div className="item-header">
                <h4 className="text-heading-sm">{item.route}</h4>
                <p className="text-body-md text-secondary">{item.date}</p>
              </div>
              <div className="item-options">
                {item.options.map(option => (
                  <div key={option.id} className="option-card">
                    <div className="option-header">
                      <span className="source-tag">{option.source}</span>
                      <span className="price-tag">{option.price}</span>
                    </div>
                    <div className="option-details">
                      <p className="text-body-md">{option.airline}</p>
                      <p className="text-body-sm text-secondary">{option.class}</p>
                      <p className="text-body-sm text-secondary">{option.time}</p>
                      <div className="rating">
                        {'★'.repeat(option.rating)}
                        {'☆'.repeat(5 - option.rating)}
                      </div>
                    </div>
                    <button className="btn btn-accent btn-small">Select</button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No inventory data available. Click "Refresh All" to fetch data.</div>
        )}
      </div>
    </div>
  );
}

export default App;