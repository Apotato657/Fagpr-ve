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

export interface OrgformRespons {
    _embedded:
       | {
          orgform: Orgform[]
        }
        | {
        orgform: []
    }
}

export interface FetchOrgformRespons {
    status: string,
    data: OrgformRespons
}