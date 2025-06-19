export const validOrgnrPattern = /^\d{9}$/;

export class StringUtils {
    static formatOrgNummer(numberString: string) {
        if (numberString && validOrgnrPattern.test(numberString)) {
            return numberString.match(/\d{3}/g)?.join(' ');
        }
        return null;
    }
}
