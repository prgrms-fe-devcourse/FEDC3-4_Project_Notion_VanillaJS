export default function ContentList({
    $target,
    initialState
}) {
    const $contentList = document.createElement('div');
    $contentList.className = 'contentList'

    $target.appendChild($contentList)

    // state에 보여줘야하는 문서들을 넣는다?
    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    // 자식 노드들도 click 이벤트 달아야함. 눌렀을때 편집기로 올 수 있게
    this.render = () => {
        const result = [];

        const stack = [];
        // 각 오브젝트마다 deepth를 포함해서 dfs 돌리기?
        initialState.reverse().forEach(value => stack.push({
            content: value,
            depth: 0,
            parent: $contentList
        }))


        // API로 받아온 데이터 DFS 돌면서 append함.
        while (stack.length) {
            const cur = stack.pop();
            const [curContent, curDepth, curParent] = [cur.content, cur.depth, cur.parent]

            const $test = document.createElement('li')
            $test.className = curDepth === 0 ? 'root' : 'leef'
            $test.style.display = curDepth === 0 ? '' : 'none'
            curParent.appendChild($test)

            $test.innerHTML = `
                ${`${'&nbsp'.repeat(curDepth)}` + curContent.title}
            `

            // 이벤트 버블링 생각할것.
            // 클린 된 애의 바로 아래 자식 노드들을 모두 다 바꿔야함.
            // 왜 두번눌리지?
            $test.addEventListener('click', e => {
                e.stopPropagation()                
                onclick(e.target)
            })

            // 현재 노드의 자식들 탐색
            if (curContent.documents.length === 0) {
                continue;
            } else {
                curContent.documents.forEach(value => {
                    stack.push({
                        content: value,
                        depth: curDepth + 1,
                        parent: $test
                    })
                })
            }

        }

        function onclick(e) {
            const children = Array.from(e.childNodes).slice(1)
            children.forEach((value,idx) => {
                if(value.style.display === 'none') {
                    return value.style.display = ''
                }
                else    {
                    return value.style.display = 'none'
                }
            })
        }

        
        // 하위 자식들을 모두 숨기는 함수.

        // 하위 자식을 보여주는 함수.

        // 각각의 li마다 toggle 값을 줘서 보이거나 안보이거나.
        // 상태의 변호가 있을 때마다 render 다시 해야함.

        /**
         * 상위 노드가 클릭되야 그 아래 자식들이 나온다.
         * 각 노드들 마다 클릭이벤트를 거는데 클릭 이벤트 시 모든 자식노드들이 보여야한다.
         * 다시 클릭되면 모든 하위노드를 숨긴다.
         */

    }
    this.render()
}