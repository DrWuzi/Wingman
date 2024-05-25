import {Endpoint} from '../../endpoint';
import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import {Method, Headers} from '../../http/http';
import Result from '../../result';
import IEntitlement from '../../types/authentication/entitlement';
import 'text-encoding-polyfill';

class EntitlementEndpoint extends Endpoint<IEntitlement, EnumError<ValorantClientError>, ValorantClient> {
    public userAccessToken: string;

    public constructor(userAccessToken: string) {
        super();

        this.userAccessToken = userAccessToken;
    }

    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        return Result.ok(new URL('https://entitlements.auth.riotgames.com'));
    }

    public endpoint(): string {
        return 'api/token/v1';
    }

    public method(): Method {
        return Method.POST;
    }

    public headers(): Headers | undefined {
        return new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.userAccessToken}`,
        });
    }
}

export default EntitlementEndpoint;
