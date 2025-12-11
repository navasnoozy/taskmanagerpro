import mongoose, { Document, Model, Schema } from "mongoose";

interface TaskAttrs {
  title: string;
  description?: string;
  userId: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
}

interface TaskDoc extends Document {
  title: string;
  description?: string;
  userId: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskModel extends Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new Schema<TaskDoc>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret.__v;
      },
    },
  }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
