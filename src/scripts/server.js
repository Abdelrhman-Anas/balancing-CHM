const express = require('express');
const path = require('path');
const periodicTable = require('periodic-table');
const app = express();
const PORT = 3000;

// Serve JS files with correct MIME type
app.use('/js', express.static(path.join(__dirname, '../public/js'), {
    setHeaders: (res, path) => {
        res.set('Content-Type', 'application/javascript');
    }
}));

// Serve other static files
app.use(express.static(path.join(__dirname, '../public')));

// API endpoints
app.get('/api/elements', (req, res) => {
    res.json(periodicTable.all());
});

app.get('/api/element/:symbol', (req, res) => {
    const element = periodicTable.symbols[req.params.symbol.toUpperCase()];
    res.json(element);
});

app.listen(PORT, () => {
    console.log('Server: http://localhost:' + PORT);
});
