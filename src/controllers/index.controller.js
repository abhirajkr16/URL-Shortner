import { getHomeMessage } from "../services/index.service.js";

export const getHome = (req, res) => {
  const response = getHomeMessage();

  res.status(200).json(response);
};
