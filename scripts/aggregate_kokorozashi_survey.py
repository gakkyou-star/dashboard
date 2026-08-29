# -*- coding: utf-8 -*-
"""
探究学習アンケート分析モジュール 集計スクリプト

「高校魅力化評価」アンケート（Worksheet固定フォーマット）を読み込み、
1) 生データ（raw）: 表の機械的な書き起こし
2) 加工データ（tagged）: 大綱政策タグ・アントレプレナーシップ分類・弱点フラグ付与
の2段階でJSON（および file:// 直開き用のJS埋め込み版）を出力する。

次年度以降の更新手順:
  1. 元Excel（高校/高校魅力化評価/配下）を最新のものに差し替える
  2. 本スクリプトを再実行する（`python3 scripts/aggregate_kokorozashi_survey.py`）
  3. index.html をブラウザで開いて表示を確認する
  下記の定数（WEAK_THRESHOLD_PT・ENTREPRENEURSHIP_NOS等）はロジックの調整点。
  数値そのものはExcelから毎回再計算されるため、通常は触る必要はない。
"""

import glob
import json
import os
import re
import warnings
from datetime import datetime

import pandas as pd

warnings.filterwarnings("ignore")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", ".."))  # マスターデータ フォルダ
OUTPUT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "output"))
RAW_JSON = os.path.join(OUTPUT_DIR, "kokorozashi_survey_2026_raw.json")
TAGGED_JSON = os.path.join(OUTPUT_DIR, "kokorozashi_survey_2026_tagged.json")
TAGGED_JS = os.path.join(OUTPUT_DIR, "kokorozashi_survey_2026_tagged.js")

SURVEY_GLOB = "高校/高校魅力化評価/*.xlsx"

YEARS = ["2024", "2025", "2026"]

# ---------------------------------------------------------------------------
# 抽出ロジックの定数（次年度更新時に調整する場合はここを編集する）
# ---------------------------------------------------------------------------

# 「前年度全国平均との差」がこの値以下の個別設問を要強化項目として抽出する
WEAK_THRESHOLD_PT = -3.0

# 要強化項目のうち、魅力化・地域定住という目的そのものに直結するため
# 最優先（赤系の警告表示）とする設問番号
PRIORITY_WEAK_NOS = {"88", "63"}

# アントレプレナーシップ関連指標として特集する設問番号（大綱の
# 「アントレプレナーシップの推進」に対応する、業務要件で定義された指標セット）
ENTREPRENEURSHIP_NOS = {
    "strength": ["37", "39", "40", "53", "47", "65"],
    "weakness": ["79", "46", "80", "41"],
}

# 弱点カードに添える「関連する強み項目」の抽出条件
RELATED_STRENGTH_TOP_N = 2
RELATED_STRENGTH_MIN_TREND = 10.0

# 「伸び幅ランキング」（自校 前年度比）の上位・下位抽出件数
GROWTH_RANK_N = 5

TRAIT_SLUG = {"主体性": "agency", "協働性": "collaboration", "探究性": "inquiry", "社会性": "sociality"}
LAYER_SLUG = {
    "学習活動": "activity",
    "学習環境": "environment",
    "自己認識": "self_perception",
    "行動": "action",
    "ウェルビーイング": "wellbeing",
}
TRAIT_LABEL_JA = {v: k for k, v in TRAIT_SLUG.items()}

# 大綱「基本的な政策」(政策1〜政策15)。政策タグはすべてこの15区分に統一する。
POLICY_LABELS = {
    "policy1": "政策1: グローバル社会における人材育成",
    "policy2": "政策2: イノベーションを担う人材育成",
    "policy3": "政策3: 主体的に社会の形成に参画する態度の育成・規範意識の醸成",
    "policy4": "政策4: 生涯学び、活躍できる環境整備",
    "policy5": "政策5: 確かな学力の育成、幅広い知識と教養・専門的能力・職業実践力の育成",
    "policy6": "政策6: 多様な教育ニーズへの対応と社会的包摂",
    "policy7": "政策7: 豊かな心の育成",
    "policy8": "政策8: 健やかな体の育成、スポーツを通じた豊かな心身の育成",
    "policy9": "政策9: 地域コミュニティの基盤を支える社会教育の推進",
    "policy10": "政策10: 地域・学校・家庭の連携・協働の推進による地域の教育力の向上",
    "policy11": "政策11: 教育DXの推進・デジタル人材の育成",
    "policy12": "政策12: 指導体制・ICT環境の整備、教育基盤の強化",
    "policy13": "政策13: 経済的状況、地理的条件によらない学びの確保",
    "policy14": "政策14: NPO・企業・団体等との連携・協働",
    "policy15": "政策15: 安全・安心で質の高い教育研究環境の整備、児童生徒等の安全確保",
}

