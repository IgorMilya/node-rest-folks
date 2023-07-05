import { AnalyticsServices } from "./services.js";

const getTopSalesCategory = async (req, res) => {
  try {
    const data = await AnalyticsServices.getTopSalesCategory(req.query);
    return res.json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const AnalyticsControllers = {
  getTopSalesCategory,
};
