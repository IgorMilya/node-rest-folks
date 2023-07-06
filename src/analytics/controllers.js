import { AnalyticsServices } from "./services.js";

const getTopSalesCategory = async (req, res) => {
  try {
    const data = await AnalyticsServices.getTopSalesCategory(req.query);
    return res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
};
const general = async (req, res) => {
  try {
    const data = await AnalyticsServices.general(req.query);
    return res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
};

const generalTotal = async (req, res) => {
  try {
    const data = await AnalyticsServices.generalTotal(req.query);
    return res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
};

export const AnalyticsControllers = {
  getTopSalesCategory,
  general,
  generalTotal,
};
