# Unified Inventory System Demo

This demo showcases a proof of concept for a unified inventory system that integrates multiple inventory sources:
1. Real-time inventory API
2. Blocked inventory API 1 (contracted)
3. Blocked inventory API 2 (pre-negotiated)

## Features Demonstrated

- Unified dashboard view of all inventory sources
- Inventory management interface
- Mock data for all three inventory types
- Filtering capabilities
- Connection status monitoring

## Running the Demo Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to http://localhost:5173/corporate-travel-portal/

## Navigating the Demo

1. Use the navigation bar to switch between different sections
2. Click on "Inventory" to view the unified inventory management system
3. The "Refresh All" button simulates fetching data from all three inventory sources
4. Use the source filters to view specific inventory types

## Technical Implementation

- React with Vite (as per existing project setup)
- Mock services to simulate API calls
- Responsive design following the elite design system
- All financial values displayed in Indian Rupees (₹)

## Next Steps

This demo represents the frontend component of a larger system. A production implementation would require:

1. Backend services to integrate with actual APIs
2. Database for persistent storage
3. Authentication and authorization
4. Advanced filtering and search capabilities
5. Real-time synchronization mechanisms
6. Monitoring and alerting systems

## Note

This is a frontend demo only. The inventory data is simulated and not connected to actual APIs.