# カテゴリ(資質×層)単位のデフォルト政策タグ。1カテゴリに複数政策が対応する場合は
# 配列で持たせ、主要な政策を先頭に置く。
CATEGORY_POLICY_TAGS = {
    ("主体性", "学習活動"): ["policy3", "policy2"],
    ("主体性", "学習環境"): ["policy3", "policy2"],
    ("主体性", "自己認識"): ["policy3", "policy2"],
    ("主体性", "行動"): ["policy3", "policy2"],
    ("主体性", "ウェルビーイング"): ["policy3", "policy7"],
    ("協働性", "学習活動"): ["policy3", "policy6"],
    ("協働性", "学習環境"): ["policy3", "policy6"],
    ("協働性", "自己認識"): ["policy3", "policy6"],
    ("協働性", "行動"): ["policy3", "policy6"],
    ("協働性", "ウェルビーイング"): ["policy3", "policy6"],
    ("探究性", "学習活動"): ["policy2"],
    ("探究性", "学習環境"): ["policy2"],
    ("探究性", "自己認識"): ["policy2"],
    ("探究性", "行動"): ["policy2"],
    ("探究性", "ウェルビーイング"): ["policy2"],
    ("社会性", "学習活動"): ["policy10", "policy9"],
    ("社会性", "学習環境"): ["policy10", "policy9"],
    ("社会性", "行動"): ["policy10", "policy9"],
    ("社会性", "自己認識"): ["policy10", "policy7"],
    ("社会性", "ウェルビーイング"): ["policy10", "policy7"],
}

# 個別設問レベルの重点タグ。アントレプレナーシップ・弱点セクションで扱う設問など、
# カテゴリ単位のタグより優先して表示する。
QUESTION_POLICY_TAGS = {
    "37": ["policy2"],
    "39": ["policy2"],
    "40": ["policy2", "policy3"],
    "53": ["policy2"],
    "47": ["policy2"],
    "65": ["policy3"],
    "79": ["policy2"],
    "46": ["policy2", "policy5"],
    "80": ["policy2", "policy5"],
    "41": ["policy5"],
    "55": ["policy3"],
    "63": ["policy10", "policy5"],
    "88": ["policy10"],
    "58": ["policy10"],
    "62": ["policy3", "policy10"],
    "57": ["policy3"],
    "78": ["policy1"],
    "81": ["policy7"],
    "82": ["policy7"],
}


def latest_file(pattern):
    candidates = glob.glob(os.path.join(ROOT_DIR, pattern), recursive=True)
    candidates = [c for c in candidates if os.path.isfile(c) and not os.path.basename(c).startswith("~$")]
    if not candidates:
        return None
    return max(candidates, key=os.path.getmtime)


def to_pct(v):
    if isinstance(v, str) and v.endswith("%"):
        try:
            return float(v[:-1])
        except ValueError:
            return None
    return None


def to_pt(v):
    if isinstance(v, str) and v.endswith("pt"):
        try:
            return float(v[:-2])
        except ValueError:
            return None
    return None


def to_count(v):
    if isinstance(v, str) and v.endswith("人"):
        try:
            return int(v[:-1])
        except ValueError:
            return None
    return None


def policy_tags_for(trait, layer):
    return list(CATEGORY_POLICY_TAGS.get((trait, layer), []))


def question_policy_tags(no, trait, layer):
    if no in QUESTION_POLICY_TAGS:
        return list(QUESTION_POLICY_TAGS[no])
    return policy_tags_for(trait, layer)


