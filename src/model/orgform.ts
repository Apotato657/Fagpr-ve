
export interface Link {
    href: string;
}
export interface Orgform {
    _links?: {
        self: Link;
    },
    kode: string,
    utgaat?: string,
    beskrivelse: string
}