import { ElNotification } from "element-plus";

export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
    try {
        JSON.stringify(obj);
    } catch (e) {
        return false;
    }
    return true;
}

export function showErrorMessage(message: string): void {
    ElNotification({
        title: 'Error',
        message,
        type: 'error',
    });
}
