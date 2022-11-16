const $home = () => {
	return `
		<div class="home">
			<h1>🔳 JooNotion</h1>
		</div>
	`;
};

const formatTime = (time) => {
	if (isNaN(time)) return;

	const date = `
	${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, "0")}-${String(
		time.getDate()
	).padStart(2, "0")} 
	/	${String(time.getHours()).padStart(2, "0")} : ${String(
		time.getMinutes()
	).padStart(2, "0")}`;

	return date;
};

/**
 * 에디터 템플릿
 * @param {*} param0
 * @returns
 */
const $editPost = ({ title, content, createdAt, updatedAt }) => {
	content = content === null ? "" : content;
	return `
		<div class="title-input-container">
			<div class="title input" name="title" placeholder="글 제목을 입력해주세요." contenteditable="true">${title}</div>
		</div>
		<div class="post-date-container">
			<span>생성날짜 : ${formatTime(new Date(createdAt))}</span>
			<span>수정날짜 : ${formatTime(new Date(updatedAt))}</span>
		</div>
		<div class="content-input-container">
			<div class="content input" name="content" placeholder="글 내용을 입력해주세요." contenteditable="true">${content}</div>
		</div>
	`;
};

/**
 * 리스트 템플릿
 * @param {*} posts
 * @returns
 */
const $listContent = (post) => {
	return `
		<div class="list-flex" data-id="${post.id}">
			<div style="line-height:18px">
				<span class="open-folder icon-right-open"></span>
				<span class="post-title">
					${post.title}
				</span>
			</div>
			<div class="delete-create-btn-container">
				<button class="delete-page-btn icon-trash"></button>
				<button class="create-page-btn icon-plus-1"></button>
			</div>
		</div>
	`;
};

/**
 * 자식 리스트 출력
 * @param {*} posts
 * @returns
 */
const $onLoadChildList = (posts) => {
	if (Array.isArray(posts)) {
		return `
		<div class="child-ul hide">
		${posts
			.map((post) => {
				return `
							${$listContent(post)}
							${
								post.documents.length > 0
									? `${$onLoadChildList(post.documents)}`
									: `${$emptyPage()}`
							}
					`;
			})
			.join("")}
			</div>
		`;
	}
};

/**
 * 부모 리스트 전체 출력
 * @param {*} posts
 * @returns
 */
const $onLoadParentList = (posts) => {
	if (Array.isArray(posts)) {
		return `
			<ul>
				${posts
					.map((post) => {
						return `
							<li class="post-list">
								${$listContent(post)}
								${
									post.documents.length > 0
										? `${$onLoadChildList(post.documents)}`
										: `${$emptyPage()}`
								}
							</li>
						`;
					})
					.join("")}
			</ul>
			`;
	}
};

/**
 * 포스트 리스트 헤더
 * @returns
 */
const $sideNavHeader = () => {
	return `
		<div class="nav-header">
		🔳 JooNotion
		</div>
	`;
};

/**
 * 하위 페이지 없음
 * @returns
 */
const $emptyPage = () => {
	return `
		<div class="empty hide">
			하위 페이지가 없습니다.
		</div>
	`;
};

/**
 * 페이지 추가 버튼
 * @returns
 */
const $createPostBtn = () => {
	return `
		<div>
			<button class="icon-plus-1">새 페이지 추가</button>
		</div>
	`;
};

/**
 * 포스트 작성 모달창
 * @returns	html
 * 
				<textarea style="font-size:30px" rows="2" type="text" name="title" placeholder="제목을 입력하세요."></textarea>
 */
const $createPostModal = () => {
	return `
	<div class="container-modal">
		<div class="overlay"></div>
		<div class="modal">
			<div class="modal-title">
				<h2>📝오늘하루 어땠나요?</h2>
				<div class="title-input-container">
					<div class="title" name="title" placeholder="글 제목을 입력해주세요." contenteditable="true"></div>
				</div>
			</div>
			<div class="modal-btn-container">
				<button class="close">닫기</button>
				<button class="create-post-btn">글 생성</button>
			</div>
		</div>
	</div>
	`;
};

export {
	$home,
	$editPost,
	$sideNavHeader,
	$onLoadParentList,
	$emptyPage,
	$createPostBtn,
	$createPostModal,
};
