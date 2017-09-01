const moment = require('moment');
/*var date = moment(2879887441534);
console.log(date.format('HH:mm:ss - DD.MM.YYYY'));*/

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment.valueOf()
    }
};

module.exports = {
    generateMessage
};

