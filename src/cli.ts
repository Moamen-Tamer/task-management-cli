import * as readline from "readline/promises";
import {stdin, stdout, exit} from "node:process";
import {Task, TaskCategory, TaskPriority} from "./task.js";
import {TaskManager} from "./taskManager.js";

const taskManager = new TaskManager();

const rl = readline.createInterface({input: stdin, output: stdout});

function question (query: string): Promise<string> {
    return rl.question(query);
}

function displayTask (task: Task): void {
    const status = task.completed ? '✓' : ' ';
    const priority = task.priority ? `[${task.priority.toUpperCase()}]` : ' ';
    const category = task.category ? `(${task.category})` : ' ';
    const dueDate = task.dueDate ? `${task.dueDate.toLocaleDateString()}` : ' ';

    console.log(`id: ${task.id}`);
    console.log(`title: ${task.title}`);
    console.log(`description: ${task.description}`);
    console.log(`status: ${status}`);

    if (task.category) {
        console.log(`category: ${category}`);
    }

    if (task.priority) {
        console.log(`priority: ${priority}`);
    }

    if (task.dueDate) {
        console.log(`dueDate: ${dueDate}`);
    }

    console.log(' ');
}

function displayMenu(): void {
    console.log('\n=== Task Manager CLI ===');
    console.log('1. Add Tasks');
    console.log('2. List All Tasks');
    console.log('3. Toggle Task Complete');
    console.log('4. Edit Task');
    console.log('5. Delete Task');
    console.log('6. Search Tasks');
    console.log('7. Filter By Category');
    console.log('8. Show Overdue Tasks');
    console.log('9. Exit');
    console.log(' ');
}

async function addTaskFlow (): Promise<void> {
    try {
        const titleInput = await question('Task Title: ');
        const descriptionInput = await question('Task Description: ');
        const categoryInput = await question('Category (work/personal/shopping/health/other) [optional]: ');
        const priorityInput = await question('Priority (low/medium/high) [optional]: ');
        const dueDateInput = await question('Due Date [YYYY-MM-DD] [optional]: ');

        const title = titleInput.trim();
        const description = descriptionInput.trim();
        const category = categoryInput.trim() ? categoryInput.trim() as TaskCategory : undefined;
        const priority = priorityInput.trim() ? priorityInput.trim() as TaskPriority : undefined;
        const dueDate = dueDateInput.trim() ? new Date(dueDateInput.trim()) : undefined;

        const task = await taskManager.addTask(title, description, category, priority, dueDate);
        console.log('\n✓ Task added successfully!');
        displayTask(task);
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

async function editTaskFlow(): Promise<void> {
    try {
        const idInput = await question('Enter Task ID: ');
        const id = parseInt(idInput);

        const title = await question('New title (leave empty to keep current): ');
        const description = await question('New description (leave empty to keep current): ');
        const categoryInput = await question('New category (work/personal/shopping/health/other) [optional]: ');
        const priorityInput = await question('New priority (low/medium/high) [optional]: ');
        const dueDateInput = await question('New due date (YYYY-MM-DD) [optional]: ');
        
        const updates: any = {};
        if (title.trim()) updates.title = title.trim();
        if (description.trim()) updates.description = description.trim();
        if (categoryInput.trim()) updates.category = categoryInput.trim();
        if (priorityInput.trim()) updates.priority = priorityInput.trim();
        if (dueDateInput.trim()) updates.dueDate = new Date(dueDateInput.trim());

        const task = await taskManager.editTask(id, updates);
        console.log('\n✓ Task edited successfully!');
        displayTask(task);
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

async function listTaskFlow(): Promise<void> {
    const tasks = taskManager.getTasks();

    if (tasks.length === 0) {
        console.log('\nNo tasks found.');
        return;
    }

    console.log('\n=== All Tasks ===\n');
    tasks.forEach(displayTask);
}

async function toggleCompleteFlow(): Promise<void> {
    try {
        const idInput = await question('Enter Task ID: ');
        const id = parseInt(idInput);

        const task = await taskManager.toggleTaskComplete(id);
        console.log('\n✓ Task updated!');
        displayTask(task);
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

async function deleteTaskFlow(): Promise<void> {
    try {
        const idInput = await question('Enter Task ID: ');
        const id = parseInt(idInput);

        taskManager.deleteTask(id);
        console.log('\n✓ Task deleted successfully!');
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

async function searchTasksFlow(): Promise<void> {
    const query = await question('Search query: ');

    if (!query.trim()) {
        console.log('invalid input');
        return
    }

    const tasks = taskManager.searchTasks(query);

    if (tasks.length === 0) {
        console.log('\nNo tasks found matching your query.');
    }
    
    console.log(`\n=== Search Results (${tasks.length}) ===\n`);
    tasks.forEach(displayTask);
}

async function filterByCategoryFlow(): Promise<void> {
    const categoryInput = await question('Category (work/personal/shopping/health/other): ');
    const category = categoryInput.trim();

    if (!category) {
        console.log('invalid input');
        return;
    }

    const tasks = await taskManager.filterByCategory(category as TaskCategory);

    if (tasks.length === 0) {
        console.log('\nNo tasks found in this category.');
        return;
    }

    console.log(`\n=== ${category} Tasks ===\n`);
    tasks.forEach(displayTask);
}

async function showOverdueFlow(): Promise<void> {
    const tasks = taskManager.getOverdueTasks();

    if (tasks.length === 0) {
        console.log('\nNo overdue tasks!');
        return;    
    }

    console.log('\n=== Overdue Tasks ===\n');
    tasks.forEach(displayTask);
}

async function main():  Promise<void> {
    console.log('loading tasks...');
    await taskManager.loadTasks();
    console.log('Tasks loaded successfully!');

    let running = true;

    while (running) {
        displayMenu();
        const choice = await question('Choose an option: ');
        
        switch (choice.trim()) {
            case '1':
                await addTaskFlow();
                break;
            case '2':
                await listTaskFlow();
                break;
            case '3':
                await toggleCompleteFlow();
                break;
            case '4':
                await editTaskFlow();
                break;
            case '5':
                await deleteTaskFlow();
                break;
            case '6':
                await searchTasksFlow();
                break;
            case '7':
                await filterByCategoryFlow();
                break;
            case '8':
                await showOverdueFlow();
                break;
            case '9':
                running = false;
                console.log('\nGoodbye!');
                break;
            default:
                console.log('\nInvalid option. Please try again.');
        }
    }

    rl.close();
}

try {
    await main();
} catch (error) {
    console.error('Fatal error:', error);
    exit(1);
}