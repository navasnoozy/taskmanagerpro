import { Schema, model, Document, Model, Query } from "mongoose";
import { hashPassword } from "../utils/hashPassword";


export type Provider = "credentials" | "google" | "github" | "facebook";

export interface UserAttrs {
  name: string;
  email: string;
  password?: string;
  providers?: Provider[];
  providerIds?: Map<string, string>;
  lastLogin?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  providers: Provider[];
  providerIds?: Map<string, string>;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function (this: UserDoc) {
        const prov = this.providers ?? ["credentials"];
        return prov.includes("credentials");
      },
    },

    providers: {
      type: [String],
      enum: ["credentials", "google", "github", "facebook"],
      default: ["credentials"],
    },

    providerIds: {
      type: Map,
      of: String,
      default: undefined,
    },



  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await hashPassword(this.get("password") as string);
    this.set("password", hashed);
  }
  done();
});



userSchema.statics.build = function (attrs: UserAttrs) {
  return new this(attrs);
};

export const User = model<UserDoc, UserModel>("User", userSchema);