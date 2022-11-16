// CONSTANT
export const MINIMUM_INPUT_LENGTH = 2;
export const CHANGE_API_DATA_TO_LOCAL_DATA =
  '이전 저장된 임시 글이 있습니다. 업로드 하시겠습니까? 저장되지 않은 글은 삭제됩니다.';
export const ALERT_DELETE_DOCUMENT = '글을 삭제하시겠습니까? 하위 폴더는 자동으로 이동됩니다.';
export const CHANGE_USER_NAME = '변경할 USER ID를 입력해 주세요';
export const NEW_TITLE = '타이틀을 입력해 주세요';
export const NEW_CONTENT = '내용을 입력해 주세요';
export const NEW_ROOT_ID = 'RootDocument';


// ERROR
export const ERROR_MESSAGE = {
  NOT_STRING: '문자열이 아닙니다.',
  NOT_NUMBER: '숫자가 아닙니다.',
  NOT_DOCUMENTS_ROOT: '올바른 주소가 아닙니다',
  NOT_CONSTRUCTOR: '생성자 함수가 아닙니다.',
  NOT_VALID_LOCALDATA: '로컬 데이터 로드에 에러가 발생했습니다',
  NOT_COLLECT_NETWORK: '네트워크 응답이 올바르지 않습니다.',
  NOT_COLLECT_ADRESS: '올바르지 않은 주소입니다.',
};

// API
export const BASE_INIT_USERNAME = 'zerosial';
export const CONTENT_TYPE = 'application/json';
export const API_HEADER = (userId) => {
  return {
    'x-username': userId ? userId : BASE_INIT_USERNAME,
    'Content-Type': CONTENT_TYPE,
  };
};
