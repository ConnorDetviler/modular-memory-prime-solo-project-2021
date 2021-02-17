const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const detailsRouter = require('./routes/details.router');
const patchNamesRouter = require('./routes/patch-names.router');
const patchRouter = require('./routes/patch.router');
const allPatchesRouter = require('./routes/all-patches.router');
const allTagsRouter = require('./routes/all-tags.router');
const { eventNames } = require('./modules/pool');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/details', detailsRouter);
app.use('/api/patch-names', patchNamesRouter);
app.use('/api/patch', patchRouter);
app.use('/api/all-patches', allPatchesRouter);
app.use('/api/all-tags', allTagsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
