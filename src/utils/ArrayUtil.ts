export abstract class ArrayUtil {
  public static IsArrayAndHasItems(array: unknown): boolean {
    return ArrayUtil.IsArray(array) && (array as Array<unknown>).length > 0;
  }

  public static IsArray(array: unknown): boolean {
    if (!array) {
      return false;
    }
    return Array.isArray(array);
  }
}
