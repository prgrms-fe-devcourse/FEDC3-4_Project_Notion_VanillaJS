// 모달 입력 창 닫기
const modalClose = ($target) => {
	$target.querySelector(".container-modal").classList.remove("post-modal-show");
	$target.querySelector('div[name="title"]').innerText = "";
};

// 모달 입력 창 띄우기
const modalShow = ($target) => {
	$target.querySelector(".container-modal").classList.add("post-modal-show");
};

export { modalShow, modalClose };
