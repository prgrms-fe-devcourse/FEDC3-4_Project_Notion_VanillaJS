export function Documents({ $target }) {
	this.render = () => {
		$target.innerHTML = `
            <div class="documents">
                <div class="documents__title">Documents</div>
            </div>
        `;
	};
}
