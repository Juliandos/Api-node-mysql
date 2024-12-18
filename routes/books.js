import express from "express";
const routes = express.Router();

// Ruta GET para obtener todos los libros
routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) throw err;

    conn.query("SELECT * FROM books", (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  });
});

// Ruta POST para agregar un nuevo libro
routes.post("/", (req, res) => {
  const { titulo, autor, edicion } = req.body;

  if (!titulo || !autor || !edicion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: "Error en la conexión" });

    const query = "INSERT INTO books (titulo, autor, edicion) VALUES (?, ?, ?)";
    conn.query(query, [titulo, autor, edicion], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Error al insertar el libro" });

      res.status(201).json({
        message: "Libro agregado correctamente",
        id: result.insertId,
      });
    });
  });
});

// Ruta PUT para actualizar un libro
routes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, edicion } = req.body;

  if (!titulo || !autor || !edicion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: "Error en la conexión" });

    const query = "UPDATE books SET titulo = ?, autor = ?, edicion = ? WHERE id = ?";
    conn.query(query, [titulo, autor, edicion, id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar el libro" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      res.json({ message: "Libro actualizado correctamente" });
    });
  });
});

// Ruta DELETE para eliminar un libro
routes.delete("/:id", (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    if (err) return res.status(500).json({ error: "Error en la conexión" });

    const query = "DELETE FROM books WHERE id = ?";
    conn.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error al eliminar el libro" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      res.json({ message: "Libro eliminado correctamente" });
    });
  });
});

export default routes;
