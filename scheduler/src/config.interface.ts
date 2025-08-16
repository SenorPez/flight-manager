export interface Configuration {
    maxDistance: number,
    completedRoutes: {
        ix: number,
        destination: string,
        routes: number,
        routeLength: number
    }[]
}