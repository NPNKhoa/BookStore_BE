const handleError = require('../Utils/handleError');
const StatisticService = require('../Services/StatisticService');

class BookController {
  async getTopBooks(_, res) {
    try {
      const topBooks = await StatisticService.getTopBooks();

      res.status(200).json(topBooks);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getTopReaders(_, res) {
    try {
      const topReaders = await StatisticService.getTopReaders();

      res.status(200).json(topReaders);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getMonthlyStat(_, res) {
    try {
      const monthlyStat = await StatisticService.getMonthlyStatistics(2024);

      res.status(200).json(monthlyStat);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BookController();
