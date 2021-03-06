export function prettyBytes(num: number): string {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  if (typeof num !== "number" || isNaN(num)) {
    throw new TypeError("Expected a number");
  }

  const neg = num < 0;
  const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (neg) num = -num;

  if (num < 1) return (neg ? "-" : "") + num + " B";

  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    units.length - 1
  );
  const calc_num = (num / Math.pow(1000, exponent)).toFixed(2);
  const unit = units[exponent];

  return (neg ? "-" : "") + calc_num + " " + unit;
}
