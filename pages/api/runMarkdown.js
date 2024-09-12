import { marked } from 'marked';

export default function handler(req, res) {
    const { code } = req.body;

    try {
        const html = marked(code); // Convert Markdown to HTML
        console.log(html)
        res.status(200).json({ result: html });
    } catch (error) {
        // Log the error to debug
        console.error('Error converting Markdown to HTML:', error);
        res.status(500).json({ error: error.message });
    }
}
