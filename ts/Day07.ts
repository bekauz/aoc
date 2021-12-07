function p1(crabs: number[]): number {

    let crabsAtHorizontalPositionMap: Map<number, number> = generateCountToPositionIndexMap(crabs);

    let costToGetToPosition: Map<number, number> = new Map();

    let leftMostPos = crabs[0];
    let rightMostPos = crabs[0];
    crabsAtHorizontalPositionMap.forEach((k: number, v: number) => {
        leftMostPos = Math.min(leftMostPos, v);
        rightMostPos = Math.max(rightMostPos, v);
    });
  
    crabsAtHorizontalPositionMap.forEach((crabCount, position) => {
        for (let targetPosition = leftMostPos; targetPosition <= rightMostPos; targetPosition++) {
            if (position != targetPosition) {
                let distanceBetween: number = Math.abs(targetPosition - position);
                let fuelRequired = crabCount * distanceBetween;
                let currentPositionCost = costToGetToPosition.get(targetPosition);
                if (currentPositionCost == undefined) {
                    costToGetToPosition.set(targetPosition, fuelRequired);
                } else {
                    costToGetToPosition.set(targetPosition, currentPositionCost + fuelRequired);

                }
            }
        }  
    });

    return getMinFuelUsage(costToGetToPosition);
}


function p2(crabs: number[]): number {

    let crabsAtHorizontalPositionMap: Map<number, number> = generateCountToPositionIndexMap(crabs);

    let costToGetToPosition: Map<number, number> = new Map();
    let leftMostPos = crabs[0];
    let rightMostPos = crabs[0];
    crabsAtHorizontalPositionMap.forEach((k: number, v: number) => {
        leftMostPos = Math.min(leftMostPos, v);
        rightMostPos = Math.max(rightMostPos, v);
    });
    crabsAtHorizontalPositionMap.forEach((crabCount, position) => {
  
        for (let targetPosition = leftMostPos; targetPosition <= rightMostPos; targetPosition++) {
            if (position != targetPosition) {
                let distanceBetween: number = Math.abs(targetPosition - position);
                let sumOfDistances = (distanceBetween*(distanceBetween + 1))/2;
                let fuelRequired = crabCount * sumOfDistances;

                let currentPositionCost = costToGetToPosition.get(targetPosition);
                if (currentPositionCost == undefined) {
                    costToGetToPosition.set(targetPosition, fuelRequired);
                } else {
                    costToGetToPosition.set(targetPosition, currentPositionCost + fuelRequired);

                }
            }
        }  
    });

    return getMinFuelUsage(costToGetToPosition);
}


function generateCountToPositionIndexMap(input: number[]): Map<number, number> {

    let countToPositionIndexMap: Map<number, number> = new Map();

    for (let i = 0; i < input.length; i++) {
        let curr = countToPositionIndexMap.get(input[i]);
        if (curr == undefined) {
            curr = 0;
        }
        countToPositionIndexMap.set(input[i], curr + 1);
    }
    return countToPositionIndexMap;
}

function getMinFuelUsage(map: Map<number, number>): number {
    let minFuel = Number.MAX_SAFE_INTEGER;

    map.forEach((k, v) => {
        minFuel = Math.min(minFuel, k);
    });

    return minFuel;
}