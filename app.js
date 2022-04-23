'use strict';
const mongoose = require('mongoose');
const mongoDBUrl = process.env.mongoUrl ||
'mongodb+srv://arunrajeevan:TTest11041991@cluster0.alkek.mongodb.net/agnos?retryWrites=true&w=majority';
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const express = require('express');
const path = require('path');
const fs = require('fs');
const correlator = require('express-correlation-id');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerTools = require('swagger-tools');
const yaml = require('js-yaml');
const routes = require('./routes.js');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(correlator());
// eslint-disable-next-line max-len
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));

app.use(cors());

const ymlPath = path.join(__dirname, '.', 'swagger.yaml');
const swaggerDoc = yaml.load(fs.readFileSync(ymlPath, 'utf8'));
const options = {
  controllers: routes,
  useStubs: (process.env.NODE_ENV === 'dev'),
};

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
  // eslint-disable-next-line max-len
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Start the server
  const port = (process.env.PORT) ? process.env.PORT : 3000;
  app.listen(port, () => console.log(`Coffee App listening at port ${port}`));
});
