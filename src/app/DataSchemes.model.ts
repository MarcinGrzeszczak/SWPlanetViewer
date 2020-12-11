export interface Planet {
    name: string,
    rotationPeriod: string,
    oribtalPeriod: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surfaceWater: string,
    population: string,
    residents: Resident[],
    films: Film[],
    _filmsUrls: string[],
    _residentsUrls: string[]
}

export interface Resident {
   name: string
}

export interface Film {
    title: string
}