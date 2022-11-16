export const isNew = (component, cur) => {
  if (cur instanceof component === false) {
    console.log(`${component.name}는 생성자 함수 입니다. new를 사용하세요`);
    return;
  }
};
