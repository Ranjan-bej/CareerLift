const fs = require('fs').promises;
const path = require('path');

async function readData(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

async function writeData(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
