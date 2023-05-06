import { validation } from '../../validation.js';

export default function LandingPage({ $target }) {
  validation(new.target, 'LandingPage');

  const $landingPage = document.createElement('section');
  $landingPage.className = 'landingPage';
  $target.appendChild($landingPage);

  this.render = () => {
    $landingPage.innerHTML = `
            <h1 class="landingTitle">
                Notion에 오신 것을 환영합니다.
            </h1>
            <p class="landingP">페이지를 추가하여 새 문서를 작성해보세요.</p>
        `;
  };

  this.render();
}
