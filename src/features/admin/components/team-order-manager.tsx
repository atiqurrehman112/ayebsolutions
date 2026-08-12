"use client";
import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reorderTeamMembers } from "@/lib/actions/team";
import type { TeamMemberRow } from "@/types/database";
import styles from "./admin-team.module.css";

export function TeamOrderManager({
  members,
}: {
  readonly members: readonly TeamMemberRow[];
}) {
  const [items, setItems] = useState([...members]);
  const [dragged, setDragged] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  function persist(next: readonly TeamMemberRow[]) {
    setItems([...next]);
    startTransition(async () => {
      const result = await reorderTeamMembers(next.map((item) => item.id));
      setMessage(result.message);
    });
  }
  function move(index: number, offset: -1 | 1) {
    const target = index + offset;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const current = next[index];
    const destination = next[target];
    if (!current || !destination) return;
    next[index] = destination;
    next[target] = current;
    persist(next);
  }
  function drop(targetId: string) {
    if (!dragged || dragged === targetId) return;
    const next = [...items];
    const from = next.findIndex((item) => item.id === dragged);
    const to = next.findIndex((item) => item.id === targetId);
    if (from < 0 || to < 0) return;
    const [item] = next.splice(from, 1);
    if (!item) return;
    next.splice(to, 0, item);
    setDragged(null);
    persist(next);
  }
  return (
    <div>
      <ol className={styles.orderList}>
        {items.map((member, index) => (
          <li
            className={styles.orderItem}
            draggable
            onDragStart={() => setDragged(member.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => drop(member.id)}
            key={member.id}
            tabIndex={0}
          >
            <GripVertical aria-hidden="true" />
            <span>
              {member.name} · {member.role}
            </span>
            <div className={styles.orderActions}>
              <Button
                aria-label={`Move ${member.name} up`}
                disabled={pending || index === 0}
                onClick={() => move(index, -1)}
                size="icon"
                variant="ghost"
              >
                <ArrowUp aria-hidden="true" />
              </Button>
              <Button
                aria-label={`Move ${member.name} down`}
                disabled={pending || index === items.length - 1}
                onClick={() => move(index, 1)}
                size="icon"
                variant="ghost"
              >
                <ArrowDown aria-hidden="true" />
              </Button>
            </div>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className={styles.orderStatus}>
        {pending
          ? "Saving order…"
          : message || "Drag members or use the accessible move buttons."}
      </p>
    </div>
  );
}
