export interface Planet {
    name: string,
    rotationPeriod: string,
    oribtalPeriod: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: Resident[],
    films: Film[]
}

export interface Resident {
   name: string
}

export interface Film {
    title: string
}