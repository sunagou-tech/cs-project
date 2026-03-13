export type Status = "対応中" | "成約済" | "検討中" | "フォロー中" | "クローズ";

export type PhoneLog = {
  id: string;
  date: string;
  duration: string;
  content: string;
  staff: string;
};

export type LineLog = {
  id: string;
  date: string;
  message: string;
  direction: "受信" | "送信";
};

export type EventLog = {
  id: string;
  eventName: string;
  date: string;
  attended: boolean;
  note?: string;
};

export type Customer = {
  id: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  status: Status;
  assignedStaff: string;
  createdAt: string;
  memo: string;
  phoneLogs: PhoneLog[];
  lineLogs: LineLog[];
  eventLogs: EventLog[];
};

export const customers: Customer[] = [
  {
    id: "1",
    lastName: "田中",
    firstName: "美咲",
    lastNameKana: "タナカ",
    firstNameKana: "ミサキ",
    email: "tanaka.misaki@example.com",
    phone: "090-1234-5678",
    status: "対応中",
    assignedStaff: "佐藤 担当",
    createdAt: "2026-01-15",
    memo: "AIツールへの関心が高い。経理部門での活用を検討中。",
    phoneLogs: [
      { id: "p1", date: "2026-03-10 14:00", duration: "15分", content: "初回ヒアリング。現在の業務課題について確認。月次集計に5時間かかっている点が最大の課題。", staff: "佐藤" },
      { id: "p2", date: "2026-02-28 11:00", duration: "20分", content: "デモ説明。ChatGPT×Excelの活用方法を具体的に説明。非常に興味を持ってもらえた。", staff: "佐藤" },
      { id: "p3", date: "2026-02-10 16:30", duration: "8分", content: "資料送付の確認連絡。日程調整のため再連絡予定。", staff: "山田" },
    ],
    lineLogs: [
      { id: "l1", date: "2026-03-11 09:15", message: "先日はお時間をいただきありがとうございました。資料を拝見しましたが、経理での活用はどの程度の期間で習得できますか？", direction: "受信" },
      { id: "l2", date: "2026-03-11 10:00", message: "ご質問ありがとうございます！基礎操作は2〜3週間で習得できます。経理に特化したプロンプトもご用意しています。", direction: "送信" },
      { id: "l3", date: "2026-02-25 14:30", message: "無料体験セミナーの参加を検討しています。次回の日程を教えてください。", direction: "受信" },
    ],
    eventLogs: [
      { id: "e1", eventName: "AI活用無料セミナー（第3回）", date: "2026-03-05", attended: true, note: "積極的に質問。名刺交換済。" },
      { id: "e2", eventName: "オンライン体験講座", date: "2026-02-20", attended: false, note: "当日キャンセル。後日フォロー済。" },
    ],
  },
  {
    id: "2",
    lastName: "鈴木",
    firstName: "健太",
    lastNameKana: "スズキ",
    firstNameKana: "ケンタ",
    email: "suzuki.kenta@example.com",
    phone: "080-9876-5432",
    status: "成約済",
    assignedStaff: "山田 担当",
    createdAt: "2025-11-20",
    memo: "営業マン。メール自動化に特に興味あり。3ヶ月コース受講中。",
    phoneLogs: [
      { id: "p1", date: "2026-03-01 10:00", duration: "10分", content: "受講開始後1ヶ月の進捗確認。メール作成時間が半減したと報告。満足度高い。", staff: "山田" },
      { id: "p2", date: "2025-12-15 15:00", duration: "25分", content: "契約内容の最終確認。3ヶ月コースに申し込み決定。", staff: "山田" },
    ],
    lineLogs: [
      { id: "l1", date: "2026-03-08 08:30", message: "昨日のプロンプト講座、すごく実践的でした！今日さっそく商談メールで使ってみます。", direction: "受信" },
      { id: "l2", date: "2026-03-08 09:00", message: "ありがとうございます！ぜひ結果を教えてください。次回は自動化フローを一緒に作りましょう。", direction: "送信" },
    ],
    eventLogs: [
      { id: "e1", eventName: "AI活用無料セミナー（第2回）", date: "2025-12-01", attended: true, note: "セミナー後すぐに申し込み。" },
      { id: "e2", eventName: "受講生交流会", date: "2026-02-14", attended: true },
    ],
  },
  {
    id: "3",
    lastName: "佐藤",
    firstName: "由美",
    lastNameKana: "サトウ",
    firstNameKana: "ユミ",
    email: "sato.yumi@example.com",
    phone: "070-1111-2222",
    status: "検討中",
    assignedStaff: "佐藤 担当",
    createdAt: "2026-02-01",
    memo: "人事担当。採用業務の効率化に関心。予算確認中。",
    phoneLogs: [
      { id: "p1", date: "2026-03-05 13:00", duration: "18分", content: "人事部での活用事例を紹介。面接評価シートの自動作成デモを実施。反応良好。", staff: "佐藤" },
    ],
    lineLogs: [
      { id: "l1", date: "2026-03-06 17:00", message: "昨日のデモ、上司にも共有したところ興味を持ってもらえました。予算確認して来週中にご連絡します。", direction: "受信" },
      { id: "l2", date: "2026-03-06 17:30", message: "ぜひよろしくお願いします！法人向けのお見積りも準備できますのでお気軽にご相談ください。", direction: "送信" },
      { id: "l3", date: "2026-02-28 12:00", message: "採用面接の効率化について詳しく聞きたいのですが、事例はありますか？", direction: "受信" },
    ],
    eventLogs: [
      { id: "e1", eventName: "AI活用無料セミナー（第3回）", date: "2026-03-05", attended: true },
    ],
  },
  {
    id: "4",
    lastName: "高橋",
    firstName: "誠一",
    lastNameKana: "タカハシ",
    firstNameKana: "セイイチ",
    email: "takahashi.seiichi@example.com",
    phone: "090-3333-4444",
    status: "フォロー中",
    assignedStaff: "山田 担当",
    createdAt: "2025-10-05",
    memo: "経営者。AI導入に慎重。具体的なROIを求めている。定期フォロー中。",
    phoneLogs: [
      { id: "p1", date: "2026-02-20 16:00", duration: "30分", content: "ROI試算の説明。月30時間削減×時給換算で年間約180万円の効果試算を提示。", staff: "山田" },
      { id: "p2", date: "2026-01-15 11:00", duration: "12分", content: "年始の挨拶と近況確認。導入タイミングは春以降と話あり。", staff: "山田" },
      { id: "p3", date: "2025-11-10 14:00", duration: "20分", content: "初回商談。AI全般への懐疑的な意見あり。具体的な事例資料を送付約束。", staff: "山田" },
    ],
    lineLogs: [
      { id: "l1", date: "2026-03-01 10:00", message: "先日の試算資料を役員会で共有しました。4月以降に導入を検討したいと思います。", direction: "受信" },
      { id: "l2", date: "2026-03-01 10:30", message: "ありがとうございます！4月に向けて法人向けプランの詳細をご案内させていただきます。", direction: "送信" },
    ],
    eventLogs: [
      { id: "e1", eventName: "経営者向けAI戦略セミナー", date: "2026-01-25", attended: true, note: "パネルディスカッションで発言あり。" },
      { id: "e2", eventName: "AI活用無料セミナー（第1回）", date: "2025-10-15", attended: true },
    ],
  },
  {
    id: "5",
    lastName: "伊藤",
    firstName: "さくら",
    lastNameKana: "イトウ",
    firstNameKana: "サクラ",
    email: "ito.sakura@example.com",
    phone: "080-5555-6666",
    status: "クローズ",
    assignedStaff: "佐藤 担当",
    createdAt: "2025-09-01",
    memo: "フリーランスのデザイナー。予算の問題でクローズ。半年後に再コンタクト予定。",
    phoneLogs: [
      { id: "p1", date: "2025-12-10 15:00", duration: "15分", content: "クローズの確認。予算面が厳しいとのこと。個人向け低価格プランの案内も断られた。半年後に再連絡予定。", staff: "佐藤" },
    ],
    lineLogs: [
      { id: "l1", date: "2025-12-05 19:00", message: "検討しましたが、今は費用的に難しいです。また状況が変わったらご連絡します。", direction: "受信" },
      { id: "l2", date: "2025-12-05 19:30", message: "承知いたしました。またいつでもご相談ください。半年後にあらためてご案内させていただきます。", direction: "送信" },
    ],
    eventLogs: [
      { id: "e1", eventName: "AI活用無料セミナー（第1回）", date: "2025-09-20", attended: true },
    ],
  },
];

export function searchCustomers(query: string): Customer[] {
  if (!query.trim()) return customers;
  const q = query.trim();
  return customers.filter(
    (c) =>
      c.lastName.includes(q) ||
      c.firstName.includes(q) ||
      c.lastNameKana.includes(q) ||
      c.firstNameKana.includes(q) ||
      `${c.lastName}${c.firstName}`.includes(q)
  );
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

export const statusColor: Record<Status, string> = {
  対応中: "bg-blue-100 text-blue-700",
  成約済: "bg-emerald-100 text-emerald-700",
  検討中: "bg-yellow-100 text-yellow-700",
  フォロー中: "bg-purple-100 text-purple-700",
  クローズ: "bg-slate-100 text-slate-500",
};
