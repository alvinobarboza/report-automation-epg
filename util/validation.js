const validation = (yplay, sul, slz, oops, colombia) => {
    const yplayPlatform = validateYplay(yplay);
    const tipPlatform = validateTip(sul, slz);
    const oopsPlatform = validateOops(oops);
    const colombiaPlatform = validateColombia(colombia);

    return {
        yplayPlatform,
        tipPlatform,
        oopsPlatform,
        colombiaPlatform,
    };
};

/**
 * @param {ColombiaReport[]} data
 * @returns {ColombiaData[]}
 */
const validateColombia = (data) => {
    const colombiaData = [];
    const vendor = {};
    for (let i = 0; i < data.length; i++) {
        if (vendor[data[i].vendorid]) {
            vendor[data[i].vendorid].customers.push(data[i]);
            vendor[data[i].vendorid].total++;
        } else {
            vendor[data[i].vendorid] = {
                name: data[i].vendor,
                customers: [data[i]],
                total: 1,
            };
            colombiaData.push(vendor[data[i].vendorid]);
        }
    }
    return colombiaData;
};

const validateYplay = (data) => {
    const yplayPlatform = {
        ollaTotal: 0,
        ollaCustomers: [],
        softxxTotal: 0,
        softxxCustomers: [],
        yplayPlatformTotal: 0,
        yplayPlatformCustomers: [],
        total: 0,
    };

    for (let i = 0; i < data.length; i++) {
        if (data[i].dealerid === 37) {
            yplayPlatform.softxxTotal++;
            yplayPlatform.softxxCustomers.push(data[i]);
        } else if (data[i].vendorid === 29) {
            yplayPlatform.ollaTotal++;
            yplayPlatform.ollaCustomers.push(data[i]);
        } else {
            yplayPlatform.yplayPlatformTotal++;
            yplayPlatform.yplayPlatformCustomers.push(data[i]);
        }
    }
    yplayPlatform.total =
        yplayPlatform.softxxTotal +
        yplayPlatform.yplayPlatformTotal +
        yplayPlatform.ollaTotal;
    return yplayPlatform;
};

const validateTip = (sul, slz) => {
    for (let i = 0; i < sul.length; i++) {
        sul[i].vendor = 'TIP';
    }
    for (let i = 0; i < slz.length; i++) {
        slz[i].vendor = 'SLZ';
    }
    return {
        sulTotal: sul.length,
        sulCustomers: sul,
        slzTotal: slz.length,
        slzCustomers: slz,
        total: sul.length + slz.length,
    };
};

const validateOops = (oops) => {
    for (let i = 0; i < oops.length; i++) {
        oops[i].vendor = 'OOPS';
    }
    return {
        oopsTotal: oops.length,
        oopsCustomers: oops,
    };
};

module.exports = validation;

/**
 * @typedef {Object} ColombiaReport
 * @property {number} smsid
 * @property {number} id
 * @property {string} login
 * @property {number} vendorid
 * @property {vendor} vendor
 * @property {string} dealer
 * @property {number} dealerid
 */

/**
 * @typedef {Object} ColombiaData
 * @property {string} name
 * @property {ColombiaReport[]} customers
 * @property {number} total
 */
