import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto_super_seguro";

export const register = async (req, res) => {

    try {
    const { username, email, password } = req.body;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2" , [email,username]);
    if(userCheck.rows.length > 0){
        return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);
    res.status(201).json({ message: "Usuario registrado exitosamente", user: result.rows[0] });    

    } catch (error) {
        console.status(500).json({error : error.message});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(result.rows.length === 0){
            return res.status(400).json({ error: "Credenciales inválidas" });
        }
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({ error: "Credenciales inválidas" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login exitoso", token,user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};