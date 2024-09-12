import { exec } from 'child_process';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  const { code } = req.body;

  // Extract the class name from the code (assumes the class is declared as public class ClassName)
  const classNameMatch = code.match(/public\s+class\s+(\w+)/);
  if (!classNameMatch) {
    return res.status(400).json({ error: 'Could not extract class name from code' });
  }
  const className = classNameMatch[1];
  const folder_name = `${uuidv4()}`
  const tempJavaFile = `/tmp/${className}.java`;
  const tempClassFile = `/tmp/${className}.class`;
  console.log("className ", className)
  console.log("file_name ", folder_name)
  console.log("tempJavaFile ", tempJavaFile)
  console.log("tempClassFile ", tempClassFile)

  // Write the Java code to the temp file
  fs.writeFile(tempJavaFile, code, (writeErr) => {
    if (writeErr) {
      console.error('Error writing temporary Java file:', writeErr);
      return res.status(500).json({ error: 'Error writing temporary Java file' });
    }

    console.log(`Temporary Java file created: ${tempJavaFile}`);

    // Compile the Java file
    exec(`javac ${tempJavaFile}`, (compileErr, stdout, stderr) => {
      if (compileErr) {
        console.error('Error compiling Java file:', stderr);
        fs.unlink(tempJavaFile, () => { }); // Clean up temp file
        return res.status(500).json({ error: stderr || 'Error compiling Java file' });
      }

      console.log(`Java file compiled: ${tempClassFile}`);

      // Execute the compiled Java class
      exec(`java -cp /tmp ${className}`, (execErr, stdout, stderr) => {
        // Clean up the temp files
        fs.unlink(tempJavaFile, () => { });
        fs.unlink(tempClassFile, () => { });

        if (execErr) {
          console.error('Error executing Java file:', stderr);
          return res.status(500).json({ error: stderr || 'Error executing Java file' });
        }

        console.log('Java execution successful');

        // Send the result back to the client
        res.status(200).json({ result: stdout });
      });
    });
  });
}
