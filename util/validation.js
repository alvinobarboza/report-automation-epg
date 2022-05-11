const validation = (yplay, tip, slz, cnn) => {
    const totalSoftx = validateYplaySoftx(yplay);
    const { totalTip, totalSLZ, totalCNN } = validateGenericCount({tip, slz, cnn});

    return {
        totalSoftx,
        totalTip,
        totalSLZ,
        totalCNN
    }
}

const validateYplaySoftx = (data) => {
    const softx = [];
    const LOGIN = 'login';
    const PACKAGES = 'packages';
    data.forEach(customer => {
        if(customer.dealerid === 37){
            softx.push(customer)
        }
    })

    const softxGrouped = groupByGeneric(softx, LOGIN, PACKAGES);

    return softxGrouped.length;
}

const validateGenericCount = (data) => {
    const {tip, slz, cnn} = data;
    const LOGIN = 'login';
    const PACKAGES = 'packages';
    
    const tipGrouped = groupByGeneric(tip, LOGIN, PACKAGES);
    const slzGrouped = groupByGeneric(slz, LOGIN, PACKAGES);
    const cnnGrouped = groupByGeneric(cnn, LOGIN, PACKAGES);

    return {
        totalTip: tipGrouped.length,
        totalSLZ: slzGrouped.length,
        totalCNN: cnnGrouped.length
    }
}

const groupByGeneric = (ungrouped, delimiter, dataToGroup) => {
    const group = new Set();
    ungrouped.forEach(r => group.add(r[delimiter]));
    const groupedValues = [];
    group.forEach(d => {
        const value = {};
        value[delimiter] = d;
        value[dataToGroup] = [];
        ungrouped.forEach(e => {
            if(e[delimiter] === d){
                value[dataToGroup].push(e)
            }
        });
        groupedValues.push(value);
    });
    return groupedValues;
}


module.exports = validation;