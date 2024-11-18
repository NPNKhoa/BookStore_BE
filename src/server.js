const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDb = require('./configs/dbConnection.js');

const publisherRoutes = require('./Routes/PublisherRoute.js');
const bookRoutes = require('./Routes/BookRoutes.js');
const readerRoutes = require('./Routes/ReaderRoutes.js');
const employeeRoutes = require('./Routes/EmployeeRoutes.js');
const borrowingRecordRoutes = require('./Routes/BorrowingRecordRoutes.js');

dotenv.config({ path: `${process.cwd()}/.env` });

connectDb();

const app = express();
const port = process.env.PORT || 3030;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(logger('dev'));

app.use('/api/publishers', publisherRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/readers', readerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/borrowingRecords', borrowingRecordRoutes);

app.use('*', (_, res) => {
  res.status(404).json({
    error: 'Oops... Can not found this route!!!',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
