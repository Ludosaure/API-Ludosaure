export class CreateMediaCommand {
  public readonly imageBuffer: Buffer;
  public readonly filename: string;

  private constructor(buffer: Buffer, filename: string) {
    this.imageBuffer = buffer;
    this.filename = filename;
  }

  public static of(buffer: Buffer, filename: string): CreateMediaCommand {
    return new CreateMediaCommand(buffer, filename);
  }
}
