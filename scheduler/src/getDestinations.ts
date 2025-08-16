import {Configuration} from "./config.interface";
import {Route} from "./route.interface";

import printf from "printf";
import _ from 'lodash';

import {distance} from "./distance";
import configJson from '../config.json';
import rksi from '../rksi.json';


const configuration: Configuration = configJson;
const maxRouteLength = configuration.maxDistance;
const origin: [number, number] = [rksi.latitude, rksi.longitude];

const hubRoutes: Route[] = rksi.destinations.flatMap(destination => {
    const routeLength: number = distance(origin, [destination.latitude, destination.longitude]);
    return Array.from({length: destination.routes},
        (_, i) => {
            return {ix: i, destination: destination.destination, routes: destination.routes, routeLength: routeLength}
        });
}).sort((a, b) => {
    return b.routes - a.routes || b.routeLength - a.routeLength;
});

const availableRoutes: Route[] = hubRoutes.filter(route => {
    return route.routeLength < maxRouteLength && _.find(configuration.completedRoutes, route) === undefined;
});
let selectedRoute = availableRoutes[getRandomInt(0, availableRoutes.length)];

console.log(printf('Index  Dest  Length  Flight No.'))
hubRoutes.forEach((route, index) => {
    const printString = printf('%5d  %4s  %6d', index + 1, route.destination, route.routeLength);
    if (_.find(configuration.completedRoutes, route) !== undefined) {
        console.log(`\x1b[104m${printString}\x1b[0m`)
    } else if (route === selectedRoute) {
        console.log(`\x1b[102m${printString}\x1b[0m`);
    } else if (route.routeLength > maxRouteLength) {
        console.log(`\x1b[101m${printString}\x1b[0m`);
    } else {
        console.log(printString);
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
