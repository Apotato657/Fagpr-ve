export interface Kommune {
    nummer: string;
    navn: string;
}

export interface KommuneRespons  {
    _embedded:
        | {
        kommuner: Kommune[];
    }
        | {
        kommuner: [];
    }
}

export interface FetchKommuneRespons  {
    status: string;
    data: KommuneRespons;
}