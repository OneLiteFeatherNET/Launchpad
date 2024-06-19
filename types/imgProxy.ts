// types/imgProxy.ts

export interface ImgProxyParams {
    resize?: string;
    size?: string;
    fit?: string;
    width?: number;
    height?: number;
    dpr?: number;
    enlarge?: boolean;
    extend?: boolean;
    gravity?: string;
    crop?: string;
    padding?: number;
    trim?: boolean;
    rotate?: number;
    quality?: number;
    maxBytes?: number;
    background?: string;
    backgroundAlpha?: number;
    blur?: number;
    sharpen?: number;
    watermark?: string;
    preset?: string;
    cacheBuster?: string;
    stripMetadata?: boolean;
    stripColorProfile?: boolean;
    autoRotate?: boolean;
    filename?: string;
    format?: string;
}

export const keyMap: Record<keyof ImgProxyParams, string> = {
    resize: "rs",
    size: "s",
    fit: "rt",
    width: "w",
    height: "h",
    dpr: "dpr",
    enlarge: "el",
    extend: "ex",
    gravity: "g",
    crop: "c",
    padding: "pd",
    trim: "t",
    rotate: "rot",
    quality: "q",
    maxBytes: "mb",
    background: "bg",
    backgroundAlpha: "bga",
    blur: "bl",
    sharpen: "sh",
    watermark: "wm",
    preset: "pr",
    cacheBuster: "cb",
    stripMetadata: "sm",
    stripColorProfile: "scp",
    autoRotate: "ar",
    filename: "fn",
    format: "f",
};
