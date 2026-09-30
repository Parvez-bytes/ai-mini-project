const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  academicLevel: user.academicLevel,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'User profile fetched successfully.',
    data: { user: sanitizeUser(req.user) }
  });
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, academicLevel } = req.body;

    if (name !== undefined) {
      req.user.name = name;
    }

    if (academicLevel !== undefined) {
      req.user.academicLevel = academicLevel;
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully.',
      data: { user: sanitizeUser(req.user) }
    });
  } catch (error) {
    next(error);
  }
};
