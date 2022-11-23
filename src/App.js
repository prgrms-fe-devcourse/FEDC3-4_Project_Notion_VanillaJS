import PostList from './components/PostList.js';

export default function App({ $target }) {
  const DUMMY_DATA = [
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
    { id: 4, title: 'test4' },
    { id: 5, title: 'test5' },
    { id: 6, title: 'test6' },
  ];

  new PostList({ $target, props: { postList: DUMMY_DATA } });
}
