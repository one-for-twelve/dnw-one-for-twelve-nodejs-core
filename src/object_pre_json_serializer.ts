export class ObjectPreJsonSerializer {
  public static copy<TSource>(
    from: TSource,
    customize: (from: TSource, to: any) => void
  ): any {
    const src = from as any;
    const dest = {} as any;

    for (const key of Object.keys(src)) {
      if (src[key] !== null) {
        dest[key] = src[key];
      }
    }

    customize(from, dest);

    return dest;
  }
}
