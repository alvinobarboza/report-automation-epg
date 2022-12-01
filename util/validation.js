const validation = (yplay, sul, slz, oops) => {
    const yplayPlatform = validateYplay(yplay);
    const tipPlatform = validateTip(sul, slz);
    const oopsPlatform = validateOops(oops);

    return {
        yplayPlatform,
        tipPlatform,
        oopsPlatform
    }
}

const validateYplay = (data) => {
    const yplayPlatform = {
        ollaTotal: 0,
        ollaCustomers: [],
        softxxTotal: 0,
        softxxCustomers: [],
        yplayPlatformTotal: 0,
        yplayPlatformCustomers: [],
        total: 0
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].dealerid === 37) {
            yplayPlatform.softxxTotal++;
            yplayPlatform.softxxCustomers.push(data[i])
        } else if (data[i].vendorid === 29) {
            yplayPlatform.ollaTotal++;
            yplayPlatform.ollaCustomers.push(data[i])
        } else {
            yplayPlatform.yplayPlatformTotal++;
            yplayPlatform.yplayPlatformCustomers.push(data[i]);
        }
    }
    yplayPlatform.total = yplayPlatform.softxxTotal + yplayPlatform.yplayPlatformTotal + yplayPlatform.ollaTotal;
    return yplayPlatform;
}

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
        total: sul.length + slz.length
    }
}

const validateOops = (oops) => {
    for (let i = 0; i < oops.length; i++) {
        oops[i].vendor = 'OOPS';
    }
    return {
        oopsTotal: oops.length,
        oopsCustomers: oops
    }
}

module.exports = validation;