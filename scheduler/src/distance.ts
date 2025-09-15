export function distance(origin: [number, number], destination: [number, number]): number {
    let originLat: number = origin[0];
    let originLong: number = origin[1];
    let destLat: number = destination[0];
    let destLong: number = destination[1];

    return Math.floor(
        Math.acos(
            Math.cos(toRadians(90 - originLat)) * Math.cos(toRadians(90 - destLat)) +
            Math.sin(toRadians(90 - originLat)) * Math.sin(toRadians(90 - destLat)) * Math.cos(toRadians(originLong - destLong))
        ) * 3443
    );
}

function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}
