export function SideBar({ $target }) {
	this.render = () => {
		$target.innerHTML = `
            <div class="side-bar">
                <div class="side-bar__title">SideBar</div>
            </div>
        `;
	};
}
