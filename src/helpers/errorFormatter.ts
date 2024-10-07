import { Request } from "express";

function formatPrismaError(error: { message: string }, req: Request) {
  let messages = [];

  // Handle missing required fields
  if (error.message.includes("Argument")) {
    // Extract field name from the error message
    const match = error.message.match(/Argument `(.*?)` is missing/);
    if (match) {
      const fieldName = match[1]; // Get the field name (e.g., "phone_number")
      messages.push({
        path: fieldName,
        message: `${fieldName.replace(/_/g, " ")} is required`,
      });
    }
  }

  // Return fallback for non-specific errors
  if (!messages.length) {
    messages.push({
      path: req.originalUrl,
      message: error?.message || "An unknown error occurred",
    });
  }

  return { errorMessages: messages };
}

export default formatPrismaError;
