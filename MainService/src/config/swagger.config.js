const swaggerAutogen = require("swagger-autogen")();

// Define the Swagger documentation
const doc = {
  info: {
    title: "CodeHorizon Main API Documentation",
    description: "Auto-generated API documentation",
  },
  host: "localhost:3001", // Adjust to match your server's host
  schemes: ["http"], // Specify the schemes used (http, https)
};

// Specify where to output the Swagger JSON file and which route files to scan
const outputFile = "./swagger.json"; // Output Swagger JSON file
const endpointsFiles = ["../routes/*.ts"]; // Route files to scan

swaggerAutogen(outputFile, endpointsFiles, doc);
