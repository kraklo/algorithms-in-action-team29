export default function (procedure, bookmark) {
  for (const codeblock of Object.keys(procedure)) {
    for (const line of procedure[codeblock]) {
      if (line.bookmark === bookmark) {
        return line;
      }
    }
  }
  return null;
}
