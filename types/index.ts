export type ConsumptionScore = {
    uid: string,
    consumption: number,
    ranking: number,
    utility: string,
    coords: {
        lat: number,
        lng: number,
        zipcode: string
    }
}