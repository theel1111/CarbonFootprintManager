// styled.d.ts
// TypeScript 預設的 DefaultTheme 沒有自己定義的 buttonPrimary、background 等屬性
import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        background: string;
        cardBackground: string;
        textPrimary: string;
        textSecondary: string;
        buttonPrimary: string;
        buttonSecondary: string;
    }
}
