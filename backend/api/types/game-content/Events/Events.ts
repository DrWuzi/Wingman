export interface EventsResponse {
    status: number;
    data:   Event[];
}

export interface Event {
    uuid:             string;
    displayName:      string;
    shortDisplayName: string;
    startTime:        Date;
    endTime:          Date;
    assetPath:        string;
}
