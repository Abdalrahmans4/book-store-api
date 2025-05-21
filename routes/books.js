import express from 'express';
// import pgclient  from '../db';
import pgclient from '../db.js';

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const users = await pgclient.query("SELECT * FROM books;");
        res.json(users.rows);
    } catch (error) {

    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pgclient.query("SELECT * FROM books WHERE id = $1;", [id]);
        res.json(user.rows[0]);
    } catch (error) {

    }
});
router.post("/", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const user = await pgclient.query("INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *;", [title, author, year]);
        res.json(user.rows[0]);
    } catch (error) {

    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const user = await pgclient.query("UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *;", [title, author, year, id]);
        res.json(user.rows[0]);
    } catch (error) {

    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pgclient.query("DELETE FROM books WHERE id = $1 RETURNING *;", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
