import {ClientError} from '../../client';
import GameContentClient, {GameContentClientError} from '../../clients/game-content-client';
import {CustomEndpoint, Endpoint} from '../../endpoint';
import EnumError from '../../error';
import Result from '../../result';
import {Version} from '../../types/game-content/Version/Version';
import VersionEndpoint from './version';
import {Request, Response} from '../../http/http';
import {createDirectory, exists, readFile, writeFile} from '../../../utils/file-system/file-system';

/**
 * Represents a cached data from a game content endpoint response.
 * @type T The type of the response data.
 */
export interface ICachedGameContentVersionData<T> {
    version: Version;
    data: T;
}

/**
 * Represents a cached game content API endpoint.
 * @type T The type of the response data.
 */
export abstract class CachedGameContentVersionEndpoint<T> extends Endpoint<
    T,
    EnumError<GameContentClientError>,
    GameContentClient
> {
    /**
     * Overwrites the default generated file name for the
     * cache storage if string is returned instead of undefined.
     * @returns The overwriting cache file name or undefined if the default generation should be used.
     */
    public overwriteCacheFileName(): string | undefined {
        return undefined;
    }

    async query(client: GameContentClient): Promise<Result<T, EnumError<ClientError>>> {
        const versionResult = await new VersionEndpoint().query(client);
        if (versionResult.isErr()) {
            return Result.err(
                new EnumError(
                    'Failed to fetch game content version: ' + versionResult.getErr().message,
                    ClientError.QUERY_FAILED,
                ),
            );
        }

        const version = versionResult.unwrap().data;

        const endpoint_host = this.host();
        console.log(JSON.stringify(endpoint_host));

        if (endpoint_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get endpoint host: ${endpoint_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        const client_host = client.host();
        if (client_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get client host: ${client_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        let host: URL;
        const host_endpoint = endpoint_host.unwrap();
        const host_client = client_host.unwrap();
        if (host_endpoint) {
            host = host_endpoint;
        } else if (host_client) {
            host = host_client;
        } else {
            return Result.err(
                new EnumError('Failed to get host: Both endpoint and client hosts are null', ClientError.INVALID_HOST),
            );
        }

        let url: URL;
        try {
            url = new URL(this.endpoint(), host.toString());
        } catch (error) {
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(
                        `Failed to create URL: ${error.message || 'Unknown error'}`,
                        ClientError.INVALID_HOST,
                    ),
                );
            }

            return Result.err(new EnumError('Failed to create URL: Unknown error', ClientError.INVALID_HOST));
        }

        const cacheFileName =
            this.overwriteCacheFileName() ?? `endpoints/${url.toString().replace(/[^a-zA-Z0-9]/g, '_')}.cache.json`;

        let localQuery = async (): Promise<Result<Response<Uint8Array>, EnumError<ClientError>>> => {
            const headers = this.headers() || undefined;
            const data = this.body() || undefined;
            const request: Request<Uint8Array> = {
                method: this.method(),
                url,
                headers,
                data,
            };

            const response = await client.query(request);
            if (response.isErr()) {
                return Result.err(
                    new EnumError(
                        `Failed to query endpoint: ${response.getErr()?.message || 'Unknown error'}`,
                        ClientError.QUERY_FAILED,
                    ),
                );
            }

            return Result.ok(response.unwrap());
        };

        let refresh = async (): Promise<Result<T, EnumError<ClientError>>> => {
            const result = await localQuery();
            if (result.isErr()) {
                return result;
            }
            const decoder = new TextDecoder();
            const response = JSON.parse(decoder.decode(result.unwrap().data)) as T;
            const cacheData: ICachedGameContentVersionData<T> = {
                version,
                data: response,
            };

            try {
                await createDirectory('endpoints');
                await writeFile(cacheFileName, cacheData);
            } catch (error) {
                if (error instanceof Error) {
                    return Result.err(
                        new EnumError(
                            `Failed to write cache: ${error.message || 'Unknown error'}`,
                            ClientError.CACHE_ERROR,
                        ),
                    );
                }

                return Result.err(new EnumError('Failed to write cache: Unknown error', ClientError.CACHE_ERROR));
            }

            return Result.ok(response);
        };

        let response: T;

        try {
            const cacheFileExists = await exists(cacheFileName);
            if (!cacheFileExists) {
                const result = await refresh();
                if (result.isErr()) {
                    return result;
                }
                response = result.unwrap();
            } else {
                const cacheData = (await readFile(cacheFileName)) as ICachedGameContentVersionData<T>;
                if (version.riotClientBuild !== cacheData.version.riotClientBuild) {
                    const result = await refresh();
                    if (result.isErr()) {
                        return result;
                    }
                    response = result.unwrap();
                } else {
                    response = cacheData.data;
                }
            }
        } catch (error) {
            // Only cache can fail with an exception thus we can safely assume that the error is from cache
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(`Failed to read cache: ${error.message || 'Unknown error'}`, ClientError.CACHE_ERROR),
                );
            }

            return Result.err(new EnumError('Failed to read cache: Unknown error', ClientError.CACHE_ERROR));
        }

        return Result.ok(response);
    }
}

