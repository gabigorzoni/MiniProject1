//Create a function to perform read, write and delete operations
function operations(){
    //Read the file
    const fs = require('fs');

    fs.readFile('Week1_MiniProject1.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log('Week1_MiniProject1.txt', data);
    });


    //Write the file
    const write = 'Name: Gabriela Gorzoni de Souza';

    fs.writeFile('Week1_MiniProject1_WriteContent.txt', write, 'utf8', (err) =>{
        if (err){
            console.error('Error to write in the file:', err);
            return;
        }
        console.log('Content write in the file with sucess.');
    });


    //Delete a file
    fs.unlink('Week1_MiniProject1_DeleteFile.txt', (err) => {
        if (err){
            console.error('Error to delete the file:', err);
            return;
        }
        console.log('File deleted successfully.')
    });

};

//Call the function
operations();