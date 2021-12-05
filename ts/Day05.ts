interface Coordinate {
    x: number
    y: number
}

function p1p2(input: string): number {

    const vectors = input.split(`\n`).filter(x => x.length > 0);
    let xyToLineCountMap: Map<string, number> = buildInputMap(vectors);

    let count = 0;
    for (let [key, value] of xyToLineCountMap) {
        if (value >= 2) {
            count++;
        }
    }

    return count;
}

function buildInputMap(vectors: string[]): Map<string, number> {

    let map: Map<string, number> = new Map();

    for (let i = 0; i < vectors.length; i++) {
        
        let endPoints: number[] = vectors[i].split(` -> `)
            .flatMap(x => x.trim().split(`,`))
            .map(x => parseInt(x));
        let startCoord: Coordinate = { x: endPoints[0], y: endPoints[1] };
        let endCoord: Coordinate = { x: endPoints[2], y: endPoints[3] };
        const slope = (endCoord.y - startCoord.y) / (endCoord.x - startCoord.x);

        if (startCoord.x < endCoord.x) {
            for (let i = startCoord.x; i <= endCoord.x; i++) {
                let y = linearEquation(slope, i, startCoord.x, startCoord.y);
                markEntryOnMap(i, y, map);
            }
        } else if (startCoord.x > endCoord.x) {
            for (let i = startCoord.x; i >= endCoord.x; i--) {
                let y = linearEquation(slope, i, startCoord.x, startCoord.y);
                markEntryOnMap(i, y, map);
            }
        } else {
            for (let i = Math.max(startCoord.y, endCoord.y); i >= Math.min(startCoord.y, endCoord.y); i--) {
                markEntryOnMap(startCoord.x, i, map);
            }
        }
    }
    return map;
}

function linearEquation(slope: number, x: number, x_0: number, y_0: number): number {
    return slope * (x - x_0) + y_0;
}

function markEntryOnMap(x: number, y: number, map: Map<string, number>): void {

    const key = `${x},${y}`;
    let val = map.get(key);
    map.set(key, val == undefined ? 1 : val + 1);
}