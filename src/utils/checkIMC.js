function checkIMC(imc) {
    if (imc < 18.5) {
        return {title: "Maigreur", color: "red-500"};
    } else if (imc >= 18.5 && imc < 25) {
        return {title: "Normal", color: "green-500"};
    } else if (imc >= 25 && imc < 30) {
        return {title: "Surpoids", color: "yellow-500"};
    } else if (imc >= 30 && imc < 35) {
        return {title: "Obésité modérée", color: "orange-500"};
    } else if (imc >= 35 && imc < 40) {
        return {title: "Obésité sévère", color: "red-500"};
    } else if (imc >= 40) {
        return {title: "Obésité morbide", color: "red-500"};
    }
}

export default checkIMC;
