/*select*from movies*/

import pool  from "../config/database.js";


export const getAllMovies = async (req, res) => {
    try {
            const movies = await pool.query("SELECT * FROM movies");
            res.json(movies.rows);
    } catch (error) {
        console.error("Error al obtener toda las peliculas",error);
        res.status(500).json({ error: "Error de base de datos" });
    }

};   
export const getMovieById = async (req, res) => {
    try {
    const movies=await pool.query("SELECT * FROM movies WHERE id = $1", [req.params.id]);
    res.json(movies.rows[0]);        
    } catch (error) {
        console.error("Error al obtener la pelicula",error);
        res.status(500).json({ error: "Error de base de datos" });
    }
};

export const createMovie = async (req, res) => {
    try {
         const movies= await pool.query("INSERT INTO movies (title, description, director, genre, image_url, release_date) VALUES ($1, $2, $3, $4, $5, $6)", 
         [req.body.title,req.body.description, req.body.director, req.body.genre, req.body.image_url, req.body.release_date]);
         res.json(movies.rows[0]);        
    } catch (error) {
        console.error("Error al crear la pelicula",error);
        res.status(500).json({ error: "Error de base de datos" });
        
    }
};
export const updateMovie = async (req, res) => {
    try {
        const movies= await pool.query("UPDATE movies SET title = $1, description = $2, director = $3, genre = $4, image_url = $5, release_date = $6 WHERE id = $7",    
         [req.body.title,req.body.description, req.body.director, req.body.genre, req.body.image_url, req.body.release_date, req.params.id]);
         res.json(movies.rows[0]);        
    } catch (error) {
        console.error("Error al actualizar la pelicula",error);
        res.status(500).json({ error: "Error de base de datos" });
        
    }
};
export const deleteMovie = async (req, res) => {
    try {
    const movies= await pool.query("DELETE FROM movies WHERE id = $1", [req.params.id]);
    res.json(movies.rows[0]);
    } catch (error) {
        console.error("Error al eliminar la pelicula",error);
        res.status(500).json({ error: "Error de base de datos" });
    }
};