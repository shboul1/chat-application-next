export const getBaseURL = () => {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://amer-shboul.me";
};
