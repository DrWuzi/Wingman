import * as FS from '../file-system/file-system';

const logQueue: Array<() => Promise<void>> = [];
let _overwriteExistingLogs: boolean = false;
let _silentLog: boolean = false;

function getDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

function formatMessage(level: string, message: string) {
    return `[${getDateTime()}] [${level}] ${message}`;
}

async function createLogFile(initialMessage = ''): Promise<void> {
    return new Promise(function (resolve, reject) {
        FS.writeFileRaw('wingman-log.txt', `==========> Created at ${getDateTime()} <==========\n${initialMessage}`)
            .then(() => {
                console.log(formatMessage('INFO', 'Successfully created log file.'));
                resolve();
            })
            .catch(error => {
                console.log(formatMessage('CRITICAL', 'Failed to create log file. ' + error));
                reject(error);
            });
    });
}

function addToQueue(action: () => Promise<void>) {
    logQueue.push(action);

    if (logQueue.length === 1) {
        // If the queue was empty, start processing the queue
        processQueue().then();
    }
}

async function processQueue(): Promise<void> {
    while (logQueue.length > 0) {
        const action = logQueue[0];
        try {
            await action();
        } finally {
            // Remove the completed action from the queue
            logQueue.shift();
        }
    }
}

function log(message: string, silentLog: boolean = false) {
    addToQueue(async () => {
        if (!silentLog) {
            console.log(message);
        }

        try {
            await FS.appendFileRaw('wingman-log.txt', message + '\n');
        } catch (error) {
            if (!silentLog) {
                console.log(formatMessage('INFO', 'Log file not found. Attempting to create log file...'));
            }

            await createLogFile(message + '\n');
        }
    });
}

export function logDebug(message: string) {
    log(formatMessage('DEBUG', message), _silentLog);
}

export function logInfo(message: string) {
    log(formatMessage('INFO', message), _silentLog);
}

export function logWarning(message: string) {
    log(formatMessage('WARNING', message), _silentLog);
}

export function logError(message: string) {
    log(formatMessage('ERROR', message), _silentLog);
}

export function logCritical(message: string) {
    log(formatMessage('CRITICAL', message), _silentLog);
}

export async function initLogSystem(overwriteExistingLogs: boolean = false, silentLog: boolean = false): Promise<void> {
    _overwriteExistingLogs = overwriteExistingLogs;
    _silentLog = silentLog;

    if (_overwriteExistingLogs || !(await FS.exists('wingman-log.txt'))) {
        await createLogFile();
    } else {
        log(`\n==========> Created at ${getDateTime()} <==========`, true);
    }
}
