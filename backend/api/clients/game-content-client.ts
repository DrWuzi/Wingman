import {Client, ClientError} from '../client';
import EnumError from '../error';
import Result from '../result';
import {Request, Response, Headers} from '../http/http';
import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import {IGameContent} from '../../valorant-api/game-content-api/game-content-types';
import 'text-encoding-polyfill';
import VersionEndpoint from '../endpoints/game-content/version';

export enum GameContentClientError {
    QUERY_FAILED,
    NOT_INITIALIZED,
}

class GameContentClient implements Client<EnumError<GameContentClientError>> {
    public host(): Result<URL | undefined, EnumError<ClientError>> {
        return Result.ok(new URL('https://valorant-api.com'));
    }

    public async query(
        request: Request<Uint8Array>,
    ): Promise<Result<Response<Uint8Array>, EnumError<GameContentClientError>>> {
        const requestHeaders = new AxiosHeaders();

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
                            GameContentClientError.QUERY_FAILED,
                        ),
                    );
                    // @ts-ignore
                } else if (error.request) {
                    return Result.err(
                        // @ts-ignore
                        new EnumError(`Network Error: ${error.request}`, ValorantClientError.QUERY_FAILED),
                    );
                } else {
                    return Result.err(new EnumError(`Error: ${error.message}`, GameContentClientError.QUERY_FAILED));
                }
            }

            return Result.err(new EnumError('Unknown error', GameContentClientError.QUERY_FAILED));
        }
    }
}

export default GameContentClient;
