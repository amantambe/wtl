import express from 'express';
const router = express.Router();

// Sample Ride Data
const sampleRides = [
  {
    "_id": "ride1",
    "pickupLocation": "Location A",
    "dropLocation": "Location B",
    "pickupTime": "2024-10-27T10:00:00.000Z",
    "driverName": "John Doe",
    "driverContact": "123-456-7890",
    "isCompleted": true,
    "passengers": [
      { "_id": "p1", "name": "Alice" },
      { "_id": "p2", "name": "Bob" }
    ]
  },
  {
    "_id": "ride2",
    "pickupLocation": "Location C",
    "dropLocation": "Location D",
    "pickupTime": "2024-10-28T12:00:00.000Z",
    "driverName": "Jane Smith",
    "driverContact": "987-654-3210",
    "isCompleted": false,
    "passengers": [
      { "_id": "p3", "name": "Charlie" }
    ]
  },
  {
    "_id": "ride4",
    "pickupLocation": "Location G",
    "dropLocation": "Location H",
    "pickupTime": "2024-10-26T12:00:00.000Z",
    "driverName": "Jane Smith",
    "driverContact": "987-654-3210",
    "isCompleted": true,
    "passengers": [
      { "_id": "p6", "name": "Charlie" }
    ]
  },
  {
    "_id": "ride3",
    "pickupLocation": "Location E",
    "dropLocation": "Location F",
    "pickupTime": "2024-10-29T15:00:00.000Z",
    "driverName": "David Lee",
    "driverContact": "555-123-4567",
    "isCompleted": true,
    "passengers": [
      { "_id": "p4", "name": "Eva" },
      { "_id": "p5", "name": "Frank" }
    ]
  }
];

router.get('/', (req, res) => {
  try {
    let filteredRides = [...sampleRides];

    // Tab Filtering (Completed Rides)
    if (req.query.completed === 'true') { // Use a boolean string for clarity
      filteredRides = filteredRides.filter(ride => ride.isCompleted);
    }

    // Date Range Filtering
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate) {
      const start = new Date(startDate);
      filteredRides = filteredRides.filter(ride => new Date(ride.pickupTime) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredRides = filteredRides.filter(ride => new Date(ride.pickupTime) <= end);
    }

    // Sorting by Date
    const sortByDate = req.query.sortByDate;
    if (sortByDate === 'asc') {
        filteredRides.sort((a, b) => new Date(a.pickupTime) - new Date(b.pickupTime));
    } else if (sortByDate === 'desc') {
        filteredRides.sort((a, b) => new Date(b.pickupTime) - new Date(a.pickupTime));
    }

    res.json(filteredRides);
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/completed', (req, res) => {
    try {
        const completedRides = sampleRides.filter(ride => ride.isCompleted);
        res.json(completedRides);
    } catch (error) { /* ... */ }
});

// Get rides within a date range
router.get('/date/:startDate/:endDate', (req, res) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const filteredRides = sampleRides.filter(ride => {
      const rideDate = new Date(ride.pickupTime);
      return rideDate >= startDate && rideDate <= endDate;
    });

    res.json(filteredRides);
  } catch (error) { /* ... */ }
});

//Get completed rides within a date range
router.get('/completed/date/:startDate/:endDate', (req, res) => {
    try {
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate);

        const filteredRides = sampleRides.filter(ride => {
            const rideDate = new Date(ride.pickupTime);
            return ride.isCompleted && rideDate >= startDate && rideDate <= endDate;
        });

        res.json(filteredRides);
    } catch (error) { /* ... */ }
});


export default router;