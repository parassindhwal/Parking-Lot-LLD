# Smart Parking Lot System

## Overview

This is a low level design for Smart Parking Lot System. This system handles vehicle entry and exit management, parking space allocation, and fee calculation for motorcycle, car and bus.

## Features

- Parking Spot Allocation: Automatically assign an available parking spot to a vehicle when it enters, based on the vehicle’s size (e.g., motorcycle, car, bus).
- Check-In and Check-Out: Record the entry and exit times of vehicles.
- Parking Fee Calculation: Calculate fees based on the duration of stay and vehicle type.
- Real-Time Availability Update: Update the availability of parking spots in real-time as vehicles enter and leave.


## Language used
JavaScript/Node.js

## Setup

1. Clone the repository:

```
git clone https://github.com/parassindhwal/Parking-Lot-LLD.git
cd Parking-Lot-LLD
```

### Following configuration are already added in Server.js
2. Add parking lot configuration:

```
  const parkingLot = new ParkingLot(3, 4, 10);

```

3. Add vehicles

```
  const motorcycle = new Motorcycle();
  const car = new Car();
  const bus = new Bus();
```

4. Add the check-in details:

```
  parkingLot.parkVehicle(motorcycle); // Assume this returns true
  parkingLot.parkVehicle(car); // Assume this returns true
```

5. Add the check-out details:

```
  // Simulate some time passing (e.g., 3 hours)
  setTimeout(() => {
    // Free spots and calculate fees
    parkingLot.levels[0].freeSpots(motorcycle); // Parking fee for motorcycle
    parkingLot.levels[0].freeSpots(car); // Parking fee for car
  }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
```

5. Run the runner:

```
node server.js
```
