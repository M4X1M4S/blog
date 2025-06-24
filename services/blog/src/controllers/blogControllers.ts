import { authenticatedRequest } from "../middlewares/isAuth.js";
import { Response } from "express";
import { sql } from "../utils/db.js";

export const getAllBlogs = async (req: authenticatedRequest, res: Response) => {
  try {
    const { searchQuery, category } = req.query;
    let blogs;
    if (searchQuery && category) {
      blogs = await sql`SELECT * FROM blogs WHERE title ILIKE ${
        "%" + searchQuery + "%"
      } OR description ILIKE ${"%" + searchQuery + "%"} OR blogcontent ILIKE ${
        "%" + searchQuery + "%"
      } AND category=${category} ORDER BY create_at DESC `;
    } else if (searchQuery) {
      blogs = await sql`SELECT * FROM blogs WHERE title ILIKE ${
        "%" + searchQuery + "%"
      } OR description ILIKE ${"%" + searchQuery + "%"} OR blogcontent ILIKE ${
        "%" + searchQuery + "%"
      }  ORDER BY create_at DESC `;
    } else if (category) {
      blogs =
        await sql`SELECT * FROM blogs WHERE category=${category} ORDER BY create_at DESC `;
    } else {
      const blogs = await sql`SELECT * FROM blogs ORDER BY create_at DESC `;
    }
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
