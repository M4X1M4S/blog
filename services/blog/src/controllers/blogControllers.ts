import { authenticatedRequest } from "../middlewares/isAuth.js";
import { Response, Request } from "express";
import { sql } from "../utils/db.js";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { searchQuery, category } = req.query;
    let blogs;
    if (searchQuery && category) {
      blogs = await sql`SELECT * FROM blogs WHERE (title ILIKE ${
        "%" + searchQuery + "%"
      } OR description ILIKE ${"%" + searchQuery + "%"} OR blogcontent ILIKE ${
        "%" + searchQuery + "%"
      }) AND category=${category} ORDER BY create_at DESC `;
    } else if (searchQuery) {
      blogs = await sql`SELECT * FROM blogs WHERE title ILIKE ${
        "%" + searchQuery + "%"
      } OR description ILIKE ${"%" + searchQuery + "%"} OR blogcontent ILIKE ${
        "%" + searchQuery + "%"
      }  ORDER BY create_at DESC `;
    } else if (category) {
      console.log("category", category);
      blogs =
        await sql`SELECT * FROM blogs WHERE category=${category} ORDER BY create_at DESC `;
    } else {
      blogs = await sql`SELECT * FROM blogs ORDER BY create_at DESC `;
    }
    res.json({ blogs: blogs, message: "Blogs fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  try {
    if (!blogId) {
      res.status(400).json({ message: "Blog ID is required" });
      return;
    }
    const blog = await sql`SELECT * FROM blogs WHERE id=${blogId}`;
    if (blog.length === 0) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const author = blog[0].author;
    try {
      const authorDetails = await fetch(
        "http://localhost:5000/api/v1/profile/" + author
      );
      const authorData = await authorDetails.json();

      res.json({
        blog: blog[0],
        author: authorData.user,
        message: "Blog and author fetched successfully",
      });
    } catch (error) {
      res.json({ message: "Author details not found", blog: blog[0] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
