export default function handler(req, res) {
    const { code } = req.body;

    try {
        // Directly return the HTML code
        res.status(200).json({ result: code });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
