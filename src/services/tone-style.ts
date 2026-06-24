import type { ContentTone } from "@/types/content";

export interface ToneStyle {
  label: string;
  /** 口播 / 视频开场 */
  videoHook: (topic: string) => string;
  /** 互动结尾 */
  cta: string;
  /** 小红书要点前缀 */
  listMarker: (i: number) => string;
  /** 是否大量使用 emoji */
  emoji: boolean;
  /** 微博行首标签 */
  weiboTag: string;
  /** 公众号标题前缀 */
  wechatTitlePrefix: string;
  /** 公众号文末 */
  wechatFooter: string;
  /** 抖音中段互动口播 */
  douyinMidCta: string;
  /** 抖音结尾口播 */
  douyinEndCta: string;
  /** 视频号开场 */
  shipinhaoGreet: string;
  /** 视频号描述收尾 */
  shipinhaoDescEnd: string;
  /** SEO 标题模板 */
  seoTitleTemplates: (base: string, kw: string[]) => string[];
  /** B站开场 */
  bilibiliOpen: string;
  /** B站结尾 */
  bilibiliClose: string;
}

const STYLES: Record<ContentTone, ToneStyle> = {
  casual: {
    label: "轻松口语",
    videoHook: (t) => `你有没有想过：${t}？`,
    cta: "觉得有用就点个赞，评论区聊聊你的看法～",
    listMarker: (i) => `${i + 1}️⃣`,
    emoji: true,
    weiboTag: "",
    wechatTitlePrefix: "",
    wechatFooter: "觉得有用请「在看」+ 转发，我们下期见。",
    douyinMidCta:
      "如果你也遇到过这个问题，双击收藏，评论区打「1」我发你完整版。",
    douyinEndCta: "关注我，下期拆更细的实操步骤。",
    shipinhaoGreet: "朋友们好，今天分享一个很多人问我的问题：",
    shipinhaoDescEnd: "看完有收获记得点赞转发～",
    seoTitleTemplates: (base, kw) => [
      `${base}：超全整理（建议收藏）`,
      `${kw[0] ?? "新手"}必看！${base} 实操分享`,
      `关于${base}，我把想说的都写在这了`,
      `${kw[1] ?? "效率"}提升指南｜${base}`,
      `${base}入门？从这一篇开始就够了`,
    ],
    bilibiliOpen: "嗨，各位好呀～ 今天聊点实在的：",
    bilibiliClose: "一键三连支持一下，我们下期见！",
  },
  professional: {
    label: "专业可信",
    videoHook: (t) => `本期聚焦一个关键问题：${t}。`,
    cta: "欢迎转发至工作群；有疑问可在评论区提出，我会集中回复。",
    listMarker: (i) => `${i + 1}.`,
    emoji: false,
    weiboTag: "【观察】",
    wechatTitlePrefix: "深度解析｜",
    wechatFooter: "—— 转载请注明出处，欢迎转载至朋友圈。",
    douyinMidCta:
      "如需完整资料清单，可在评论区留言「资料」，我将整理后回复。",
    douyinEndCta: "关注账号，获取后续系列内容的系统更新。",
    shipinhaoGreet: "大家好，今天从方法论角度解析：",
    shipinhaoDescEnd: "详情见视频，欢迎转发至朋友圈供团队参考。",
    seoTitleTemplates: (base, kw) => [
      `${base}：方法论与实施路径（2026）`,
      `${kw[0] ?? "企业"}如何落地${base}？白皮书式解读`,
      `${base}最佳实践：${kw[1] ?? "5"} 个关键要素`,
      `行业观察：${base}的趋势与数据参考`,
      `${kw[2] ?? "专家"}视角｜${base}完整分析`,
    ],
    bilibiliOpen: "各位好，本期为系统性的知识分享：",
    bilibiliClose: "若对你有帮助，欢迎投币收藏；系列内容见合集。",
  },
  viral: {
    label: "爆款吸睛",
    videoHook: (t) => `停！先别划走——${t}，90% 的人都做错了！`,
    cta: "🔥 赶紧收藏！转发给那个最需要的人！评论区扣「要」领清单！",
    listMarker: (i) => `🔥${i + 1}`,
    emoji: true,
    weiboTag: "【爆】",
    wechatTitlePrefix: "⚠️ 必读｜",
    wechatFooter: "🔥 转发扩散！在看走一波！错过等一年！",
    douyinMidCta: "太离谱了！双击屏幕！评论区扣「666」我私信你秘籍！",
    douyinEndCta: "不关注真的亏大了！下条更炸！",
    shipinhaoGreet: "注意了！这条不看真的亏：",
    shipinhaoDescEnd: "🔥 速转！点赞过 500 我发完整版！",
    seoTitleTemplates: (base, kw) => [
      `震惊！${base} 竟然还能这样玩？`,
      `${kw[0] ?? "小白"}逆袭！${base} 保姆级攻略`,
      `千万别再${kw[1] ?? "乱做"}了！${base} 正确姿势`,
      `全网都在问的${base}，答案来了`,
      `${base}｜看完这篇你就赢了 99% 的人`,
    ],
    bilibiliOpen: "前方高能！今天这条不看完血亏：",
    bilibiliClose: "三连走起！弹幕扣「学到了」！下集更狠！",
  },
};

export function getToneStyle(tone: ContentTone): ToneStyle {
  return STYLES[tone];
}
