export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();

    // Log the COOKIE_EXPIRE environment variable for debugging
    console.log("COOKIE_EXPIRE:", process.env.COOKIE_EXPIRE);

    // Default to 7 days if COOKIE_EXPIRE is undefined or invalid
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 7;
    
    // Calculate expiration date
    const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
    
    // Log the expiration date to confirm it is a valid Date object
    console.log("Expiration Date:", expirationDate);

    // Options for the cookie
    const cookieOptions = {
        expires: expirationDate,  // Expiration date as a Date object
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    };

    // Set the cookie and send the response
    res
      .status(statusCode)
      .cookie("token", token, cookieOptions)
      .json({
          success: true,
          message,
          user,
          token,
      });
};


         
