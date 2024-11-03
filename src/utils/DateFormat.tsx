export function DateFormat(date: string, format: string) {
  let d = new Date(date);
  if(isNaN(d.getTime())) {
    date = date.split("-").reverse().join("-");
    d = new Date(date);
    if(isNaN(d.getTime())) {
      return date;
    }
  };
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const hr = new Intl.DateTimeFormat("en", { hour: "2-digit" }).format(d);
  const mi = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(d);
  const sc = new Intl.DateTimeFormat("en", { second: "2-digit" }).format(d);
  format = format.toLowerCase();
  switch (format) {
    case "dd-mm-yyyy":
        return `${da}-${mo}-${ye}`;
    case "dd-mm-yyyy hh:mm:ss":
        return `${da}-${mo}-${ye} ${hr}:${mi}:${sc}`;
    case "dd-mm-yyyy hh:mm:ss.ms":
        return `${da}-${mo}-${ye} ${hr}:${mi}:${sc}`;
    case "dd-mm-yyyy hh:mm:ss.ms":
        return `${da}-${mo}-${ye} ${hr}:${mi}:${sc}`;

    case "dd-mm-yyyy hh:mm AM/PM":
        return `${da}-${mo}-${ye} ${hr}:${mi} ${d.getHours() >= 12 ? "PM" : "AM"}`;
    case "yyyy-mm-dd":
      return `${ye}-${mo}-${da}`;
    case "yyyy-mm-dd hh:mm:ss":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    case "yyyy-mm-dd hh:mm:ss.ms":
      return `${ye}-${mo}-${da} ${hr}:${mi}:${sc}`;
    default:
      return `${ye}-${mo}-${da}`;
  }
}
