const express = require('express');
const app = express();
const PORT = 3000;

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build a Todo App', completed: true },
    { id: 3, task: 'Learn MongoDB', completed: false }
];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Route to display tasks
app.get('/', (req, res) => {
    res.render('index', { todos: todos });
});

// Route to add a new task
app.post('/add', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        todos.push({ id: newId, task: newTask, completed: false });
    }
    res.redirect('/');
});

// Route to mark a task as completed
app.post('/complete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    res.redirect('/');
});

// Route to delete a task
app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
