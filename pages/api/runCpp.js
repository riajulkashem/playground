import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  const { code } = req.body;

  // Create unique temporary file names
  const tempFilePath = `/tmp/temp_cpp_script_${uuidv4()}.cpp`;
  const tempExecPath = `/tmp/temp_cpp_script_${uuidv4()}`;

  // Write the C++ code to the temp file
  fs.writeFile(tempFilePath, code, (writeErr) => {
    if (writeErr) {
      return res.status(500).json({ error: 'Error writing temporary C++ file' });
    }

    // Compile the C++ file
    exec(`g++ ${tempFilePath} -o ${tempExecPath}`, (compileErr, stdout, stderr) => {
      if (compileErr) {
        // Clean up temp files if compilation fails
        fs.unlink(tempFilePath, () => { });
        return res.status(500).json({ error: stderr || 'Unknown error compiling C++ code' });
      }

      // Run the compiled executable
      exec(tempExecPath, (runErr, stdout, stderr) => {
        // Clean up temp files
        fs.unlink(tempFilePath, () => { });
        fs.unlink(tempExecPath, () => { });

        if (runErr) {
          return res.status(500).json({ error: stderr || 'Unknown error running C++ code' });
        }

        // Send the result back to the client
        res.status(200).json({ result: stdout });
      });
    });
  });
}
