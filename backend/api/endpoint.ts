import Result from './result';
import Query from './query';
import {Client, ClientError} from './client';
import EnumError from './error';
import {Response, Request, Method, Headers} from './http/http';
import {createDirectory, exists, readFile, writeFile} from '../utils/file-system/file-system';

/**
 * Represents an API endpoint.
 * @typeparam T The type of the response data.
 * @typeparam E The type of the client error.
 * @typeparam C The type of the client.
 */
export abstract class Endpoint<T, E extends Error, C extends Client<E>>
    implements Query<T, EnumError<ClientError>, E, C>
{
    /**
     * Get the HTTP method required for this endpoint.
     * @returns The HTTP method.
     */
    public abstract method(): Method;

    /**
     * Get the endpoint URL.
     * This does not include the host part.
     * @returns The endpoint URL.
     */
    public abstract endpoint(): string;

    /**
     * Get the host URL of the endpoint.
     * This will override the host URL of the client if present.
     * @returns A Result containing the host URL, or an error if the host URL is invalid.
     */
    public host(): Result<URL | undefined, E> {
        return Result.ok();
    }

    /**
     * Get the headers for the request.
     * @returns The headers for the request.
     */
    public headers(): Headers | undefined {
        return undefined;
    }

    /**
     * Get the body of the request.
     * @returns The body of the request.
     */
    public body(): Uint8Array | undefined {
        return undefined;
    }

    public async query(client: C): Promise<Result<T, EnumError<ClientError>>> {
        const endpoint_host = this.host();
        if (endpoint_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get endpoint host: ${endpoint_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        const client_host = this.host();
        if (client_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get client host: ${client_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        let host: URL;
        if (endpoint_host.isOk()) {
            host = endpoint_host.unwrap() as URL;
        } else if (client_host.unwrap() !== null) {
            host = client_host.unwrap() as URL;
        } else {
            return Result.err(
                new EnumError('Failed to get host: Both endpoint and client hosts are null', ClientError.INVALID_HOST),
            );
        }

        let url;
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

        let result: T;
        try {
            result = JSON.parse(new TextDecoder().decode(response.unwrap().data)) as T;
        } catch (error) {
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(
                        `Failed to parse response: ${error.message || 'Unknown error'}`,
                        ClientError.QUERY_FAILED,
                    ),
                );
            }

            return Result.err(new EnumError('Failed to parse response: Unknown error', ClientError.QUERY_FAILED));
        }

        return Result.ok(result);
    }
}

/**
 * Represents an API endpoint.
 * @type T The type of the response data.
 * @type TC The custom type of the actual data which gets returned to the caller.
 * @type E The type of the client error.
 * @type C The type of the client.
 */
export abstract class CustomEndpoint<T, TC, E extends Error, C extends Client<E>> extends Endpoint<TC, E, C> {
    /**
     * Converts the returned data from the server to the
     * custom data type.
     * @param data The raw returned data from the server
     * @returns The converted data into the custom data type
     */
    protected abstract convertResponse(data: T): TC;

    public async query(client: C): Promise<Result<TC, EnumError<ClientError>>> {
        const endpoint_host = this.host();
        if (endpoint_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get endpoint host: ${endpoint_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        const client_host = this.host();
        if (client_host.isErr()) {
            return Result.err(
                new EnumError(
                    `Failed to get client host: ${client_host.getErr()?.message || 'Unknown error'}`,
                    ClientError.INVALID_HOST,
                ),
            );
        }

        let host: URL;
        if (endpoint_host.isOk()) {
            host = endpoint_host.unwrap() as URL;
        } else if (client_host.unwrap() !== null) {
            host = client_host.unwrap() as URL;
        } else {
            return Result.err(
                new EnumError('Failed to get host: Both endpoint and client hosts are null', ClientError.INVALID_HOST),
            );
        }

        let url;
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

        let result: TC;
        try {
            let rawResult = JSON.parse(new TextDecoder().decode(response.unwrap().data)) as T;
            result = this.convertResponse(rawResult);
        } catch (error) {
            if (error instanceof Error) {
                return Result.err(
                    new EnumError(
                        `Failed to parse response: ${error.message || 'Unknown error'}`,
                        ClientError.QUERY_FAILED,
                    ),
                );
            }

            return Result.err(new EnumError('Failed to parse response: Unknown error', ClientError.QUERY_FAILED));
        }

        return Result.ok(result);
    }
}

/**
 * Represents a cached data from an endpoint response.
 * @type T The type of the response data.
 */
export interface ICachedData<T> {
    timestamp: number;
    data: T;
}

/**
 * Represents a cached API endpoint.
 * @type T The type of the response data.
 * @type E The type of the client error.
 * @type C The type of the client.
 */
export abstract class CachedEndpoint<T, E extends Error, C extends Client<E>> extends Endpoint<T, E, C> {
    /**
     * Get the timeout for the cache.
     * The timeout is in milliseconds.
     * @param data The cached data to calculate the timeout for.
     * @returns The timeout for the cache.
     */
    public abstract refreshTimeoutDuration(data: T): number;

    /**
     * Overwrites the default generated file name for the
     * cache storage if string is returned instead of undefined.
     * @returns The overwriting cache file name or undefined if the default generation should be used.
     */
    public overwriteCacheFileName(): string | undefined {
        return undefined;
    }

    async query(client: C): Promise<Result<T, EnumError<ClientError>>> {
        const endpoint_host = this.host();
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
        if (endpoint_host.unwrap()) {
            host = endpoint_host.unwrap() as URL;
        } else if (client_host.unwrap()) {
            host = client_host.unwrap() as URL;
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
            const cacheData: ICachedData<T> = {
                timestamp: Date.now(),
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
                const cacheData = (await readFile(cacheFileName)) as ICachedData<T>;
                if (Date.now() - cacheData.timestamp > this.refreshTimeoutDuration(cacheData.data)) {
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
 * Represents a cached API endpoint.
 * @type T The type of the response data.
 * @type TC The custom type of the actual data which gets returned to the caller.
 * @type E The type of the client error.
 * @type C The type of the client.
 */
export abstract class CachedCustomEndpoint<T, TC, E extends Error, C extends Client<E>> extends CustomEndpoint<
    T,
    TC,
    E,
    C
> {
    /**
     * Get the timeout for the cache.
     * The timeout is in milliseconds.
     * @param data The cached data to calculate the timeout for.
     * @returns The timeout for the cache.
     */
    public abstract refreshTimeoutDuration(data: TC): number;

    /**
     * Overwrites the default generated file name for the
     * cache storage if string is returned instead of undefined.
     * @returns The overwriting cache file name or undefined if the default generation should be used.
     */
    public overwriteCacheFileName(): string | undefined {
        return undefined;
    }

    async query(client: C): Promise<Result<TC, EnumError<ClientError>>> {
        const endpoint_host = this.host();
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
        if (endpoint_host.unwrap()) {
            host = endpoint_host.unwrap() as URL;
        } else if (client_host.unwrap()) {
            host = client_host.unwrap() as URL;
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
            const cacheData: ICachedData<TC> = {
                timestamp: Date.now(),
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
                const cacheData = (await readFile(cacheFileName)) as ICachedData<TC>;
                if (Date.now() - cacheData.timestamp > this.refreshTimeoutDuration(cacheData.data)) {
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
