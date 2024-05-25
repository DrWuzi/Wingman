/**
 * Represents an error that contains an enum.
 * @template T The enum type of the error.
 */
class EnumError<T extends number> extends Error {
    readonly #error: T;

    /**
     * Create a new instance.
     * @param message The error message.
     * @param error The enum error value.
     */
    public constructor(message: string, error: T) {
        super(message);

        this.#error = error;

        Object.setPrototypeOf(this, EnumError.prototype);
    }

    /**
     * Get the enum error value.
     * @returns The enum error value.
     */
    public get error(): T {
        return this.#error;
    }
}

export default EnumError;
