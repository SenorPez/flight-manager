export interface Configuration {
    maxDistance: number,
    excludedDestinations: string[],
    completedRoutes: {
        ix: number,
        destination: string
    }[]
}
