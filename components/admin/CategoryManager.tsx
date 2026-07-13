"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; sortOrder: number; color?: string | null };

type Actions = {
  onCreate: (name: string, sortOrder: number, color?: string | null) => Promise<void>;
  onUpdate: (
    id: string,
    name: string,
    sortOrder: number,
    color?: string | null
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  deleteWarning: string;
};

/** 배지 색상 팔레트 — null 은 기본색(베이지) */
const COLOR_PALETTE: { value: string | null; label: string }[] = [
  { value: null, label: "기본" },
  { value: "#B89968", label: "골드" },
  { value: "#1A2E3B", label: "네이비" },
  { value: "#1E6FD9", label: "파랑" },
  { value: "#1A7F37", label: "초록" },
  { value: "#D64545", label: "빨강" },
  { value: "#7C5CD6", label: "보라" },
  { value: "#6B7580", label: "회색" },
];

function ColorPicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (color: string | null) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
      {COLOR_PALETTE.map((c) => {
        const selected = value === c.value;
        return (
          <button
            key={c.label}
            type="button"
            title={c.label}
            aria-label={`배지 색상: ${c.label}`}
            aria-pressed={selected}
            onClick={() => onChange(c.value)}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              cursor: "pointer",
              background: c.value ?? "rgba(234, 223, 201, 0.9)",
              border: selected ? "2px solid #111" : "1px solid #d0d0d0",
              boxSizing: "border-box",
            }}
          />
        );
      })}
    </div>
  );
}

function CategoryRow({
  category,
  actions,
  withColor,
}: {
  category: Category;
  actions: Actions;
  withColor: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [order, setOrder] = useState(category.sortOrder);
  const [color, setColor] = useState<string | null>(category.color ?? null);
  const [pending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </td>
      {withColor && (
        <td style={{ width: 230 }}>
          <ColorPicker value={color} onChange={setColor} />
        </td>
      )}
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
                await actions.onUpdate(category.id, name, order, color);
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
  withColor = false,
}: {
  categories: Category[];
  withColor?: boolean;
} & Partial<Actions>) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState<string | null>(null);
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
      await actions.onCreate(name, nextOrder, newColor);
      setNewName("");
      setNewColor(null);
      router.refresh();
    });
  }

  return (
    <>
      <table className="admin-table" style={{ marginBottom: 20 }}>
        <thead>
          <tr>
            <th>구분명</th>
            {withColor && <th style={{ width: 230 }}>배지 색상</th>}
            <th style={{ width: 100 }}>순서</th>
            <th style={{ width: 150 }} />
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <CategoryRow
              key={c.id}
              category={c}
              actions={actions}
              withColor={withColor}
            />
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={withColor ? 4 : 3} style={{ color: "#6b7580" }}>
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
        {withColor && (
          <div className="admin-field">
            <label>배지 색상</label>
            <ColorPicker value={newColor} onChange={setNewColor} />
          </div>
        )}
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
