
import mongoose from "mongoose";

interface UserSchemaTypes {
  userId: string;
  avatarImageURL?: string;
  username: string;
  email: string;
  displayName: string;
  dateOfBirth: Date;
  phoneNumber?: number;
  countryCode?: number;
  country: string;
  password: string;
  lastLoggedIn: Date;
  registeredDate: Date;
  lastProfileUpdated: Date;
}

const userSchema = new mongoose.Schema<UserSchemaTypes>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  avatarImageURL: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  countryCode: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  lastLoggedIn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  registeredDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastProfileUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema, "users");

export default UserModel;
