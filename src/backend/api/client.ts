import Result from './result';
import EnumError from './error';
import {Request, Response} from './http/http';

export enum ClientError {
    NOT_IMPLEMENTED,
    INVALID_HOST,
    QUERY_FAILED,
    CACHE_ERROR,
}

/**
 * Represents the client host.
 * This will provide a default host URL for the client.
 * An endpoint can override this host URL for itself.
 */
export abstract class ClientHost {
    /**
     * Get the host URL.
     * This will be overridden by the client implementation.
     * @returns A Result containing the host URL, or an error if the host URL is invalid.
     */
    host(): Result<URL | null, EnumError<ClientError>> {
        return Result.ok<URL | null, EnumError<ClientError>>(null);
    }
}

/**
 * Represents an API client.
 * @typeparam E The type of the error value.
 */
export abstract class Client<E extends Error> extends ClientHost {
    /**
     * Query the API
     * @param request
     */
    abstract query(request: Request<Uint8Array>): Promise<Result<Response<Uint8Array>, E>>;
}
