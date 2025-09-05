# API Integration Guide

This document outlines how the unified inventory system would integrate with the three inventory APIs in a production environment.

## 1. Real-time Inventory API

### Endpoint
```
GET /api/inventory/realtime
```

### Parameters
- `origin` (string): Departure location
- `destination` (string): Arrival location
- `date` (string): Travel date (YYYY-MM-DD)
- `category` (string): Inventory category (flight, hotel, train)

### Response Format
```json
{
  "id": "unique_identifier",
  "item": {
    "id": "item_id",
    "name": "Item Name",
    "description": "Item description",
    "category": "flight|hotel|train",
    "origin": "Origin location",
    "destination": "Destination location",
    "departureTime": "2025-09-10T08:00:00Z",
    "arrivalTime": "2025-09-10T11:30:00Z"
  },
  "availability": {
    "startDate": "2025-09-10",
    "endDate": "2025-09-10",
    "quantity": 5
  },
  "pricing": {
    "currency": "INR",
    "basePrice": 10000,
    "taxes": 1800,
    "totalPrice": 11800
  },
  "metadata": {
    "airline": "Airline Name",
    "flightNumber": "AI-201",
    "class": "First Class",
    "duration": "3h 30m"
  }
}
```

### Authentication
- API Key in header: `Authorization: Bearer {api_key}`

## 2. Blocked Inventory API 1

### Endpoint
```
GET /api/inventory/blocked/contract-abc
```

### Parameters
- `origin` (string): Departure location
- `destination` (string): Arrival location
- `date` (string): Travel date (YYYY-MM-DD)
- `contractId` (string): Contract identifier

### Response Format
```json
{
  "id": "unique_identifier",
  "contractId": "contract_abc",
  "item": {
    "id": "item_id",
    "name": "Item Name",
    "description": "Item description",
    "category": "flight|hotel|train",
    "origin": "Origin location",
    "destination": "Destination location",
    "departureTime": "2025-09-10T08:00:00Z",
    "arrivalTime": "2025-09-10T11:30:00Z"
  },
  "availability": {
    "startDate": "2025-09-10",
    "endDate": "2025-09-10",
    "quantity": 10
  },
  "pricing": {
    "currency": "INR",
    "basePrice": 9500,
    "taxes": 1710,
    "totalPrice": 11210
  },
  "metadata": {
    "airline": "Airline Name",
    "flightNumber": "UK-945",
    "class": "Business",
    "duration": "3h 30m"
  }
}
```

### Authentication
- OAuth 2.0 with client credentials flow

## 3. Blocked Inventory API 2

### Endpoint
```
GET /api/inventory/blocked/agreement-xyz
```

### Parameters
- `origin` (string): Departure location
- `destination` (string): Arrival location
- `date` (string): Travel date (YYYY-MM-DD)
- `agreementId` (string): Agreement identifier

### Response Format
```json
{
  "id": "unique_identifier",
  "agreementId": "agreement_xyz",
  "item": {
    "id": "item_id",
    "name": "Item Name",
    "description": "Item description",
    "category": "flight|hotel|train",
    "origin": "Origin location",
    "destination": "Destination location",
    "departureTime": "2025-09-10T08:00:00Z",
    "arrivalTime": "2025-09-10T11:30:00Z"
  },
  "availability": {
    "startDate": "2025-09-10",
    "endDate": "2025-09-10",
    "quantity": 7
  },
  "pricing": {
    "currency": "INR",
    "basePrice": 9800,
    "taxes": 1764,
    "totalPrice": 11564
  },
  "metadata": {
    "airline": "Airline Name",
    "flightNumber": "6E-201",
    "class": "Business",
    "duration": "3h 30m"
  }
}
```

### Authentication
- JWT tokens with periodic refresh

## Integration Architecture

### API Gateway
The system uses an API gateway to:
1. Route requests to appropriate services
2. Handle authentication and authorization
3. Implement rate limiting
4. Provide caching mechanisms
5. Handle error responses

### Data Normalization Service
All API responses are normalized to a unified format:
```json
{
  "id": "unique_inventory_id",
  "type": "realtime|blocked",
  "source": "api_name",
  "item": {
    "id": "item_id",
    "name": "Item Name",
    "description": "Description",
    "category": "flight|hotel|train",
    "origin": "Origin location",
    "destination": "Destination location",
    "departureTime": "ISO 8601 datetime",
    "arrivalTime": "ISO 8601 datetime"
  },
  "availability": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "quantity": 5
  },
  "pricing": {
    "currency": "INR",
    "basePrice": 10000,
    "taxes": 1800,
    "totalPrice": 11800
  },
  "metadata": {
    "originalId": "source_item_id",
    "contractId": "contract_123"
  }
}
```

### Error Handling
- Timeout handling (30 seconds default)
- Retry mechanism (3 attempts)
- Fallback to cached data when APIs are unavailable
- Detailed logging for debugging

### Security Considerations
- All API credentials stored securely (environment variables/secrets management)
- TLS encryption for all API communications
- Input validation and sanitization
- Regular security audits

## Implementation Roadmap

### Phase 1: Core Integration
1. Implement API clients for all three sources
2. Create data normalization service
3. Implement basic error handling
4. Set up monitoring and logging

### Phase 2: Advanced Features
1. Implement caching strategies
2. Add real-time synchronization
3. Develop priority-based selection algorithms
4. Create admin interface for API configuration

### Phase 3: Optimization
1. Performance tuning
2. Advanced filtering and search
3. Analytics and reporting
4. Scalability enhancements