const getLocaleDateString = () => {
    return (new Date).toLocaleString('pt-br').split(' ')[0];
}

const getCurrentMonthYearFull = () => {
    const tempDate = new Date();
    const date = (new Date(tempDate.getFullYear(), tempDate.getMonth()))
        .toLocaleString('pt-BR', {month: 'short', year: 'numeric'})
        .toLocaleLowerCase();
    return date.substring(0,3).toUpperCase() +'_'+ date.substring(date.length-4);
}

module.exports = {
    getLocaleDateString,
    getCurrentMonthYearFull
}