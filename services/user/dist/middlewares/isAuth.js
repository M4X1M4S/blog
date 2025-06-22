import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.user) {
            res.status(401).json({ message: "Not authorized, invalid token" });
            return;
        }
        req.user = decoded.user; // Attach user to request object
        console.log("Authenticated user:", req.user);
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
        return;
    }
};
