/**
 * Represents the result of an operation, either success with a value of type T,
 * or failure with an error of type E.
 * @typeparam T The type of the success value.
 * @typeparam E The type of the error value.
 */
class Result<T, E extends Error> {
    readonly #ok: T | null;
    readonly #err: E | null;

    private constructor(ok: T | null, error: E | null) {
        if (!ok && !error) {
            throw new Error('Result must have either ok or error');
        }

        if (ok && error) {
            throw new Error('Result cannot have both ok and error');
        }

        this.#ok = ok;
        this.#err = error;
    }

    /**
     * Creates a new Result representing success with the provided value.
     * @param value The value representing the success outcome.
     * @returns A new Result instance representing success.
     */
    public static ok<T, E extends Error>(value: T): Result<T, E> {
        return new Result<T, E>(value, null);
    }

    /**
     * Creates a new Result representing failure with the provided error.
     * @param error The error representing the failure outcome.
     * @returns A new Result instance representing failure.
     */
    public static err<T, E extends Error>(error: E): Result<T, E> {
        return new Result<T, E>(null, error);
    }

    /**
     * Checks if the Result represents a successful outcome.
     * @returns true if the Result represents success, false otherwise.
     */
    public isOk(): this is Result<T, never> {
        return this.#ok !== null;
    }

    /**
     * Checks if the Result represents a failed outcome.
     * @returns true if the Result represents failure, false otherwise.
     */
    public isErr(): this is Result<never, E> {
        return this.#err !== null;
    }

    /**
     * Retrieves the error value from the Result, if present.
     * If the Result represents success, returns null.
     * If the Result represents failure, returns the error value.
     * @returns The error value from the Result, or null if the Result represents success.
     */
    public getErr(): this extends Result<never, E> ? E : E | null {
        return this.#err as E;
    }

    /**
     * Unwraps the Result, returning the success value if present.
     * If the Result represents success, returns the contained value.
     * If the Result represents failure, throws the contained error.
     * @throws {Error} If the Result represents neither success nor failure.
     * @returns The value from the Result if it represents success.
     */
    public unwrap(): T {
        if (this.isOk()) {
            return this.#ok as T;
        }

        if (this.isErr()) {
            throw this.#err as E;
        }

        throw new Error('Unknown error');
    }

    /**
     * Unwraps the Result, returning the success value if present.
     * If the Result represents success, returns the contained value.
     * If the Result represents failure, throws a custom error message.
     * @param {string} message - A custom error message to include if the Result represents failure.
     * @throws {Error} If the Result represents a failure or neither success nor failure.
     * @returns The value from the Result if it represents success.
     */
    public expect(message: string): T {
        if (this.isOk()) {
            return this.#ok as T;
        }

        if (this.isErr()) {
            const err = this.#err as E;
            throw (err.message = `${message}:\n ${err.message}`);
        }

        throw new Error(message);
    }
}

export default Result;
