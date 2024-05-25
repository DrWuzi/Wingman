/**
 * Represents the headers of a HTTP request.
 */
class Headers {
    readonly #headers: Record<string, string>;

    /**
     * Create a new Headers object.
     */
    public constructor(headers: Record<string, string> = {}) {
        this.#headers = headers;
    }

    /**
     * Set a header.
     * @param key the key of the header
     * @param value the value of the header
     */
    public set(key: string, value: string): void {
        this.#headers[key] = value;
    }

    /**
     * Insert a set of headers.
     * Already existing headers will be overwritten.
     * @param headers the headers to insert
     */
    public insert(headers: Record<string, string>): void {
        Object.assign(this.#headers, headers);
    }

    /**
     * Remove a header.
     * @param key the key of the header to remove
     */
    public remove(key: string): void {
        delete this.#headers[key];
    }

    /**
     * Get a header.
     * @param key the key of the header to get
     * @returns the value of the header, or undefined if the header does not exist
     */
    public get(key: string): string | undefined {
        return this.#headers[key];
    }

    /**
     * Check if a header exists.
     * @param key the key of the header to check
     * @returns true if the header exists, false otherwise
     */
    public has(key: string): boolean {
        return key in this.#headers;
    }

    /**
     * Get all headers.
     * @returns all headers
     */
    public get headers(): Record<string, string> {
        return this.#headers;
    }

    // For each
    public forEach(callback: (key: string, value: string) => void): void {
        for (const key in this.#headers) {
            callback(key, this.#headers[key]);
        }
    }
}

export default Headers;
