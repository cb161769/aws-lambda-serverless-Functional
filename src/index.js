const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GraphQlSchema = require("../models/deviceReadingsModel");
var { graphqlHTTP } = require('express-graphql');
const {
    routes: userRoutes,
} = require('../routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/IotDevice',userRoutes);
app.use('/graphQL',cors(), graphqlHTTP({
    schema: GraphQlSchema,
    rootValue:global,
    graphiql: true,
}));


module.exports = app;