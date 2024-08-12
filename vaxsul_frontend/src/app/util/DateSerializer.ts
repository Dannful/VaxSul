export function serializeDate(date: Date) {
  return (
    padZerosIfNeeded(date.getFullYear()) +
    "-" +
    padZerosIfNeeded(date.getMonth() + 1) +
    "-" +
    padZerosIfNeeded(date.getDate())
  );
}

export function serializeDateTime(date: Date) {
  let iso = date.toISOString();
  return iso.slice(0, iso.length - 5);
}

export function deserializeDateTime(isoString: string) {
  return new Date(isoString + "Z");
}

export function deserializeDate(isoString: string) {
  return new Date(isoString);
}

function padZerosIfNeeded(n: number) {
  return n < 10 ? "0" + n : n.toString();
}
