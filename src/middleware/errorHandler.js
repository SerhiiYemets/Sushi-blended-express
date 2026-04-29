import { HttpError } from "http-errors";
import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.error("Error Middleware:", err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: `Invalid ${err.path}`,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');

    return res.status(400).json({ message });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};

