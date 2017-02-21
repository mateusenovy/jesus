import Formsy from 'formsy-react';

Formsy.addValidationRule('isOnlySpace', function isOnlySpace(values, value) {
    return typeof(value) === 'string' ? value.trim() !== '' : true;
});

Formsy.addValidationRule('isNotEmpty', function isNotEmpty(values, value) {
    return value === null || value === undefined || value === '';
});

Formsy.addValidationRule('isCnpj', function isCnpj(values, value) {
    //TODO refector
    if (value) {
        let cnpj = value.replace(/[^\d]+/g,'');

        if (cnpj === '') {
            return false;
        }

        if (cnpj.length !== 14) {
            return false;
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj === "00000000000000" || cnpj === "11111111111111" ||
            cnpj === "22222222222222" || cnpj === "33333333333333" ||
            cnpj === "44444444444444" || cnpj === "55555555555555" ||
            cnpj === "66666666666666" || cnpj === "77777777777777" ||
            cnpj === "88888888888888" || cnpj === "99999999999999") {
            return false;
        }

        // Valida DVs
        let tamanho = cnpj.length - 2,
            numeros = cnpj.substring(0,tamanho),
            digitos = cnpj.substring(tamanho),
            soma = 0,
            pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado !== Number(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== Number(digitos.charAt(1))) {
            return false;
        }
    }
    return true;
});

String.prototype.toUpperCaseAllFirstWord = function () {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
