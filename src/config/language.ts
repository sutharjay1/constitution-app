import { ELanguage } from "@/hooks/useLang";
import { LangProps } from "@/type";


export const Language: LangProps[] = [
    {
        lang: "हिंदी",
        flag: "🇮🇳",
        enum: ELanguage.Hindi,
    },
    {
        lang: "English",
        flag: "🇬🇧",
        enum: ELanguage.English,
    },
    {
        lang: "中文",
        flag: "🇨🇳",
        enum: ELanguage.Chinese,
    },
    {
        lang: "日本語",
        flag: "🇯🇵",
        enum: ELanguage.Japanese,
    },
    {
        lang: "Español",
        flag: "🇪🇸",
        enum: ELanguage.Spanish,
    },
    {
        lang: "Português",
        flag: "🇧🇷",
        enum: ELanguage.Portuguese,
    },
    // {
    //     lang: "Français",
    //     flag: "🇫🇷",
    //     enum: ELanguage.French,
    // },
]