import {Client, ClientError} from '../client';
import EnumError from '../error';
import Result from '../result';
import {Request, Response, Headers} from '../http/http';
import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import {IGameContent} from '../../valorant-api/game-content-api/game-content-types';
import 'text-encoding-polyfill';
import VersionEndpoint from '../endpoints/game-content/version';
import GameContentClient from './game-content-client';

export enum ValorantClientError {
    QUERY_FAILED,
    NOT_INITIALIZED,
}

class ValorantClient implements Client<EnumError<ValorantClientError>> {
    public gameContentClient: GameContentClient;

    public constructor(gameContentClient: GameContentClient) {
        this.gameContentClient = gameContentClient;
    }

    public host(): Result<URL | undefined, EnumError<ClientError>> {
        return Result.ok();
    }

    public async query(
        request: Request<Uint8Array>,
    ): Promise<Result<Response<Uint8Array>, EnumError<ValorantClientError>>> {
        const versionResult = await new VersionEndpoint(false).query(this.gameContentClient);

        if (versionResult.isErr()) {
            return Result.err(
                new EnumError(
                    'Failed to fetch game content version: ' + versionResult.getErr().message,
                    ValorantClientError.QUERY_FAILED,
                ),
            );
        }

        const version = versionResult.unwrap().data;

        const requestHeaders = new AxiosHeaders({
            'X-Riot-ClientVersion': version.riotClientVersion || '',
            'X-Riot-ClientPlatform':
                'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
        });

        if (request.headers) {
            request.headers.forEach((key: string, value: string) => {
                requestHeaders.set(key, value);
            });
        }

        const config: AxiosRequestConfig = {
            method: request.method,
            url: request.url.toString(),
            data: request.data || null,
            headers: requestHeaders,
        };

        try {
            let axiosResponse = await axios(config);
            const responseHeaders: Headers = new Headers();

            const response: Response<Uint8Array> = {
                status: axiosResponse.status,
                headers: responseHeaders,
                data: axiosResponse.data ? new TextEncoder().encode(JSON.stringify(axiosResponse.data)) : undefined,
            };

            return Result.ok(response);
        } catch (error: any) {
            if (error instanceof Error) {
                // TODO: Remove ts ignore
                // @ts-ignore
                if (error.response) {
                    return Result.err(
                        new EnumError(
                            // @ts-ignore
                            `API Error: ${JSON.stringify(error.response.data)}`,
                            ValorantClientError.QUERY_FAILED,
                        ),
                    );
                    // @ts-ignore
                } else if (error.request) {
                    return Result.err(
                        // @ts-ignore
                        new EnumError(`Network Error: ${error.request}`, ValorantClientError.QUERY_FAILED),
                    );
                } else {
                    return Result.err(new EnumError(`Error: ${error.message}`, ValorantClientError.QUERY_FAILED));
                }
            }

            return Result.err(new EnumError('Unknown error', ValorantClientError.QUERY_FAILED));
        }
    }
}

export default ValorantClient;
