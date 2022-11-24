export function CheckNew(target) {
  if (!target) {
    alert(`${target.name} 컴포넌트는 new 키워드가 필요합니다.`);
    throw new Error(`${target.name} 컴포넌트는 new 키워드가 필요합니다.`);
  }
}
