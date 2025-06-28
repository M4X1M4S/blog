import { v2 as cloudinary } from "cloudinary";
import getBuffer from "../utils/datauri.js";
import { sql } from "../utils/db.js";
import { invalidateChacheJob } from "../utils/rabbitmq.js";
export const createBlog = async (req, res) => {
    try {
        const { title, description, blogcontent, category } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "Upload Image" });
            return;
        }
        const buffer = getBuffer(file);
        if (!buffer || !buffer.content) {
            res.status(400).json({ message: "No Buffer for the uploaded Image" });
            return;
        }
        const cloud = await cloudinary.uploader.upload(buffer.content, {
            folder: "blogs",
        });
        const result = await sql `INSERT INTO blogs (title,description,blogcontent,image,category,author) VALUES (${title},${description},${blogcontent},${cloud.secure_url},${category},${req.user?._id}) RETURNING *`;
        res.json({
            message: "Blog Created Successfully",
            blog: result,
        });
        await invalidateChacheJob(["blogs:*"]);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const { title, description, blogcontent, category } = req.body;
        const blog = await sql `SELECT * FROM blogs WHERE id = ${id}`;
        if (!blog.length) {
            res.status(404).json({
                message: "No Blog with this id",
            });
            return;
        }
        if (req.user?._id !== blog[0].author) {
            res.status(401).json({
                message: "You are not a author of this blog",
            });
            return;
        }
        let imageUrl = blog[0].image;
        if (file) {
            const buffer = getBuffer(file);
            if (!buffer || !buffer.content) {
                res.status(400).json({ message: "No Buffer for the uploaded Image" });
                return;
            }
            const cloud = await cloudinary.uploader.upload(buffer.content, {
                folder: "blogs",
            });
            imageUrl = cloud.secure_url;
        }
        const updatedBlog = await sql `UPDATE blogs SET image=${imageUrl},  title = ${title || blog[0].title},
  description = ${description || blog[0].description},
  blogcontent = ${blogcontent || blog[0].blogcontent},
  category = ${category || blog[0].category}
  WHERE id = ${id}
  RETURNING *
  `;
        res.json({
            message: "Blog updated sucessfully",
            updatedBlog: updatedBlog[0],
        });
        await invalidateChacheJob(["blogs:*", `blog:${id}`]);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await sql `SELECT * FROM blogs WHERE id=${id}`;
        if (!blog.length) {
            res.status(404).json({
                message: "No Blog with this id",
            });
            return;
        }
        if (req.user?._id !== blog[0].author) {
            res.status(401).json({
                message: "You Don't own this blog",
            });
            return;
        }
        await sql `DELETE FROM savedblogs WHERE blogid = ${id}`;
        await sql `DELETE FROM comments WHERE blogid = ${id}`;
        await sql `DELETE FROM blogs WHERE id = ${id}`;
        res.json({
            message: "Blog Delete",
        });
        await invalidateChacheJob(["blogs:*", `blog:${req.params.id}`]);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
