export abstract class NumberUtil {
  public static IsPositiveInteger(num: unknown): boolean {
    return NumberUtil.isNumber(num) && +num! > 0 && Number.isInteger(num);
  }

  public static getOrdinalSuffix(num: number): string {
    if (num === 11 || num === 12 || num === 13) {
      return 'th';
    }

    const lastChar = num.toString().slice(-1);
    switch (lastChar) {
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default:
        return 'th';
    }
  }

  public static getRandomIntegerBetweenTwoNumbers(
    min: number,
    max: number
  ): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static isNumber(num: unknown): boolean {
    if (typeof num === 'number') {
      return num - num === 0;
    }

    if (typeof num === 'string' && num.trim() !== '') {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }

    return false;
  }
}
