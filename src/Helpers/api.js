import "./env.js";

console.log("API_END_POINT:", process.env.API_END_POINT);
console.log("API_END_POINT:", process.env.API_END_POINT);

/**
export async function GetData({ userName }) {
  const res = await fetch(`https://todo-api.roto.codes/${userName}?delay=1000`);
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const todoList = await res.json();
  return todoList;
}

export async function PostData({ todoText, userName }) {
  const res = await fetch(`https://todo-api.roto.codes/${userName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: todoText,
    }),
  });
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
}

export async function PutData({ userName, id }) {
  const res = await fetch(
    `https://todo-api.roto.codes/${userName}/${id}/toggle`,
    {
      method: "PUT",
    }
  );
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
}

export async function DeleteData({ userName, id }) {
  const res = await fetch(`https://todo-api.roto.codes/${userName}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
}

export async function DeleteAllData({ userName }) {
  const res = await fetch(`https://todo-api.roto.codes/${userName}/all`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
}

export async function GetUser() {
  const res = await fetch(`https://todo-api.roto.codes/users`);
  if (!res.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  return await res.json();
}
 */
