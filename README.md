# Corporate Travel Portal v0.0

A proof of concept for a corporate travel subscription platform web portal with an elite design aesthetic.

## Features

- Elite dashboard with travel analytics
- Booking management for flights, trains, and hotels
- Corporate travel policy management
- Subscription plan management
- Comprehensive reporting and analytics
- Unified inventory management system (Demo)
- End-to-end booking flow with payment simulation

## Technology Stack

- **Frontend**: React with Vite
- **Styling**: CSS3 with custom design system
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Design

The portal features an elite design with:
- Luxurious color palette (dark theme with gold accents)
- Sophisticated typography with serif fonts
- Enhanced shadows and depth effects
- Gold accent colors for highlights
- Refined spacing and hierarchy

All financial values are displayed in Indian Rupees (₹).

## End-to-End User Experience

This demo simulates a complete user journey from login to booking confirmation:

1. **Login**: Users can log in with sample credentials
2. **Dashboard**: Personalized view with travel analytics
3. **Booking Flow**: 
   - Search for travel options
   - Select from unified inventory (real-time and blocked sources)
   - Enter passenger details
   - Complete payment process
   - Receive booking confirmation
4. **Inventory Management**: View and manage inventory sources
5. **Logout**: Secure session termination

### Test Credentials
- Email: `admin@company.com`
- Password: `password123`

You can also use:
- `travel@company.com` / `password123`
- `executive@company.com` / `password123`

## Demo

This repository includes a demo of the unified inventory management system that showcases how the portal would integrate with three different inventory APIs:
1. Real-time inventory API
2. Blocked inventory API 1 (contracted)
3. Blocked inventory API 2 (pre-negotiated)

To run the demo locally:
```bash
npm install
npm run dev
```

Then open your browser to http://localhost:5173/corporate-travel-portal/ and navigate to the "Inventory" section.

## Deployment

This application is automatically deployed to GitHub Pages using GitHub Actions.

To set up GitHub Pages:
1. Go to repository settings: https://github.com/hemantdoc12/corporate-travel-portal/settings
2. Navigate to the "Pages" section
3. Under "Source", select "GitHub Actions"
4. The site will be available at: https://hemantdoc12.github.io/corporate-travel-portal/

## Troubleshooting

If you see an error like "Failed to load resource: the server responded with a status of 404", try these steps:

1. Make sure GitHub Pages is configured to deploy from GitHub Actions (not the root or /docs folder)
2. Check that the GitHub Actions workflow is running successfully: https://github.com/hemantdoc12/corporate-travel-portal/actions
3. Clear your browser cache
4. Try accessing the site in an incognito/private window

## Development

To run locally:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

## Version

This is version 0.0 of the Corporate Travel Portal, representing the initial proof of concept with core functionality implemented.

## License

This is a proof of concept and is not licensed for production use.