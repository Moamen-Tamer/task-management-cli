import * as fs from "fs/promises";
import * as path from "path";
import {
    Task,
    TaskCategory,
    TaskPriority,
    TaskNotFoundError,
    InvalidTaskDataError,
    FileOperationError
} from "./task.js";

const TASK_FILE = path.join(process.cwd(), 'tasks.json');

export class TaskManager {
    private tasks: Task[] = [];
    private nextID: number = 1;

    constructor () {};

    async loadTasks(): Promise<void> {
        try {
            const data = await fs.readFile(TASK_FILE, 'utf-8');
            const parsedData = JSON.parse(data);

            this.tasks = parsedData.tasks.map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt),
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined
            }));

            this.nextID = parsedData.nextID;
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                this.tasks = [];
                this.nextID = 1;
            } else {
                throw new FileOperationError('load tasks', error as Error);
            }
        }
    }

    async saveTasks(): Promise<void> {
        try {
            const data = {
                tasks: this.tasks,
                nextID: this.nextID
            }

            await fs.writeFile(TASK_FILE, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            throw new FileOperationError('save tasks', error as Error);
        }
    }

    async addTask(
        title: string,
        description: string,
        category?: TaskCategory,
        priority?: TaskPriority,
        dueDate?: Date
    ): Promise<Task> {
        if (!title.trim()) {
            throw new InvalidTaskDataError('Title cannot be empty');
        }

        const newTask: Task = {
            id: this.nextID++,
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date(),
            category,
            priority,
            dueDate
        };

        this.tasks.push(newTask);
        await this.saveTasks();
        return newTask;
    }

    async editTask(
        id: number,
        updates: Partial<Omit<Task, 'id' | 'createdAt'>>
    ): Promise<Task> {
        const task: Task | undefined= this.tasks.find(t => t.id === id);

        if (!task) {
            throw new TaskNotFoundError(id);
        }

        Object.assign(task, updates);
        await this.saveTasks();
        return task;
    }

    async deleteTask (id: number): Promise<void> {
        const index = this.tasks.findIndex(t => t.id === id);

        if (!index) {
            throw new TaskNotFoundError(id);
        }

        this.tasks.splice(index, 1);
        await this.saveTasks();
    }

    async toggleTaskComplete (id: number): Promise<Task> {
        const task = this.tasks.find(t => t.id === id);

        if (!task) {
            throw new TaskNotFoundError(id);
        }

        task.completed = !task.completed;
        await this.saveTasks();
        return task;
    }

    getTasks(): Task[] {
        return [...this.tasks];
    } 

    searchTasks (query: string): Task[] {
        const lowerQuery = query.toLowerCase();

        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(lowerQuery) || 
            task.description.toLocaleLowerCase().includes(lowerQuery)
        );
    }

    filterByCategory (category: TaskCategory): Task[] {
        return this.tasks.filter(task => task.category === category);
    }

    filterByPriority (priority: TaskPriority): Task[] {
        return this.tasks.filter(task => task.priority === priority);
    }

    getOverdueTasks(): Task[] {
        const now = new Date();
        return this.tasks.filter(task => task.dueDate && task.dueDate < now && !task.completed);
    } 
}