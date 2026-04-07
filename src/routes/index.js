import { Router } from "express";

const router = Router();


router.get("/", (req, res) => {
    res.render("partials/index", { title: "PelisPlus" });
});
router.get ("/about", (req, res) => {
    res.render("partials/about",{title:"about"});
});
router.get ("/cartelera", (req, res) => {
    res.render("partials/cartelera",{title:"cartelera"});
}); 
router.get ("/loginCliente", (req, res) => {
    res.render("partials/loginCliente",{title:"loginCliente"});
});
router.get ("/promociones", (req, res) => {
    res.render("partials/promociones",{title:"promociones"});
});
router.get ("/register", (req, res) => {
    res.render("partials/register",{title:"register"});
});

export default router; // vamos exportar por vamos usar router