def parse_survey(path):
    """Excelを読み込み、カテゴリ・個別設問の生データ構造を返す。"""
    df = pd.read_excel(path, sheet_name="Worksheet", header=None)

    respondents_row = df[df[0] == "質問事項"]
    respondents = {}
    if not respondents_row.empty:
        r = respondents_row.iloc[0]
        for year, col in zip(YEARS, [2, 3, 4]):
            respondents[year] = to_count(r[col])

    categories = []
    current = None
    for i in range(4, len(df)):
        r = df.iloc[i]
        label0, label1 = r[0], r[1]

        def block(row):
            return {
                "school": {y: to_pct(row[c]) for y, c in zip(YEARS, [2, 3, 4])},
                "yoy_diff": to_pt(row[5]),
                "national_trend_diff": to_pt(row[6]),
                "prefecture": {y: to_pct(row[c]) for y, c in zip(YEARS, [7, 8, 9])},
                "national": {y: to_pct(row[c]) for y, c in zip(YEARS, [10, 11, 12])},
            }

        if isinstance(label0, str) and label0.startswith("【"):
            label = label0.strip("【】")
            trait = next((t for t in TRAIT_SLUG if label.startswith(t)), None)
            layer = label[len(trait):].removeprefix("に関わる") if trait else label
            current = {
                "key": f"{TRAIT_SLUG.get(trait, 'misc')}_{LAYER_SLUG.get(layer, 'misc')}" if trait else "misc",
                "label": label,
                "trait": trait,
                "layer": layer if trait else label,
                "questions": [],
                **block(r),
            }
            categories.append(current)
        elif isinstance(label1, str) and current is not None:
            m = re.match(r"^(\d+)\.(.*)$", label1.strip())
            if not m:
                continue  # 「平日/休日」の学習時間行など、%集計の対象外データは除外
            current["questions"].append({
                "no": m.group(1),
                "text": m.group(2).strip(),
                **block(r),
            })

    return {"respondents": respondents, "categories": categories}


def build_raw(survey, source_path):
    return {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "source_file": os.path.basename(source_path),
        "source_updated": datetime.fromtimestamp(os.path.getmtime(source_path)).strftime("%Y-%m-%d"),
        "respondents": survey["respondents"],
        "categories": survey["categories"],
    }


