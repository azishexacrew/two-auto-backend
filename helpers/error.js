const Sentry = require('@sentry/node');

const setupErrorReport = () => {
    Sentry.init({ dsn: 'https://509166863a0f42de83f94af546134965@sentry.io/1396981' });
};

module.exports = {
    setupErrorReport
};