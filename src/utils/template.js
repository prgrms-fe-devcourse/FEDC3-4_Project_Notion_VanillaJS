export const renderChildDocuments = (documents) => {
  if (documents.length) {
    return `
      <div class="child-documents">
        <ul class="child-document-list">
          ${documents
            .map(
              (document) =>
                `<li class="child-document-item" data-id=${document.id}>
                  <div class="child-document-item-container">
                    <div class="icon-document">
                      <img src="/src/assets/document.svg" />
                    </div>
                    <div class="child-document-title">${document.title}</div>
                  </div>
                </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }
  return "";
};

export const renderTextStyleMenu = () => {
  return `
    <div class="modal text-style-menu">
      <div class="text-style-menu-list">
        <div
          class="text-style-menu-item"
          role="button"
          tabindex="0"
          title="굵게"
          data-command="bold"
        >
          <span class="bold">B</span>
        </div>
        <div
          class="text-style-menu-item"
          role="button"
          tabindex="0"
          title="기울임꼴로 표시"
          data-command="italic"
        >
          <span class="italic">i</span>
        </div>
        <div
          class="text-style-menu-item"
          role="button"
          tabindex="0"
          title="밑줄"
          data-command="underline"
        >
          <span class="underline">U</span>
        </div>
        <div
          class="text-style-menu-item"
          role="button"
          tabindex="0"
          title="취소선"
          data-command="strikeThrough"
        >
          <span class="line-through">S</span>
        </div>
        <div
          class="text-style-menu-item text-color-tab"
          role="button"
          tabindex="0"
          style="
            user-select: none;
            transition: background 20ms ease-in 0s;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding-left: 7px;
            padding-right: 6px;
            white-space: nowrap;
            box-shadow: rgba(55, 53, 47, 0.09) 1px 0px 0px;
            margin-right: 1px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 18px;
              text-align: center;
              font-size: 15px;
              border-radius: 2px;
              width: 18px;
              font-weight: 500;
              margin-bottom: 2px;
              color: rgb(55, 53, 47);
            "
          >
            A
          </div>
          <svg
            viewBox="0 0 30 30"
            class="chevronDown"
            style="
              width: 10px;
              height: 100%;
              display: block;
              fill: rgba(55, 53, 47, 0.35);
              flex-shrink: 0;
              backface-visibility: hidden;
              margin-left: 3px;
            "
          >
            <polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon>
          </svg>
        </div>
      </div>
    </div>`;
};

export const renderTextColorStyleMenu = () => {
  return `
  <div
  class="modal text-color-style-menu"
  style="padding-top: 6px; padding-bottom: 6px"
>
  <div
    style="
      display: flex;
      padding-left: 14px;
      padding-right: 14px;
      margin-top: 6px;
      margin-bottom: 8px;
      color: rgba(55, 53, 47, 0.65);
      font-size: 11px;
      font-weight: 500;
      line-height: 120%;
      user-select: none;
      text-transform: uppercase;
    "
  >
    <div
      style="
        align-self: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      "
    >
      색
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="#37352F"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: inherit;
            fill: inherit;
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          기본
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(120, 119, 116)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(120, 119, 116);
            fill: rgb(120, 119, 116);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          회색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(159, 107, 83)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(159, 107, 83);
            fill: rgb(159, 107, 83);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          갈색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(217, 115, 13)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(217, 115, 13);
            fill: rgb(217, 115, 13);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          주황색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(203, 145, 47)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(203, 145, 47);
            fill: rgb(203, 145, 47);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          노란색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(68, 131, 97)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(68, 131, 97);
            fill: rgb(68, 131, 97);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          초록색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(51, 126, 169)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(51, 126, 169);
            fill: rgb(51, 126, 169);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          파란색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(144, 101, 176)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(144, 101, 176);
            fill: rgb(144, 101, 176);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          보라색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(193, 76, 138)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(193, 76, 138);
            fill: rgb(193, 76, 138);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          분홍색
        </div>
      </div>
    </div>
  </div>
  <div
    class="text-color-style-menu-item"
    data-color="rgb(212, 76, 71)"
    role="button"
    tabindex="0"
    style="
      user-select: none;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      width: calc(100% - 8px);
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 3px;
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        line-height: 120%;
        width: 100%;
        user-select: none;
        min-height: 28px;
        font-size: 14px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          margin-right: 4px;
        "
      >
        <div
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            text-align: center;
            font-size: 16px;
            border-radius: 3px;
            font-weight: 500;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
            color: rgb(212, 76, 71);
            fill: rgb(212, 76, 71);
          "
        >
          A
        </div>
      </div>
      <div
        style="
          margin-left: 6px;
          margin-right: 12px;
          min-width: 0px;
          flex: 1 1 auto;
        "
      >
        <div
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          빨간색
        </div>
      </div>
    </div>
  </div>
</div>`;
};
