import {Client} from './client';
import Result from './result';

/**
 * Adds query functionality to an endpoint.
 * @typeparam T The type of the response data.
 * @typeparam E The type of the error value.
 * @typeparam EC The type of the client error.
 * @typeparam C The type of the client.
 */
interface Query<T, E extends Error, EC extends Error, C extends Client<EC>> {
    /**
     * Query the API
     * @param client The client to use for the query.
     * @returns The result of the query.
     */
    query(client: C): Promise<Result<T, E>>;
}

export default Query;
