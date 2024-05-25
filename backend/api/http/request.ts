import Method from './method';
import Headers from './headers';

/**
 * Represents an HTTP request.
 * @typeparam T The type of the request data.
 */
interface Request<T> {
    url: URL;
    method: Method;
    headers?: Headers;
    data?: T;
}

export default Request;
