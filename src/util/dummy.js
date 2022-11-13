export const DUMMY_DATA = [
  {
    id: 1,
    title: 'title1',
    documents: [
      {
        id: 2,
        title: 'title2',
        documents: []
      }
    ]
  },
  {
    id: 3,
    title: 'title3',
    documents: [
      {
        id: 4,
        title: 'title4',
        documents: [
          {
            id: 5,
            title: 'title5',
            documents: []
          }
        ]
      },
      {
        id: 6,
        title: '',
        documents: []
      },
      {
        id: 7,
        title: 'title7',
        documents: []
      }
    ]
  },
  {
    id: 8,
    title: 'title8',
    documents: [
      {
        id: 9,
        title: 'title9',
        documents: []
      },
      {
        id: 10,
        title: 'title10',
        documents: []
      }
    ]
  }
]

/**
 *          1         3         8
 *      2         4   6   7
 *              5
 */