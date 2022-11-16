export const validation = (target, component) => {
  if (!target)
    throw new Error(`${component} 컴포넌트는 생성자 함수입니다. new 키워드를 추가해주세요.`);
};
