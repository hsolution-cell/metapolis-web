"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; sortOrder: number };

type Actions = {
  onCreate: (name: string, sortOrder: number) => Promise<void>;
  onUpdate: (id: string, name: string, sortOrder: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  deleteWarning: string;
};

function CategoryRow({
  category,
  actions,
}: {
  category: Category;
  actions: Actions;
}) {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [order, setOrder] = useState(category.sortOrder);
  const [pending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </td>
      <td style={{ width: 100 }}>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
      </td>
      <td style={{ width: 150 }}>
        <div className="admin-cell-actions">
          <button
            type="button"
            className="admin-btn admin-btn--sm"
            disabled={pending || !name.trim()}
            onClick={() =>
              startTransition(async () => {
                await actions.onUpdate(category.id, name, order);
                router.refresh();
              })
            }
          >
            저장
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--sm admin-btn--danger"
            disabled={pending}
            onClick={() => {
              if (!confirm(actions.deleteWarning)) return;
              startTransition(async () => {
                await actions.onDelete(category.id);
                router.refresh();
              });
            }}
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function CategoryManager({
  categories,
  onCreate,
  onUpdate,
  onDelete,
  deleteWarning = "이 구분을 삭제할까요? 이 구분을 쓰던 글은 '미분류'로 표시됩니다.",
}: {
  categories: Category[];
} & Partial<Actions>) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [pending, startTransition] = useTransition();

  const actions: Actions = {
    onCreate: onCreate!,
    onUpdate: onUpdate!,
    onDelete: onDelete!,
    deleteWarning,
  };

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    const nextOrder = (categories[categories.length - 1]?.sortOrder ?? 0) + 1;
    startTransition(async () => {
      await actions.onCreate(name, nextOrder);
      setNewName("");
      router.refresh();
    });
  }

  return (
    <>
      <table className="admin-table" style={{ marginBottom: 20 }}>
        <thead>
          <tr>
            <th>구분명</th>
            <th style={{ width: 100 }}>순서</th>
            <th style={{ width: 150 }} />
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <CategoryRow key={c.id} category={c} actions={actions} />
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={3} style={{ color: "#6b7580" }}>
                등록된 구분이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="admin-form" style={{ maxWidth: 520 }}>
        <div className="admin-field">
          <label htmlFor="newCategory">새 구분 추가</label>
          <input
            id="newCategory"
            value={newName}
            placeholder="예: 채용, 이벤트, 긴급"
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>
        <div className="admin-form__actions">
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            disabled={pending || !newName.trim()}
            onClick={handleAdd}
          >
            추가
          </button>
        </div>
      </div>
    </>
  );
}
