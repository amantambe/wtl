import express from 'express';
const router=express.Router();
    router.get("/",(req,res)=>{
        res.send("Admin Homepage")
    })
    router.get("/dashboard",(req,res)=>{
        res.send("Admin Dashboard  page")
    })

export default router;