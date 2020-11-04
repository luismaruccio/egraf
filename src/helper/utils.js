function ParseNumberToDB(number) {
    number = number.replace('.','');
    number = number.replace(',','.');
    return number;
}

function ParseNumberToBRLocale(number, currency = false) {
    if (currency)
        return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    else
        return Number(number).toLocaleString('pt-BR');
}

function TinyIntToBool(number) {
    return number == 1 ? true : false;
}

module.exports.ParseNumberToDB = ParseNumberToDB;
module.exports.ParseNumberToBRLocale = ParseNumberToBRLocale;
module.exports.TinyIntToBool = TinyIntToBool;