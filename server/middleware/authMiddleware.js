/**
 * AQUA PURE SYSTEM - Authentication Middleware
 * Protects admin routes
 */

/**
 * Admin authentication middleware
 * Checks for admin token in request headers
 */
const authMiddleware = (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers['x-admin-token'] || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token provided'
            });
        }

        // Remove 'Bearer ' prefix if present
        const cleanToken = token.replace('Bearer ', '').trim();

        // Verify token - accept demo tokens or tokens starting with demo-admin-token-
        // Valid tokens: demo-admin-token-*, aquapure-admin-auth-token-2024
        const isValidToken = cleanToken.startsWith('demo-admin-token-') || 
                            cleanToken === 'aquapure-admin-auth-token-2024' ||
                            cleanToken === 'admin123'; // fallback for testing
        
        if (!isValidToken) {
            return res.status(403).json({
                success: false,
                message: 'Invalid authentication token'
            });
        }

        // Token is valid, proceed to next middleware
        req.isAdmin = true;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: error.message
        });
    }
};

/**
 * Optional authentication middleware
 * Checks token but doesn't fail if not provided
 */
const optionalAuth = (req, res, next) => {
    try {
        const token = req.headers['x-admin-token'] || req.headers['authorization'];

        if (token) {
            const cleanToken = token.replace('Bearer ', '').trim();
            const adminSecret = process.env.ADMIN_SECRET;
            
            if (cleanToken === adminSecret) {
                req.isAdmin = true;
            }
        }

        next();

    } catch (error) {
        console.error('Optional auth error:', error);
        next();
    }
};

module.exports = {
    authMiddleware,
    optionalAuth
};
