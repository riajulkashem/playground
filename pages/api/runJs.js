import { createContext, Script } from 'vm';

export default async function handler(req, res) {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'No code provided' });
        }

        // Define a result array to capture console output
        const result = [];

        // Create a sandboxed context with a fully functional console
        const sandbox = {
            console: {
                log: (...args) => result.push(args.join(' ')),
                error: (...args) => result.push('Error: ' + args.join(' '))
            },
            result
        };
        const context = createContext(sandbox);

        // Create and run the script
        const script = new Script(code);
        script.runInContext(context);

        // Return the result
        res.status(200).json({ result: result.join('\n') || 'No output' });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.status(500).json({ error: `Unexpected error: ${err.message}` });
    }
}
