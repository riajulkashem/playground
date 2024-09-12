import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  const { code } = req.body;

  // Remove PHP tags if present
  const cleanedCode = code.replace(/<\?php|<\?|(\?>)/g, '');

  // Create a unique temporary file name
  const tempFilePath = `/tmp/temp_php_script_${uuidv4()}.php`;

  // Write the cleaned PHP code to the temp file
  fs.writeFile(tempFilePath, `<?php\n${cleanedCode}`, (writeErr) => {
    if (writeErr) {
      console.error('Error writing temporary PHP file:', writeErr);
      return res.status(500).json({ error: 'Error writing temporary PHP file' });
    }

    // Execute the temp PHP file
    exec(`php -f ${tempFilePath}`, (err, stdout, stderr) => {
      // Clean up the temp file
      fs.unlink(tempFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting temporary PHP file:', unlinkErr);
        }
      });

      // Handle errors from the PHP execution
      if (err) {
        console.error('PHP execution error:', stderr);
        return res.status(500).json({ error: stderr || 'Unknown error executing PHP' });
      }

      // Log the output and send the result back to the client
      res.status(200).json({ result: stdout });
    });
  });
}
