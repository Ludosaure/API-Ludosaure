export class AppUtils {
  public static tva = 0.2
  public static logoUrl = "https://kengo.bzh/media/image/aaf9a0e8-b90f-4727-8d5d-1b94ab6f7a6c_sticker-kengojpg.jpg"
  public static address = "2 BIS Boulevard Cahours, Janzé, France"

  public static roundToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
