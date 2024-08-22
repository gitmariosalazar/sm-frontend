import moment from 'moment';
/**
 * Convierte una fecha en formato ISO 8601 a un formato YYYY-MM-DD.
 * @param {string} isoDate - La fecha en formato ISO 8601 (e.g., "2016-03-20T23:49:42Z").
 * @returns {string} La fecha en formato YYYY-MM-DD.
 */
function formatDate (isoDate) {
    var isodate = new Date(isoDate);
    var localedateformat = isodate.toLocaleDateString('en-US');
    return localedateformat
}


function getDateFormat (isoDate) {
    const formattedDate = moment(isoDate).format('ddd, MMM D YYYY');
    return formattedDate
}

function addDays (n) {
    const fecha = moment().add(n, 'days');
    return getDateFormat(fecha.toISOString())
}


const transformData = (data) => {
    if (data) {
        const resultMap = {};
        data.forEach(category => {
            const categoryName = category.language;

            category.data.forEach(item => {
                const language = item.name;
                const value = item.value;

                if (!resultMap[language]) {
                    resultMap[language] = {language};
                }

                resultMap[language][categoryName] = value;
            });
        });

        return Object.values(resultMap);
    }
    else {
        return null
    }
};


const transformDataFunnet = (data) => {
    if (data) {
        const aggregation = {};
        data.forEach(item => {
            const {language, Forks, Watches, Stars} = item;
            if (!aggregation[language]) {
                aggregation[language] = {value: 0};
            }
            aggregation[language].value += (Forks || 0) + (Watches || 0) + (Stars || 0);
        });

        return Object.keys(aggregation).map(name => ({
            name,
            value: parseFloat(aggregation[name].value / 3, 2).toFixed(2)
        }));
    } else {
        return null
    }
};


export {formatDate, getDateFormat, addDays, transformData, transformDataFunnet}

