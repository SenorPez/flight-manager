import {Configuration} from "./config.interface";

export class Route {
    readonly ix: number;
    readonly destination: string;
    readonly routes: number;
    readonly routeLength: number;

    constructor(ix: number, destination: string, routes: number, routeLength: number) {
        this.ix = ix;
        this.destination = destination;
        this.routes = routes;
        this.routeLength = routeLength;
    }

    isCompleted(configuration: Configuration): boolean {
        return configuration.completedRoutes
            .filter(route => {
                return route.ix === this.ix && route.destination === this.destination;
            }).length > 0;
    }
}
