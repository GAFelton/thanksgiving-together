import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1",
});

const family = {
  get: (params) => API.get("/family", { params }),
  update: (data, params) => API.put("/family", data, { params }),
  create: (data) => API.post("/", data),
  archive: (params) => API.put("/family/archive", { params }),
};

const users = {
  comparePassword: (data) => API.post("/", data),
  get: (params) => API.get("/user", { params }),
  update: (data, params) => API.put("/user", data, { params }),
  create: (data, params) => API.post("/user/family", data, { params }),
  archive: (params) => API.put("/user/archive", { params }),
};

const recipes = {
  get: (params) => API.get("/recipe", { params }),
  update: (data, params) => API.put("/recipe", data, { params }),
  create: (data, params) => API.post("/recipe/family", data, { params }),
  archive: (params) => API.put("/recipe/archive", { params }),
};

const discussionTopics = {
  // Gets All Discussion Topics
  get: () => API.get("/discussiontopics"),

};

export default {
  family,
  users,
  recipes,
  discussionTopics,
  // Gets all books
  getBooks() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook(id) {
    return axios.get(`/api/books/${id}`);
  },
  // Deletes the book with the given id
  deleteBook(id) {
    return axios.delete(`/api/books/${id}`);
  },
  // Saves a book to the database
  saveBook(bookData) {
    return axios.post("/api/books", bookData);
  },
};
