const express = require('express');
const path = require('path');
const periodicTable = require('periodic-table');
const { matrixLib } = require('@jeremyqzt/nodestats');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

// PubChem route - search by name
app.get('/api/pubchem/compound/name/:name/JSON', async (req, res) => {
    try {
        const name = req.params.name;
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/JSON`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PubChem route - search by formula
app.get('/api/pubchem/compound/fastformula/:formula/JSON', async (req, res) => {
    try {
        const formula = req.params.formula;
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${encodeURIComponent(formula)}/JSON`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/js', express.static(path.join(__dirname, '../public/js'), {
  setHeaders: (res, path) => {
    res.set('Content-Type', 'application/javascript');
  }
}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/elements', (req, res) => {
  res.json(periodicTable.all());
});

app.get('/api/element/:symbol', (req, res) => {
  const element = periodicTable.symbols[req.params.symbol.toUpperCase()];
  res.json(element);
});

app.post('/api/rref', (req, res) => {
  try {
    const { matrix } = req.body;
    
    if (!matrix || !Array.isArray(matrix)) {
      return res.status(400).json({ error: 'Invalid matrix input' });
    }
    
    const rrefMatrix = matrixLib.rowCanonicalMatrix(matrix);
    res.json({ result: rrefMatrix });
  } catch (error) {
    console.error('RREF computation error:', error);
    res.status(500).json({ error: 'Failed to compute RREF' });
  }
});

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT);
});