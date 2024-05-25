import Headers from './headers';

/**
 * Represents an HTTP response.
 * @typeparam T The type of the response data.
 */
interface Response<T> {
    status: number;
    headers?: Headers;
    data?: T;
}

export default Response;
