import axios from "axios";

export default {
  // Gets All Discussion Topics
  getDiscussTopics() {
    return axios.get("/api/discussiontopics");
  },
};
