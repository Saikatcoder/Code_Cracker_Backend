import { db } from '../libs/db.js';
import bcrypt from 'bcryptjs';
import { UserRole } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';


// reggister route controller
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({
      message: 'all fields are reqire',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters' });
  }

  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Password must contain at least one uppercase letter, one number, and one special character.',
    });
  }

  try {
    const existingser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingser) {
      return res.status(400).json({
        error: 'user alredy exists',
      });
    }
    const hasedPassword = await bcrypt.hash(password, 15);
    const newUser = await db.user.create({
      data: {
        email,
        password: hasedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({
        success:true,
      message: 'user created sucessfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error('error creating user', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    try {
      const user = await db.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
  
      res.status(200).json({
        success:true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
      });
    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

//   logout controller
export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt',{
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error('Error logout user', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const check = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};
