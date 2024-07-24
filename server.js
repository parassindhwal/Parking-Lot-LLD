// Enum of Vechicle Size
const VechicleSize = {
    MOTORCYCLE: 1,
    COMPACT: 2,
    LARGE: 3
}

// Enum of Parking Price
const ParkingFees = {
    MOTORCYCLE: 1,
    COMPACT: 2,
    LARGE: 3
}

// Vehicle Base Class
class Vehicle {
    constructor(size) {
        this.size = size;
        this.spotsNeeded = 0;
        this.parkingSpots = [],
        this.entryTime = null,
        this.exitTime = null
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    parkInSpot(spot) {
        this.parkingSpots.push(spot);
    }

    clearSpots() {
        for(let spot of this.parkingSpots) {
            spot.removeVehicle();
        }
        this.parkingSpots = [];
    }

    setEntryTime(time) {
        this.entryTime = time;
    }

    setExitTime(time) {
        this.exitTime = time;
    }

    calculateParkingFee() {
        if(!this.entryTime || !this.exitTime) {
            throw new Error("Entry time or exit time is not set";)
        }

        const durationInHours = (this.exitTime - this.entryTime) / (1000 * 60 * 60);
        let rate;

        switch(this.size){
            case VechicleSize.MOTORCYCLE:
                rate = ParkingFees.MOTORCYCLE;
                break;
            case VechicleSize.COMPACT:
                rate = ParkingFees.COMPACT;
                break;
            case VechicleSize.LARGE:
                rate = ParkingFees.LARGE;
                break;
            default: 
                throw new Error("Unknown vehicle size.");
        }

        return durationInHours * rate;
    }
}

class Motorcycle extends Vehicle {
    constructor() {
        super(VechicleSize.MOTORCYCLE);
        this.spotsNeeded = 1;
    }
}

class Car extends Vehicle {
    constructor() {
        super(VechicleSize.CAR);
        this.spotsNeeded = 1;
    }
}

class Bus extends Vehicle {
    constructor() {
        super(VechicleSize.BUS);
        this.spotsNeeded = 5;
    }
}

class ParkingSpot {
    constructor(level, row, spotNumber, size) {
        this.level = level,
        this.row = row;
        this.spotNumber = spotNumber;
        this.size = size;
        this.vehicle = null;
    }

    isAvailable() {
        return this.vehicle === null;
    }

    canFitVehicle() {
        return this.isAvailable() && vehicle.getSize() <= this.size;
    }

    park(vehicle) {
        if(!this.canFitVehicle(vehicle)) {
            return false;
        }

        this.vehicle = vehicle;
        vehicle.parkInSpot(this)
        return true;
    }

    removeVehicle() {
        this.vehicle = null;
    }
}

class Level {
    constructor(floor, numRows, spotsPerRow) {
        this.floor = floor;
        this.parkingSpots = [];
        this.availableSpots = 0;

        for(let row = 0; row < numRows; row++) {
            for(let spot = 0; spot < spotsPerRow; spot++) {
                let size;
                if(spot < spotsPerRow / 4) {
                    size = VechicleSize.MOTORCYCLE;
                } else if(spot < spotsPerRow / 4 * 3) {
                    size = VechicleSize.COMPACT;
                } else {
                    size = VechicleSize.LARGE
                }
                this.parkingSpots.push(new ParkingSpot(this, row, spot, size));
            }
        }
        this.availableSpots = this.parkingSpots.length;
    }

    parkVehicle(vehicle) {
        if(this.availableSpots < vehicle.getSpotsNeeded()) {
            return false;
        }

        for(let i = 0; i <= this.availableSpots.length - vehicle.getSpotsNeeded(); i++) {
            if(this.canParkAtSpots(vehicle, i)) {
                this.parkAtSpots(vehicle, i);
                vehicle.setEntryTime(Date.now());
                return true;
            }
        }
        return false;
    }

    canParkAtSpots(vehicle, startIndex) {
        for(let i = startIndex; i < startIndex + vehicle.getSpotsNeeded(); i++) {
            if(!this.parkingSpots[i].canFitVehicle(vehicle)) { 
                return false;
            }
        }
        return true;
    }
    
    parkAtSpots(vehicle, startIndex) {
        for(let i = startIndex; i < startIndex + vehicle.getSpotsNeeded(); i++) {
            this.parkingSpots[i].park(vehicle);
            this.availableSpots--;
        }
    }

    freeSpots(vehicle) {
        vehicle.setExitTime(Date.now());
        const parkingFee = vehicle.calculateParkingFee();
        console.log(`Parking fee for vehicle: $${parkingFee.toFixed(2)}`);

        for(let spot of vehicle.parkingSpots) {
            spot.removeVehicle();
            this.availableSpots++;
        }
        vehicle.clearSpots();
    }
}

class ParkingLot {
    constructor(numLevels, numRows, spotsPerRow) {
        this.levels = [];
        for(let i = 0; i < numLevels; i++) {
            this.levels.push(new Level(i, numRows, spotsPerRow))
        }
    }

    parkVehicle(vehicle) {
        for(let level of this.levels) {
            if(level.parkVehicle(vehicle)) {
                return true;
            }
        }
        return false;
    }

    freeSpots(vehicle) {
        for(let level of this.levels) {
            level.freeSpots(vehicle);
        }
    }
}

const parkingLot = new ParkingLot(3, 4, 10);
const motorcycle = new Motorcycle();
const car = new Car();
const bus = new Bus();

// Park vehicles
parkingLot.parkVehicle(motorcycle); // Assume this returns true
parkingLot.parkVehicle(car); // Assume this returns true

// Simulate some time passing (e.g., 3 hours)
setTimeout(() => {
  // Free spots and calculate fees
  parkingLot.levels[0].freeSpots(motorcycle); // Parking fee for motorcycle
  parkingLot.levels[0].freeSpots(car); // Parking fee for car
}, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
