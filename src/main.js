import App from './App.js';
import { $ } from './lib/utils.js';
$;
const $app = $('#app');

new App({ $target: $app });
// new Footer({
//   $target: $app,
// addRootDocument를 한다.
// => editor 화면 바뀜 (route 새로 하나 만들어지겠지);
// => 그리고 List에 하나 만들어지는 것처럼 보이게 됨, and focus on that (입력 가능)
// => input 창임. input.value로 새로운 list 만들어서 화면에 보여주고, 그 후에 request POST날리자 낙관적 업데이트;
// addRootDocument: async () => {
// await request('/documents', {
//   method: 'POST',
//   body: {
//     title: '',
//     parent: null,
//   },
// });
// },
// });
