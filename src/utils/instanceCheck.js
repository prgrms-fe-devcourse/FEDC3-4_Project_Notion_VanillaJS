export default function instanceCheck(target) {
  if (!target) {
    throw new Error("new 연산자를 붙여주세요.");
  }
}