def build_tagged(survey, source_path):
    categories = []
    unique_questions = {}  # no -> question dict（複数カテゴリに重複登場する設問を集約）

    for cat in survey["categories"]:
        tagged_cat = {k: v for k, v in cat.items() if k != "questions"}
        tagged_cat["policy_tags"] = policy_tags_for(cat["trait"], cat["layer"])
        tagged_cat["questions"] = []

        for q in cat["questions"]:
            q_tags = question_policy_tags(q["no"], cat["trait"], cat["layer"])

            trend = q["national_trend_diff"]
            tagged_q = {
                **q,
                "category_key": tagged_cat["key"],
                "category_label": cat["label"],
                "trait": cat["trait"],
                "is_weak": trend is not None and trend <= WEAK_THRESHOLD_PT,
                "policy_tags": q_tags,
            }
            tagged_cat["questions"].append(tagged_q)

            if q["no"] not in unique_questions:
                unique_questions[q["no"]] = tagged_q
            else:
                # 同一設問が複数カテゴリに登場する場合はタグを統合する
                merged = list(dict.fromkeys(unique_questions[q["no"]]["policy_tags"] + q_tags))
                unique_questions[q["no"]]["policy_tags"] = merged

        categories.append(tagged_cat)

    # --- 4資質の5層平均伸び（2024→2026） ---------------------------------
    trait_layer_growth = []
    for trait, slug in TRAIT_SLUG.items():
        vals = [
            c["school"]["2026"] - c["school"]["2024"]
            for c in survey["categories"]
            if c["trait"] == trait and c["school"]["2026"] is not None and c["school"]["2024"] is not None
        ]
        if vals:
            trait_layer_growth.append({"trait": trait, "avg_growth_2024_2026": round(sum(vals) / len(vals), 1)})

    # --- アントレプレナーシップ特集 -----------------------------------------
    def entre_item(no, group):
        q = unique_questions.get(no)
        if not q:
            return None
        return {
            "no": no,
            "text": q["text"],
            "v2025": q["school"]["2025"],
            "v2026": q["school"]["2026"],
            "yoy_diff": q["yoy_diff"],
            "national_trend_diff": q["national_trend_diff"],
            "policy_tags": q["policy_tags"],
        }

    entrepreneurship = {
        "summary": "挑戦する意欲・計画力は育っているが、成果を新しい価値へ転化する力（応用・創造）が課題",
        "strengths": [x for x in (entre_item(no, "strength") for no in ENTREPRENEURSHIP_NOS["strength"]) if x],
        "weaknesses": [x for x in (entre_item(no, "weakness") for no in ENTREPRENEURSHIP_NOS["weakness"]) if x],
    }

    # --- 多様性・地域みらい留学の影響 ----------------------------------------
    # 追記指示書「多様性と地域みらい留学の影響分析」に基づく特集セクション。
    # 「違いを認め合う文化」（No.22/23）と「地域とのつながり」（No.69/70）の
    # 2024→2026年度の推移を提示する。政策タグは指示書の指定に従い、この
    # セクション専用として固定で付与する（categories側の同一設問のタグとは独立）。
    DIVERSITY_POLICY_TAGS = ["policy6", "policy10", "policy5"]

    def diversity_item(no):
        q = unique_questions.get(no)
        if not q:
            return None
        return {
            "no": no,
            "text": q["text"],
            "school": q["school"],
            "national_trend_diff": q["national_trend_diff"],
            "policy_tags": DIVERSITY_POLICY_TAGS,
        }

    collaboration_ref = next((g for g in trait_layer_growth if g["trait"] == "協働性"), None)

    diversity_impact = {
        "policy_tags": DIVERSITY_POLICY_TAGS,
        "culture": {
            "title": "「違いを認め合う文化」の変化",
            "note": "全国トレンドとほぼ同水準の伸びだが、自校では2年間で絶対値が大きく上昇している。",
            "questions": [x for x in (diversity_item(no) for no in ["22", "23"]) if x],
        },
        "community": {
            "title": "「地域とのつながり」の急拡大",
            "note": "地域みらい留学の趣旨（地域協働・地域に根ざした学び）と整合的な、全国トレンドを大きく上回る伸びである。",
            "questions": [x for x in (diversity_item(no) for no in ["69", "70"]) if x],
        },
        "collaboration_ref": collaboration_ref,
    }
    # 次年度以降、アンケートに「地域みらい留学生／地元生」の属性区分が追加された
    # 場合は、本セクションを属性別集計に拡張してより踏み込んだ分析を行うこと。
    # 現状は属性区分がないため、相関の提示にとどめている（data_limitationsに明記）。

    # --- 弱点・要強化項目の自動抽出 ------------------------------------------
    weak_candidates = [
        q for q in unique_questions.values()
        if q["national_trend_diff"] is not None and q["national_trend_diff"] <= WEAK_THRESHOLD_PT
    ]
    weak_candidates.sort(key=lambda q: q["national_trend_diff"])

    def related_strengths(weak_q):
        trait = weak_q["trait"]
        if not trait:
            return []
        pool = [
            q for q in unique_questions.values()
            if q["trait"] == trait
            and q["no"] != weak_q["no"]
            and q["national_trend_diff"] is not None
            and q["national_trend_diff"] >= RELATED_STRENGTH_MIN_TREND
        ]
        pool.sort(key=lambda q: q["national_trend_diff"], reverse=True)
        return [
            {"no": q["no"], "text": q["text"], "national_trend_diff": q["national_trend_diff"]}
            for q in pool[:RELATED_STRENGTH_TOP_N]
        ]

    weak_points = [
        {
            "no": q["no"],
            "text": q["text"],
            "category_label": q["category_label"],
            "v2026": q["school"]["2026"],
            "national_trend_diff": q["national_trend_diff"],
            "policy_tags": q["policy_tags"],
            "priority": q["no"] in PRIORITY_WEAK_NOS,
            "related_strengths": related_strengths(q),
        }
        for q in weak_candidates
    ]

    weak_nos = {w["no"] for w in weak_points}

    # --- 伸び幅ランキング（自校 前年度比、全66設問対象） -----------------------
    # 既存の要強化項目（全国トレンド比 -3.0pt以下）とは異なる指標（自校2025→2026）
    # であるため、混同しないよう明示的に別セクションとして出力する。
    growable = [q for q in unique_questions.values() if q["yoy_diff"] is not None]
    growable_desc = sorted(growable, key=lambda q: q["yoy_diff"], reverse=True)
    growable_asc = sorted(growable, key=lambda q: q["yoy_diff"])

    def rank_item(q):
        return {
            "no": q["no"],
            "text": q["text"],
            "category_label": q["category_label"],
            "yoy_diff": q["yoy_diff"],
            "v2025": q["school"]["2025"],
            "v2026": q["school"]["2026"],
            # 全国トレンド比ベースの「要強化項目」にも該当するか（指標が異なる旨の注記用）
            "also_national_weak": q["no"] in weak_nos,
        }

    growth_ranking = {
        "metric": "yoy_diff_school_2025_2026",
        "top": [rank_item(q) for q in growable_desc[:GROWTH_RANK_N]],
        "bottom": [rank_item(q) for q in growable_asc[:GROWTH_RANK_N]],
    }

    # --- 県平均・全国平均との差分バブルチャート用データ（20カテゴリ単位） --------
    bubble_categories = [
        {
            "key": c["key"],
            "label": c["label"],
            "trait": c["trait"],
            "layer": c["layer"],
            "v2026": c["school"]["2026"],
            "diff_national_2026": (
                round(c["school"]["2026"] - c["national"]["2026"], 1)
                if c["school"]["2026"] is not None and c["national"]["2026"] is not None
                else None
            ),
            "diff_prefecture_2026": (
                round(c["school"]["2026"] - c["prefecture"]["2026"], 1)
                if c["school"]["2026"] is not None and c["prefecture"]["2026"] is not None
                else None
            ),
            "policy_tags": next((tc["policy_tags"] for tc in categories if tc["key"] == c["key"]), []),
        }
        for c in survey["categories"]
        if c["trait"] is not None  # 5層×4資質の20区分のみ対象（「学習・その他」は除外）
    ]

    return {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "source_file": os.path.basename(source_path),
        "source_updated": datetime.fromtimestamp(os.path.getmtime(source_path)).strftime("%Y-%m-%d"),
        "respondents": survey["respondents"],
        "policy_labels": POLICY_LABELS,
        "categories": categories,
        "trait_layer_growth": trait_layer_growth,
        "entrepreneurship": entrepreneurship,
        "diversity_impact": diversity_impact,
        "weak_points": weak_points,
        "weak_threshold_pt": WEAK_THRESHOLD_PT,
        "growth_ranking": growth_ranking,
        "bubble_categories": bubble_categories,
        "data_limitations": [
            "本データは学校全体の集計値であり、学年別・個人別の内訳は含まれていない。",
            "「特定の資質が学年間でどうばらついているか」等の深掘りは、今回のデータからは判断できない。",
            "現行のアンケートには「地域みらい留学生か地元生か」という生徒の属性区分が含まれていないため、"
            "「多様性・地域みらい留学の影響」セクションで示す伸びが同制度によるものか、探究学習の充実など"
            "他の施策と重なった結果かを、このデータだけで完全に切り分けることはできない。同セクションの内容は"
            "相関関係の提示にとどまり、因果関係を断定するものではない。",
        ],
    }


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    source_path = latest_file(SURVEY_GLOB)
    if not source_path:
        print(f"元データが見つかりません: {SURVEY_GLOB}")
        return

    survey = parse_survey(source_path)
    raw = build_raw(survey, source_path)
    tagged = build_tagged(survey, source_path)

    with open(RAW_JSON, "w", encoding="utf-8") as f:
        json.dump(raw, f, ensure_ascii=False, indent=2)

    with open(TAGGED_JSON, "w", encoding="utf-8") as f:
        json.dump(tagged, f, ensure_ascii=False, indent=2)

    with open(TAGGED_JS, "w", encoding="utf-8") as f:
        f.write("window.KOKOROZASHI_DATA = ")
        json.dump(tagged, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(f"生成しました: {RAW_JSON}")
    print(f"生成しました: {TAGGED_JSON}")
    print(f"生成しました: {TAGGED_JS}")


if __name__ == "__main__":
    main()
