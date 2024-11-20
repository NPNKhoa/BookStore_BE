const BookDAO = require('../DataAccess/BookDAO');
const Book = require('../Models/Book');
const BorrowingRecord = require('../Models/BorrowingRecord');
const { NotFoundError, ConflictError } = require('../Utils/Error');

class BookService {
  async getTopBooks() {
    const pipeline = [
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      {
        $unwind: '$bookInfo',
      },
      {
        $group: {
          _id: '$bookId',
          title: { $first: '$bookInfo.title' },
          author: { $first: '$bookInfo.author' },
          borrowCount: { $sum: 1 },
        },
      },
      {
        $sort: { borrowCount: -1 },
      },
    ];

    const topBooks = await BorrowingRecord.aggregate(pipeline);

    if (Array.isArray(topBooks) && topBooks.length === 0) {
      throw new NotFoundError('Can not found books');
    }

    return topBooks;
  }

  async getTopReaders() {
    const pipeline = [
      {
        $lookup: {
          from: 'readers',
          localField: 'readerId',
          foreignField: '_id',
          as: 'readerInfo',
        },
      },
      {
        $unwind: '$readerInfo',
      },
      {
        $group: {
          _id: '$readerId',
          firstName: { $first: '$readerInfo.firstName' },
          lastName: { $first: '$readerInfo.lastName' },
          phone: { $first: '$readerInfo.phone' },
          borrowCount: { $sum: 1 },
        },
      },
      {
        $sort: { borrowCount: -1 },
      },
    ];

    const topReaders = await BorrowingRecord.aggregate(pipeline);

    if (Array.isArray(topReaders) && topReaders.length === 0) {
      throw new NotFoundError('Can not found readers');
    }

    return topReaders;
  }

  async getMonthlyStatistics() {
    const currentYear = new Date().getFullYear();

    const pipeline = [
      {
        $addFields: {
          borrowMonth: { $month: '$borrowDate' },
          borrowYear: { $year: '$borrowDate' },
          returnMonth: {
            $cond: {
              if: { $not: ['$returnDate'] },
              then: null,
              else: { $month: '$returnDate' },
            },
          },
          returnYear: {
            $cond: {
              if: { $not: ['$returnDate'] },
              then: null,
              else: { $year: '$returnDate' },
            },
          },
        },
      },

      {
        $match: {
          $or: [{ borrowYear: currentYear }, { returnYear: currentYear }],
        },
      },

      {
        $group: {
          _id: '$borrowMonth',
          borrowingBooks: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: 'books',
          pipeline: [
            {
              $addFields: {
                month: { $month: '$createdAt' },
                year: { $year: '$createdAt' },
              },
            },
            {
              $match: { year: currentYear },
            },
            {
              $group: {
                _id: '$month',
                bookCount: { $sum: '$quantity' },
              },
            },
          ],
          as: 'booksByMonth',
        },
      },
      {
        $unwind: {
          path: '$booksByMonth',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          month: '$_id',
          borrowingBooks: 1,
          bookCount: '$booksByMonth.bookCount',
        },
      },

      {
        $sort: { month: 1 },
      },
    ];

    const stats = await BorrowingRecord.aggregate(pipeline);

    const result = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      borrowingBooks: 0,
      bookCount: 0,
    }));

    stats.forEach((stat) => {
      result[stat.month - 1].borrowingBooks = stat.borrowingBooks;
      result[stat.month - 1].bookCount = stat.bookCount || 0;
    });

    return result;
  }
}

module.exports = new BookService();
