const fs = require('fs');

// Read the file
fs.readFile('Week1_MiniProject1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});
