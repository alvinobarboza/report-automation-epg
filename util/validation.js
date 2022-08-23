const validation = (yplay, sul, slz) => {
    const yplayPlatform = validateYplaySoftx(yplay);
    const tipPlatform = validateTip(sul, slz);

    return {
        yplayPlatform,
        tipPlatform
    }
}

const validateYplaySoftx = (data) => {
    const yplayPlatform = {
        softxxTotal: 0,
        softxxCustomers: [],
        yplayPlatformTotal: 0,
        yplayPlatformCustomers: [],
        total: 0
    }

    for (let i = 0; i < data.length; i++) {
        if(data[i].dealerid === 37){
            yplayPlatform.softxxTotal++;
            yplayPlatform.softxxCustomers.push(data[i])
        }else{
            yplayPlatform.yplayPlatformTotal++;
            yplayPlatform.yplayPlatformCustomers.push(data[i]);
        }        
    }
    yplayPlatform.total = yplayPlatform.softxxTotal+yplayPlatform.yplayPlatformTotal;
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

module.exports = validation;