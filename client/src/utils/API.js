import axios from "axios";

// All routes should follow the pattern 'API.dbname.CRUDrequest'.
// Data should follow db schemas.

// Creating an axios instance - more config params can  be added, for now baseURL makes code DRY.
const API = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Family axios routes
const family = {
  get: (params) => API.get("/family", { params }),
  findIdByCode: (data) => API.post("/family/code", data),
  update: (data, params) => API.put("/family", data, { params }),
  create: (data) => API.post("/family", data),
  archive: (params) => API.put("/family/archive", { params }),
};

// User axios routes
const users = {
  // data for comparePassword must contain email and password
  comparePassword: (data) => API.post("/user", data),
  getMe: (headers) => API.get("user/me", headers),
  get: (params) => API.get("/user", { params }),
  update: (data, params) => API.put("/user", data, { params }),
  create: (data) => API.post("/user/family", data),
  archive: (params) => API.put("/user/archive", { params }),
};

// Recipe axios routes
// Note that for creating a new recipe, the param must be the FAMILY id.
// Also for create, data must contain the author's _id (from the user object).
const recipes = {
  get: (params) => API.get("/recipe", { params }),
  update: (data, params) => API.put("/recipe", data, { params }),
  create: (data, params) => API.post("/recipe/family", data, { params }),
  archive: (params) => API.put("/recipe/archive", { params }),
};

// Discussion Topics axios routes
const discussionTopics = {
  // Gets All Discussion Topics
  get: () => API.get("/discussiontopics"),

};

// Exporting API methods
export default {
  family,
  users,
  recipes,
  discussionTopics,
};
