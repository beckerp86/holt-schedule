export abstract class ArrayUtil {
  public static IsArrayAndHasItems(array: any): boolean {
    return array !== undefined && array !== null && Array.isArray(array) && array.length > 0;
  }
}
