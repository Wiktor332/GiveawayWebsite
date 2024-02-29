var cron = require('node-cron');

const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Endpoint to execute the Python script
app.get('/run-python', (req, res) => {
  const pythonScriptPath = req.query.script;

  // Execute the Python script
  exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${stderr}`);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`Python script executed successfully: ${stdout}`);
      res.send('Python script executed successfully');
    }
  });
});

// Schedule the cron job to run every 22 hours
cron.schedule('0 0 */22 * * *', () => {
  console.log('Running a task every 22 hours');
  executePythonScript('./python/api.py');
});

// Execute the Python script when the server starts
const pythonScriptPath = './python/api.py';
exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script on server start: ${stderr}`);
  } else {
    console.log(`Python script executed successfully on server start: ${stdout}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
