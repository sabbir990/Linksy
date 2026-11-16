
import mongoose from "mongoose";

export interface FriendType{
  friendEmail: string,
  status: "accepted" | "pending" | "rejected",
  actionDate: Date,
}

export interface UserSchemaTypes {
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
  friends?: FriendType[]
}

const friendSchema = new mongoose.Schema<FriendType>({
  friendEmail: {type: String, trim: true, lowercase: true, unique: true, required: true},
  status: {type: String, lowercase: true, required: true},
  actionDate: {type: Date, required: true, default: Date.now}
})

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
    unique: true,
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
  friends: {
    type: [friendSchema],
    default: []
  } 
});

const UserModel =
  mongoose.models.users || mongoose.model("users", userSchema, "users");

export default UserModel;
