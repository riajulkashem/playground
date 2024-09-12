import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }
    // Create a unique temporary file name
    const tempFilePath = `/tmp/temp_python_script_${uuidv4()}.py`;

    // Write the code to the temporary file
    fs.writeFile(tempFilePath, code, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writing temporary file' });
        }

        // Execute the Python file
        exec(`python3 ${tempFilePath}`, (err, stdout, stderr) => {
            if (err) {
                return res.status(500).json({ error: stderr || 'Execution error' });
            }

            // Clean up the temporary file
            fs.unlink(tempFilePath, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error deleting temporary file' });
                }
            });

            res.status(200).json({ result: stdout });
        });
    });
}
