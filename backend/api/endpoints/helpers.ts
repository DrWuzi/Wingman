import Headers from '../http/headers';
import {IUser} from '../types/user.ts';

export function generateUserHeaders(user: IUser): Headers {
    return new Headers({
        'X-Riot-Entitlements-JWT': `${user.authData.entitlementsToken}`,
        Authorization: `Bearer ${user.authData.accessToken}`,
    });
}
