'use strict';

//local
// exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/ComicPostTestDb';
// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/ComicPostTestDb';
// exports.PORT = process.env.PORT || 8080;

//mlab
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://test:thinkful1@ds151863.mlab.com:51863/comic-journal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/ComicPostTestDb';
exports.PORT = process.env.PORT || 8080;