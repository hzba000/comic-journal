'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://test:thinkful1@ds151863.mlab.com:51863/comic-journal';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://test:thinkful1@ds253713.mlab.com:53713/test-comic-journal';
exports.PORT = process.env.PORT || 8080;


exports.JWT_SECRET = process.env.JWT_SECRET || 'default';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';