import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  const { code } = req.body;

  // Create a unique temporary file name
  const tempFilePath = `/tmp/temp_go_script_${uuidv4()}.go`;

  // Write the Go code to the temp file
  fs.writeFile(tempFilePath, code, (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ error: 'Error writing temporary Go file' });
    }

    // Execute the Go file
    exec(`go run ${tempFilePath}`, (err, stdout, stderr) => {
      // Clean up the temp file
      fs.unlink(tempFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting temporary Go file:', unlinkErr);
        }
      });

      // Handle errors from the Go execution
      if (err) {
        return res.status(500).json({ error: stderr || 'Unknown error executing Go code' });
      }

      // Send the result back to the client
      res.status(200).json({ result: stdout });
    });
  });
}
