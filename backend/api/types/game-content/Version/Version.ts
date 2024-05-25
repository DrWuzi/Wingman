export interface VersionResponse {
    status: number;
    data:   Version;
}

export interface Version {
    manifestId:        string;
    branch:            string;
    version:           string;
    buildVersion:      string;
    engineVersion:     string;
    riotClientVersion: string;
    riotClientBuild:   string;
    buildDate:         Date;
}
