# 📝 Task Management CLI

A TypeScript-based command-line application for managing tasks with categories, priorities, and due dates. Built with Node.js and featuring persistent JSON storage.

## 🎯 About This Project

This project was built as part of my journey learning TypeScript and backend development. Through this hands-on project, I gained practical experience with:

- **TypeScript's type system** including interfaces, union types, and utility types
- **Node.js file system operations** using the modern async/await API
- **Error handling patterns** with custom error classes
- **CLI development** with interactive user input
- **Project architecture** separating concerns (types, business logic, UI layer)

While following a structured learning approach, I:
-  Typed all code manually to build muscle memory and understanding
-  Fixed strict type checking errors
-  Ensured I understood each function's purpose before implementation

## ✨ Features

- **Add tasks** with title, description, category, priority, and due dates
- **Edit tasks** to update any field
- **Delete tasks** when no longer needed
- **Mark tasks complete** with toggle functionality
- **Search tasks** by title or description
- **Filter by category** (work, personal, shopping, health, other)
- **Filter by priority** (low, medium, high)
- **View overdue tasks** automatically
- **Persistent storage** using JSON file system

## 🛠️ Technologies & Concepts

### Core Technologies
- **TypeScript 5+** - Static typing and modern JavaScript features
- **Node.js** - Runtime environment
- **File System (fs/promises)** - Async file operations
- **Readline (readline/promises)** - Interactive CLI input

### TypeScript Concepts Applied
- **Interfaces** - Defining task structure with type safety
- **Union Types** - Restricting values to specific options
- **Type Guards** - Safe type checking with error handling
- **Utility Types** - Using `Partial<>` and `Omit<>` for flexible updates
- **Custom Error Classes** - Extending built-in Error class for specific error types
- **Strict Mode** - Working with `exactOptionalPropertyTypes` and other strict settings

### Design Patterns
- **Separation of Concerns** - Types, business logic, and UI in separate files
- **Single Responsibility** - Each class/function has one clear purpose
- **Error Handling** - Try-catch blocks with typed error handling
- **Async/Await** - Modern asynchronous programming patterns

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **TypeScript** (installed via npm in this project)

## 🚀 Installation & Setup

1. **Clone or download** this repository

2. **Navigate to project directory**
   ```bash
   cd task-management-cli
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Compile TypeScript to JavaScript**
   ```bash
   npm run build
   ```

5. **Run the application**
   ```bash
   npm start
   ```

## 💻 Usage

### Main Menu
```
=== Task Management CLI ===
1. Add task
2. List all tasks
3. Toggle task complete
4. Edit task
5. Delete task
6. Search tasks
7. Filter by category
8. Show overdue tasks
9. Exit
```

### Example Workflow

**Adding a task:**
```
Choose an option: 1
Task title: Complete TypeScript project
Description: Finish the task management CLI
Category (work/personal/shopping/health/other) [optional]: work
Priority (low/medium/high) [optional]: high
Due date (YYYY-MM-DD) [optional]: 2025-10-20

✓ Task added successfully!
[1] [HIGH] Complete TypeScript project (work)
    Finish the task management CLI
    Due: 10/20/2025
```

**Viewing all tasks:**
```
Choose an option: 2

=== All Tasks ===

[ ] 1. [HIGH] Complete TypeScript project (work)
    Finish the task management CLI
    Due: 10/20/2025

[✓] 2. [MEDIUM] Buy groceries (shopping)
    Milk, bread, eggs
```

## 📂 Project Structure

```
task-management-cli/
├── src/
│   ├── task.ts           # Task interface, types, and error classes
│   ├── taskManager.ts    # Core business logic and file operations
│   └── cli.ts            # User interface and menu system
├── dist/                 # Compiled JavaScript (auto-generated)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔧 Configuration

### TypeScript Configuration (`tsconfig.json`)

Key settings used:
- `target: ES2022` - Modern JavaScript features
- `module: node16` - Node.js module system
- `strict: true` - All strict type checking enabled
- `exactOptionalPropertyTypes: false`

### NPM Scripts

```json
"scripts": {
  "build": "tsc",                  // Compile TypeScript
  "start": "node dist/cli.js",     // Run compiled code
  "dev": "tsc && node dist/cli.js" // Build and run
}
```

## 📚 What I Learned

### Technical Skills
- How to structure a TypeScript project with proper configuration
- Working with Node.js built-in modules (fs, path, readline)
- Implementing async/await patterns for file operations
- Creating interactive CLI applications
- Managing strict TypeScript settings and resolving type errors

### Problem-Solving
- Debugging `exactOptionalPropertyTypes` errors with optional properties
- Understanding the difference between `__dirname` and `process.cwd()`
- Resolving module import issues with `.js` extensions in TypeScript
- Handling file operations with proper error handling

### Software Engineering Practices
- Separation of concerns (types, business logic, UI)
- Writing maintainable and readable code
- Using meaningful variable and function names
- Implementing proper error handling strategies

## 🤝 Contributing

This is a learning project, but feedback and suggestions are welcome! Feel free to:
- Open an issue for bugs or suggestions
- Fork the repository and experiment
- Share your own improvements

## 📄 License

This project is open source and available under the MIT License.

## 📞 Contact

**Mo'men Tamer** - [LinkedIn link](www.linkedin.com/in/mo-men-tamer-86a57b336)

Project Link: [Repo's Link](https://github.com/Moamen-Tamer/task-management-cli)
