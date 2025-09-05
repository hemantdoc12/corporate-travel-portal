// Mock inventory service to simulate API calls to different inventory sources

class InventoryService {
  // Simulate fetching real-time inventory
  async fetchRealTimeInventory() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 'rt-1',
        type: 'realtime',
        source: 'Real-time API',
        item: {
          id: 'flight-DEL-BOM-001',
          name: 'Delhi to Mumbai Flight',
          description: 'Direct flight from Delhi to Mumbai',
          category: 'flight',
          origin: 'Delhi (DEL)',
          destination: 'Mumbai (BOM)',
          departureTime: '2025-09-10T08:00:00',
          arrivalTime: '2025-09-10T11:30:00',
        },
        availability: {
          startDate: '2025-09-10',
          endDate: '2025-09-10',
          quantity: 5,
        },
        pricing: {
          currency: 'INR',
          basePrice: 40000,
          taxes: 5000,
          totalPrice: 45000,
        },
        metadata: {
          airline: 'Air India',
          flightNumber: 'AI-201',
          class: 'First Class',
          duration: '3h 30m',
          rating: 5,
        }
      },
      {
        id: 'rt-2',
        type: 'realtime',
        source: 'Real-time API',
        item: {
          id: 'flight-BOM-BLR-001',
          name: 'Mumbai to Bangalore Flight',
          description: 'Direct flight from Mumbai to Bangalore',
          category: 'flight',
          origin: 'Mumbai (BOM)',
          destination: 'Bangalore (BLR)',
          departureTime: '2025-09-12T16:00:00',
          arrivalTime: '2025-09-12T17:30:00',
        },
        availability: {
          startDate: '2025-09-12',
          endDate: '2025-09-12',
          quantity: 12,
        },
        pricing: {
          currency: 'INR',
          basePrice: 7000,
          taxes: 1500,
          totalPrice: 8500,
        },
        metadata: {
          airline: 'IndiGo',
          flightNumber: '6E-612',
          class: 'Economy',
          duration: '1h 30m',
          rating: 4,
        }
      }
    ];
  }

  // Simulate fetching blocked inventory from source 1
  async fetchBlockedInventory1() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return [
      {
        id: 'blk1-1',
        type: 'blocked',
        source: 'Blocked API 1',
        item: {
          id: 'flight-DEL-BOM-002',
          name: 'Delhi to Mumbai Flight',
          description: 'Direct flight from Delhi to Mumbai',
          category: 'flight',
          origin: 'Delhi (DEL)',
          destination: 'Mumbai (BOM)',
          departureTime: '2025-09-10T09:00:00',
          arrivalTime: '2025-09-10T12:30:00',
        },
        availability: {
          startDate: '2025-09-10',
          endDate: '2025-09-10',
          quantity: 10,
        },
        pricing: {
          currency: 'INR',
          basePrice: 37000,
          taxes: 5000,
          totalPrice: 42000,
        },
        metadata: {
          airline: 'Vistara',
          flightNumber: 'UK-945',
          class: 'Business',
          duration: '3h 30m',
          rating: 4,
        }
      },
      {
        id: 'blk1-2',
        type: 'blocked',
        source: 'Blocked API 1',
        item: {
          id: 'flight-BOM-BLR-002',
          name: 'Mumbai to Bangalore Flight',
          description: 'Direct flight from Mumbai to Bangalore',
          category: 'flight',
          origin: 'Mumbai (BOM)',
          destination: 'Bangalore (BLR)',
          departureTime: '2025-09-12T18:00:00',
          arrivalTime: '2025-09-12T19:30:00',
        },
        availability: {
          startDate: '2025-09-12',
          endDate: '2025-09-12',
          quantity: 8,
        },
        pricing: {
          currency: 'INR',
          basePrice: 6500,
          taxes: 1300,
          totalPrice: 7800,
        },
        metadata: {
          airline: 'SpiceJet',
          flightNumber: 'SG-745',
          class: 'Economy',
          duration: '1h 30m',
          rating: 3,
        }
      }
    ];
  }

  // Simulate fetching blocked inventory from source 2
  async fetchBlockedInventory2() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 'blk2-1',
        type: 'blocked',
        source: 'Blocked API 2',
        item: {
          id: 'flight-DEL-BOM-003',
          name: 'Delhi to Mumbai Flight',
          description: 'Direct flight from Delhi to Mumbai',
          category: 'flight',
          origin: 'Delhi (DEL)',
          destination: 'Mumbai (BOM)',
          departureTime: '2025-09-10T14:00:00',
          arrivalTime: '2025-09-10T17:30:00',
        },
        availability: {
          startDate: '2025-09-10',
          endDate: '2025-09-10',
          quantity: 7,
        },
        pricing: {
          currency: 'INR',
          basePrice: 43000,
          taxes: 5000,
          totalPrice: 48000,
        },
        metadata: {
          airline: 'IndiGo',
          flightNumber: '6E-201',
          class: 'Business',
          duration: '3h 30m',
          rating: 4,
        }
      }
    ];
  }

  // Unified method to fetch all inventory
  async fetchAllInventory() {
    try {
      const [realTime, blocked1, blocked2] = await Promise.allSettled([
        this.fetchRealTimeInventory(),
        this.fetchBlockedInventory1(),
        this.fetchBlockedInventory2()
      ]);

      const allInventory = [];

      if (realTime.status === 'fulfilled') {
        allInventory.push(...realTime.value);
      }

      if (blocked1.status === 'fulfilled') {
        allInventory.push(...blocked1.value);
      }

      if (blocked2.status === 'fulfilled') {
        allInventory.push(...blocked2.value);
      }

      return allInventory;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      return [];
    }
  }

  // Normalize inventory data to a unified format
  normalizeInventory(inventoryItems) {
    return inventoryItems.map(item => ({
      id: item.id,
      type: item.type,
      source: item.source,
      item: {
        id: item.item.id,
        name: item.item.name,
        description: item.item.description,
        category: item.item.category,
        origin: item.item.origin,
        destination: item.item.destination,
        departureTime: item.item.departureTime,
        arrivalTime: item.item.arrivalTime,
      },
      availability: {
        startDate: item.availability.startDate,
        endDate: item.availability.endDate,
        quantity: item.availability.quantity,
      },
      pricing: {
        currency: item.pricing.currency,
        basePrice: item.pricing.basePrice,
        taxes: item.pricing.taxes,
        totalPrice: item.pricing.totalPrice,
      },
      metadata: {
        ...item.metadata,
      }
    }));
  }
}

export default new InventoryService();