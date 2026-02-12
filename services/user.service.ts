import User from "@/models/User";

// Get own profile
export async function getProfile(userId: string) {
  return await User.findById(userId).select("-password");
}

// Update own profile
export async function updateProfile(userId: string, data: any) {
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
  }).select("-password");
}

// Delete own profile
export async function deleteProfile(userId: string) {
  return await User.findByIdAndDelete(userId);
}

// Admin: get all users
export async function getAllUsers() {
  return await User.find().select("-password");
}

// Admin: update user
export async function updateUserByAdmin(id: string, data: any) {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
  }).select("-password");
}

// Admin: delete user
export async function deleteUserByAdmin(id: string) {
  return await User.findByIdAndDelete(id);
}
