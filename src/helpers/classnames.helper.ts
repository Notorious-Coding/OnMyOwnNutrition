export default function toClassName(
    ...classNames: (string | undefined)[]
  ): string | undefined {
    if (classNames.length === 0) {
      return "";
    }
  
    return classNames.reduce((prev, curr) => {
      if (curr === undefined) {
        return prev;
      }
      return prev + " " + curr;
    });
  }
  