export default function toEnDigit(s) {
  return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a) {
    return a.charCodeAt(0) & 0xf
  })
}
