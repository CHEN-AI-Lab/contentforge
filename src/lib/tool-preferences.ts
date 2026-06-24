import type { ContentTone, PlatformId } from "@/types/content";

export interface ToolPreferences {
  defaultTone: ContentTone;
  /** 切换语气时清空已生成结果 */
  clearOnToneChange: boolean;
  /** 生成成功后滚动到结果区 */
  scrollToResult: boolean;
  /** 记住上次选中的平台 */
  rememberPlatforms: boolean;
}

export const DEFAULT_PREFERENCES: ToolPreferences = {
  defaultTone: "casual",
  clearOnToneChange: true,
  scrollToResult: true,
  rememberPlatforms: true,
};

const STORAGE_KEY = "contentforge-tool-preferences";
const PLATFORMS_KEY = "contentforge-selected-platforms";

export function loadPreferences(): ToolPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(prefs: ToolPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function loadSavedPlatforms(): PlatformId[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PLATFORMS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlatformId[];
  } catch {
    return null;
  }
}

export function savePlatforms(platforms: PlatformId[]): void {
  localStorage.setItem(PLATFORMS_KEY, JSON.stringify(platforms));
}
