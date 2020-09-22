import 'source-map-support/register';

import { app } from './app';
import { logger } from './infrastructure/logger';

const port = process.env.PORT || 8080;

app.listen(port, function () {
  logger.info('express api listening on port %d', port);
});
