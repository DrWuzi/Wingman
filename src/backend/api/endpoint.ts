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
        return Result.ok(undefined);
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
 * Represents a cached data from an endpoint response.
 * @typeparam T The type of the response data.
 */
export interface ICachedData<T> {
    timestamp: number;
    data: T;
}

/**
 * Represents a cached API endpoint.
 * @typeparam T The type of the response data.
 * @typeparam E The type of the client error.
 * @typeparam C The type of the client.
 */
export abstract class CachedEndpoint<T, E extends Error, C extends Client<E>> extends Endpoint<T, E, C> {
    /**
     * Get the timeout for the cache.
     * The timout is in milliseconds.
     * @param data The cached data to calculate the timeout for.
     * @returns The timeout for the cache.
     */
    public abstract refreshTimeoutDuration(data: T): number;

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

        const cacheFileName = `endpoints/${url.toString().replace(/[^a-zA-Z0-9]/g, '_')}.cache.json`;

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
