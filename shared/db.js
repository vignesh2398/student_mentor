const mongoose = require("mongoose");
const schema = mongoose.Schema;

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://QuizApp:2WKeigxo38yXUaC7@cluster0.487qx.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    );
    console.log("DB Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};

const studentSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: schema.Types.ObjectId,
    default: null,
    ref: "mentor",
  },
});

const student = mongoose.model("student", studentSchema, "student");

const mentorSchema = schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentor", mentorSchema, "mentor");

module.exports = { dbConnect, student, mentor };
