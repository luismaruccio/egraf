const dateFormat = require('dateformat');
const moment = require('moment');

function ParseNumberToDB(number) {
    number = number.toString();
    number = number.replace('.','');
    number = number.replace(',','.');
    return number;
}

function ParseNumberToBRLocale(number, currency = false) {
    if (currency)
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
    else
        return new Intl.NumberFormat('pt-BR').format(number);
}

function TinyIntToBool(number) {
    return number == 1 ? true : false;
}

function ParseDateFormat(date, db = true) {
    if (db)
    {
        var dateFull = moment(date, "DD/MM/YYYY HH:mm:ss");
        return dateFull.format("YYYY-MM-DD HH:mm:ss");
    }
    else
    {
        var dateFull = moment(date, "YYYY-MM-DD HH:mm:ss");
        return dateFull.format("DD/MM/YYYY HH:mm:ss"); 
    }
}

module.exports.ParseNumberToDB = ParseNumberToDB;
module.exports.ParseNumberToBRLocale = ParseNumberToBRLocale;
module.exports.TinyIntToBool = TinyIntToBool;
module.exports.ParseDateFormat = ParseDateFormat;