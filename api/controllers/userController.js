const User = require("../models/user");

const getUserById = async (req, res) => {
  const { userId } = req.params;

  // Validar si userId no está presente o no es válido
  if (!userId || !mongoose.isValidObjectId(userId)) {
    console.log(`Invalid userId: ${userId}`);
    return res.status(400).json({ error: "Invalid user ID" });
  }

  console.log(`Fetching user with ID: ${userId}`);

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User with ID ${userId} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User data:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUserById,
};
