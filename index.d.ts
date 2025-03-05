import { EventEmitter } from "events";

// 共通の型定義
export interface DisplayInfo {
  displayId: number;
}

export interface WindowInfo {
  windowId: number;
  title: string;
}

// AudioCapture 関連の型定義
export interface StartCaptureConfig {
  channels: number;
  sampleRate: number;
  displayId?: number;
  windowId?: number;
}

export interface AudioCapture extends EventEmitter {
  startCapture(config: StartCaptureConfig): void;
  stopCapture(): Promise<void>;
}

export var AudioCapture: AudioCaptureConstructor;

interface AudioCaptureConstructor {
  new (): AudioCapture;
  enumerateDesktopWindows(): Promise<[DisplayInfo[], WindowInfo[]]>;
}

// MediaCapture 関連の型定義
export interface MediaCaptureTarget {
  isDisplay: boolean;
  isWindow: boolean;
  displayId: number;
  windowId: number;
  width: number;
  height: number;
  title?: string;
  appName?: string;
}

export enum MediaCaptureQuality {
  High = 0,
  Medium = 1,
  Low = 2,
}

export interface MediaCaptureConfig {
  frameRate: number;
  quality: MediaCaptureQuality;
  audioSampleRate: number;
  audioChannels: number;
  displayId?: number;
  windowId?: number;
  bundleId?: string;
}

export interface MediaCaptureVideoFrame {
  data: Buffer;
  width: number;
  height: number;
  bytesPerRow: number;
  timestamp: number;
}

export interface MediaCaptureAudioData {
  data: Float32Array;
  channels: number;
  sampleRate: number;
  frameCount: number;
}

export interface MediaCapture extends EventEmitter {
  // 標準キャプチャメソッドのみ（startCaptureExを削除）
  startCapture(config: MediaCaptureConfig): void;
  stopCapture(): Promise<void>;

  // イベント定義（audio-data-exを削除）
  on(
    event: "video-frame",
    listener: (frame: MediaCaptureVideoFrame) => void
  ): this;

  on(
    event: "audio-data",
    listener: (audio: MediaCaptureAudioData) => void
  ): this;

  on(event: "error", listener: (error: Error) => void): this;
  on(event: "exit", listener: () => void): this;

  once(
    event: "video-frame",
    listener: (frame: MediaCaptureVideoFrame) => void
  ): this;

  once(
    event: "audio-data",
    listener: (audio: MediaCaptureAudioData) => void
  ): this;

  once(event: "error", listener: (error: Error) => void): this;
  once(event: "exit", listener: () => void): this;
}

export var MediaCapture: MediaCaptureConstructor;

interface MediaCaptureConstructor {
  new (): MediaCapture;
  enumerateMediaCaptureTargets(type?: number): Promise<MediaCaptureTarget[]>;
}
