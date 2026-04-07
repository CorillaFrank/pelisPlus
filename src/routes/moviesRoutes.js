import { Router } from "express";
import { getAllMovies,createMovie,deleteMovie,updateMovie,getMovieById } from "../controllers/moviesController.js";

const  router = Router();


router.get("/",getAllMovies);
router.get("/:id",getMovieById);
router.post("/",createMovie);
router.put("/:id",updateMovie);
router.delete("/:id",deleteMovie);

export default router;