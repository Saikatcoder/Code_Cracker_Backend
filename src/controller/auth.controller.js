import { db } from "../libs/db.js";
import bcrypt from 'bcryptjs'
import { UserRole } from "../generated/prisma/index.js";
import jwt from 'jsonwebtoken';
import validator  from 'validator';
// reggister route controller
export const registerUser = async (req, res)=>{
    const {email, password, name} = req.body;

    if(!email || !password || !name) {
        res.status(400).json({
            message:"all fields are reqire"
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    
      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must contain at least one uppercase letter, one number, and one special character." 
      });
    }

    try {
        const existingser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existingser){
            return res.status(400).json({
                error:"user alredy exists"
            })
        }
        const hasedPassword = await bcrypt.hash(password, 15)
        const newUser = await db.user.create({
            data:{
                email,
                password:hasedPassword,
                name,
                role:UserRole.USER
            }
        })

    const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie('jwt', token ,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== 'development',
        maxAge : 1000 * 60 * 60 * 24 * 7
    })

    res.status(201).json({
        message: "user created sucessfully",
        user:{
            id:newUser.id,
            email:newUser.email,
            name:newUser.name,
            role:newUser.role,
            image:newUser.image
        }
    })
    } catch (error) {
        console.error("error creating user",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const login = async (req, res)=>{

}

export const logout = async (req, res)=>{

}

export const check =  async (req, res)=>{

}