/**
 * Represents a cached game content API endpoint.
 * @type T The type of the response data.
 * @type TC The custom type of the actual data which gets returned to the caller.
 */
export abstract class CachedCustomGameContentVersionEndpoint<T, TC> extends CustomEndpoint<
    T,
    TC,
    EnumError<GameContentClientError>,
    GameContentClient
> {
    /**
     * Overwrites the default generated file name for the
     * cache storage if string is returned instead of undefined.
     * @returns The overwriting cache file name or undefined if the default generation should be used.
     */
    public overwriteCacheFileName(): string | undefined {
        return undefined;
    }

    async query(client: GameContentClient): Promise<Result<TC, EnumError<ClientError>>> {
        const versionResult = await new VersionEndpoint().query(client);
        if (versionResult.isErr()) {
            return Result.err(
                new EnumError(
                    'Failed to fetch game content version: ' + versionResult.getErr().message,
                    ClientError.QUERY_FAILED,
                ),
            );
        }

        const version = versionResult.unwrap().data;

        const endpoint_host = this.host();
        console.log(JSON.stringify(endpoint_host));

        if (endpoint_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get endpoint host: ${endpoint_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        const client_host = client.host();
        if (client_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get client host: ${client_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        let host: URL;
        const host_endpoint = endpoint_host.unwrap();
        const host_client = client_host.unwrap();
        if (host_endpoint) {
            host = host_endpoint;
        } else if (host_client) {
            host = host_client;
        } else {
            return Result.err(
                new EnumError('Failed to get host: Both endpoint and client hosts are null', ClientError.INVALID_HOST),
            );
        }

        let url: URL;
        try {
            url = new URL(this.endpoint(), host.toString());
        } catch (error) {
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(
                        `Failed to create URL: ${error.message || 'Unknown error'}`,
                        ClientError.INVALID_HOST,
                    ),
                );
            }

            return Result.err(new EnumError('Failed to create URL: Unknown error', ClientError.INVALID_HOST));
        }

        const cacheFileName =
            this.overwriteCacheFileName() ?? `endpoints/${url.toString().replace(/[^a-zA-Z0-9]/g, '_')}.cache.json`;

        let localQuery = async (): Promise<Result<Response<Uint8Array>, EnumError<ClientError>>> => {
            const headers = this.headers() || undefined;
            const data = this.body() || undefined;
            const request: Request<Uint8Array> = {
                method: this.method(),
                url,
                headers,
                data,
            };

            const response = await client.query(request);
            if (response.isErr()) {
                return Result.err(
                    new EnumError(
                        `Failed to query endpoint: ${response.getErr()?.message || 'Unknown error'}`,
                        ClientError.QUERY_FAILED,
                    ),
                );
            }

            return Result.ok(response.unwrap());
        };

        let refresh = async (): Promise<Result<TC, EnumError<ClientError>>> => {
            const result = await localQuery();
            if (result.isErr()) {
                return result;
            }
            const decoder = new TextDecoder();
            const rawData = JSON.parse(decoder.decode(result.unwrap().data)) as T;
            const response = this.convertResponse(rawData);
            const cacheData: ICachedGameContentVersionData<TC> = {
                version,
                data: response,
            };

            try {
                await createDirectory('endpoints');
                await writeFile(cacheFileName, cacheData);
            } catch (error) {
                if (error instanceof Error) {
                    return Result.err(
                        new EnumError(
                            `Failed to write cache: ${error.message || 'Unknown error'}`,
                            ClientError.CACHE_ERROR,
                        ),
                    );
                }

                return Result.err(new EnumError('Failed to write cache: Unknown error', ClientError.CACHE_ERROR));
            }

            return Result.ok(response);
        };

        let response: TC;

        try {
            const cacheFileExists = await exists(cacheFileName);
            if (!cacheFileExists) {
                const result = await refresh();
                if (result.isErr()) {
                    return result;
                }
                response = result.unwrap();
            } else {
                const cacheData = (await readFile(cacheFileName)) as ICachedGameContentVersionData<TC>;
                if (version.riotClientBuild !== cacheData.version.riotClientBuild) {
                    const result = await refresh();
                    if (result.isErr()) {
                        return result;
                    }
                    response = result.unwrap();
                } else {
                    response = cacheData.data;
                }
            }
        } catch (error) {
            // Only cache can fail with an exception thus we can safely assume that the error is from cache
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(`Failed to read cache: ${error.message || 'Unknown error'}`, ClientError.CACHE_ERROR),
                );
            }

            return Result.err(new EnumError('Failed to read cache: Unknown error', ClientError.CACHE_ERROR));
        }

        return Result.ok(response);
    }
}
