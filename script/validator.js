export function validate(forX,forY,forR){
    const errors = {x: '', y: '', r: ''};
    let isValid = true;

    const availableX = [-3,-2,-1,0,1,2,3,4,5];
    const availableR = [1,1.5,2,2.5,3];

    if (forX == null || forX == undefined || forX == ''){
        errors.x = 'Выберите координату Х: ';
        isValid = false;
    } else{
        const numX = Number(forX);
        if (isNaN(numX)||!availableX.includes(numX)){
            errors.x = 'X не в нужном диапазоне';
            isValid = false;
        }
    }

    const regexY = /^-?\d+([\.,]\d+)?$/;
    if (!forY || forY.trim() == ''){
        errors.y = 'Введите координату Y: ';
        isValid = false;
    } else if (!regexY.test(forY.trim())){
        errors.y = 'Y должен быть числом от -5 до 3';
        isValid = false;
    } else {
        const y = parseFloat(forY.replace(',', '.'));
        if (isNaN(y) || y < -5 || y > 3){
            errors.y = 'Y не в нужном диапазоне';
            isValid = false;
        }
    }

    if (!forR){
        errors.r = 'Выберите радиус R';
        isValid = false;
    } else{
        const numR = Number(forR);
        if (isNaN(numR)||!availableR.includes(numR)){
            errors.r = 'R не в нужном диапазоне';
            isValid = false;
        }
    }
    
    return {isValid, errors};
}