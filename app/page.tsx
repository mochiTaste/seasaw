"use client";

import { useState } from "react";
import { items, type Item } from "./items";

type Phase = "select" | "comparing" | "answer";

const EMPTY: Item = { id: "", name: "えらんでね", emoji: "？", weight: 0 };

export default function Home() {
  const [leftItem, setLeftItem] = useState<Item>(EMPTY);
  const [rightItem, setRightItem] = useState<Item>(EMPTY);
  const [phase, setPhase] = useState<Phase>("select");

  const tilt = (() => {
    if (phase === "select") return 0;
    if (leftItem.id === "" || rightItem.id === "") return 0;
    const diff = leftItem.weight - rightItem.weight;
    if (diff === 0) return 0;
    return diff > 0 ? -12 : 12;
  })();

  const showAnswer = phase === "answer";

  function handleCompare() {
    if (leftItem.id === "" || rightItem.id === "") return;
    setPhase("comparing");
  }

  function handleAnswer() {
    if (leftItem.id === "" || rightItem.id === "") return;
    setPhase("answer");
  }

  function handleReset() {
    setLeftItem(EMPTY);
    setRightItem(EMPTY);
    setPhase("select");
  }

  const answerText = (() => {
    if (!showAnswer) return "";
    if (leftItem.id === "" || rightItem.id === "") return "";
    if (leftItem.weight > rightItem.weight)
      return `「${leftItem.name}」のほうが おもい！`;
    if (rightItem.weight > leftItem.weight)
      return `「${rightItem.name}」のほうが おもい！`;
    return `おなじ おもさ！`;
  })();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#fef9ee] px-4 py-8 gap-6">
      {/* タイトル */}
      <h1 className="text-4xl md:text-5xl font-black text-[#e05c00] tracking-wide drop-shadow-sm">
        どっちが おもい？
      </h1>

      {/* シーソーエリア */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-0">
        {/* 左右のアイテム＋板 */}
        <div
          className="w-full flex items-end justify-between px-4"
          style={{
            transform: `rotate(${tilt}deg)`,
            transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
            transformOrigin: "center bottom",
          }}
        >
          {/* 左アイテム */}
          <ItemDisplay item={leftItem} side="left" tilt={tilt} />

          {/* シーソー板 */}
          <div className="flex-1 mx-2 pb-1 flex flex-col justify-end">
            <div className="w-full h-5 bg-[#8B5E3C] rounded-full shadow-md" />
          </div>

          {/* 右アイテム */}
          <ItemDisplay item={rightItem} side="right" tilt={tilt} />
        </div>

        {/* 支点 */}
        <div className="flex flex-col items-center">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "28px solid transparent",
              borderRight: "28px solid transparent",
              borderBottom: "48px solid #8B5E3C",
            }}
          />
          <div className="w-20 h-4 bg-[#6B3F1E] rounded-sm" />
        </div>

        {/* こたえ表示 */}
        {showAnswer && (
          <div className="mt-4 px-6 py-3 bg-[#fff3cd] border-4 border-[#ffc107] rounded-2xl text-2xl md:text-3xl font-black text-[#e05c00] text-center shadow-md">
            {answerText}
          </div>
        )}
      </div>

      {/* 先生用操作パネル */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border-4 border-[#ffd580] p-5 flex flex-col gap-5">
        <p className="text-sm font-bold text-gray-400 text-center">
          せんせいパネル
        </p>

        {/* 左右セレクト */}
        <div className="flex gap-4 items-center justify-center flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[#3a86ff]">ひだり</span>
            <select
              className="text-xl font-bold bg-[#e8f4ff] border-2 border-[#3a86ff] rounded-xl px-3 py-2 cursor-pointer"
              value={leftItem.id}
              onChange={(e) => {
                const found = items.find((i) => i.id === e.target.value);
                setLeftItem(found ?? EMPTY);
                setPhase("select");
              }}
            >
              <option value="">えらんでね</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.emoji} {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-3xl font-black text-gray-300">⇔</div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-[#ff6b6b]">みぎ</span>
            <select
              className="text-xl font-bold bg-[#fff0f0] border-2 border-[#ff6b6b] rounded-xl px-3 py-2 cursor-pointer"
              value={rightItem.id}
              onChange={(e) => {
                const found = items.find((i) => i.id === e.target.value);
                setRightItem(found ?? EMPTY);
                setPhase("select");
              }}
            >
              <option value="">えらんでね</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.emoji} {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={handleCompare}
            disabled={leftItem.id === "" || rightItem.id === ""}
            className="text-xl font-black px-6 py-3 rounded-2xl bg-[#3a86ff] text-white shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-[#2563eb] active:scale-95 transition-all"
          >
            くらべる
          </button>
          <button
            onClick={handleAnswer}
            disabled={leftItem.id === "" || rightItem.id === ""}
            className="text-xl font-black px-6 py-3 rounded-2xl bg-[#f59e0b] text-white shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-[#d97706] active:scale-95 transition-all"
          >
            こたえ
          </button>
          <button
            onClick={handleReset}
            className="text-xl font-black px-6 py-3 rounded-2xl bg-[#d1d5db] text-gray-700 shadow-md
              hover:bg-[#9ca3af] active:scale-95 transition-all"
          >
            リセット
          </button>
        </div>
      </div>
    </main>
  );
}

function ItemDisplay({
  item,
  side,
  tilt,
}: {
  item: Item;
  side: "left" | "right";
  tilt: number;
}) {
  const isDown =
    (side === "left" && tilt > 0) || (side === "right" && tilt < 0);

  return (
    <div
      className="flex flex-col items-center gap-1 w-28"
      style={{
        transform: `rotate(${-tilt}deg)`,
        transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <span
        className="text-6xl md:text-7xl select-none"
        style={{
          filter: isDown
            ? "drop-shadow(0 6px 3px rgba(0,0,0,0.25))"
            : "none",
        }}
      >
        {item.emoji}
      </span>
      <span className="text-base md:text-lg font-bold text-gray-700">
        {item.name}
      </span>
    </div>
  );
}
