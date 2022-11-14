const $home = () => {
	return `
		<div class="home">
			<h1>🔳 JooNotion에 오신걸 환영합니다!</h1>
		</div>
	`;
};

const $editPost = ({ title, content }) => {
	return `
	<input style="font-size:30px" class="post-edit-title" type="text" name="title" placeholder="제목을 입력해주세요." value="${title}">
	<textarea rows="20" class="post-edit-content" name="content" placeholder="내용을 입력해주세요.">${content}</textarea>
	`;
};

/**
 * 포스트 리스트 (사이드바)
 * @param {*} post
 * @returns
 */
// const $onLoadList = (post) => {
// 	return `
// 	<li class="post-list" data-id="${post.id}">
// 		<div>
// 			<span class="open-folder icon-right-open"></span>
// 			<span class="post-title">
// 				${post.title}
// 			</span>
// 		</div>
// 		<div>
// 			<button class="delete-page-btn icon-trash"></button>
// 			<button class="create-page-btn icon-plus"></button>
// 		</div>
// 	</li>
// 	`;
// };
const $onLoadList = (post) => {
	return `
	<li class="post-list ${
		post.documents.length > 0 ? "toggle-tree" : ""
	}" data-id="${post.id}">
		<div class="list-flex">
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
	</li>
	`;
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
		<li class="empty">
			하위 페이지가 없습니다.
		</li>
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
 */
const $createPostModal = () => {
	return `
	<div class="container-modal">
		<div class="overlay"></div>
		<div class="modal">
			<div class="modal-title">
				<input type="text" name="title" placeholder="제목을 입력하세요."/>
			</div>
			<div class="modal-content">
			<input
					type="text"
					name="content"
					placeholder="내용을 입력하세요."
				/>
			</div>
		</div>
	</div>
	`;
};

export {
	$home,
	$editPost,
	$sideNavHeader,
	$onLoadList,
	$emptyPage,
	$createPostBtn,
	$createPostModal,
};
