export interface Task {
    id: Number;
    title: string,
    description: string;
    completed: boolean;
    createdAt: Date;
    category?: TaskCategory;
    priority?: TaskPriority;
    dueDate?: Date;
}

export type TaskCategory = "work" | "personal" | "shopping" | "health" | "other";
export type TaskPriority = "low" | "medium" | "high";

export class TaskNotFoundError extends Error {
    constructor (taskId: number) {
        super(`Task with ID ${taskId} is not found`);
        this.name = "TaskNotFoundError";
    }
}

export class InvalidTaskDataError extends Error {
    constructor (message: string) {
        super(`Invalid task data: ${message}`);
        this.name = "InvalidTaskDataError";
    }
}

export class FileOperationError extends Error {
    constructor (operation: string, originalError: Error) {
        super(`Failed to ${operation}: ${originalError.message}`);
        this.name = "FileOperationError"
    }
}