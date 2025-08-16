import configJson from '../config.json';
import rksi from '../rksi.json';
import {distance} from "./distance";
import printf from "printf";

const configuration: Configuration = configJson;
const maxRouteLength = configuration.maxDistance;
const origin: [number, number] = [rksi.latitude, rksi.longitude];

console.log(printf('Index  Dest  Length  Flight No.'))
rksi.destinations.flatMap(destination => {
    const routeLength: number = distance(origin, [destination.latitude, destination.longitude]);
    return Array(destination.routes).fill(
        {destination: destination.destination, routes: destination.routes, routeLength: routeLength}
    );
}).sort((a, b) => {
    return b.routes - a.routes || b.routeLength - a.routeLength;
}).forEach((route, index) => {
    const printString = printf('%5d  %4s  %6d', index + 1, route.destination, route.routeLength)
    if (route.routeLength > maxRouteLength) {
        console.log(`\x1b[101m${printString}\x1b[0m`);
    } else {
        console.log(printString);
    }
});