import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
export declare class CoverView implements ComponentInterface {
  animation: string;
  hoverClass: string;
  hoverStartTime: number;
  hoverStayTime: number;
  hover: boolean;
  touch: boolean;
  onLongPress: EventEmitter;
  private timeoutEvent;
  private startTime;
  onTouchStart(): void;
  onTouchMove(): void;
  onTouchEnd(): void;
  render(): any;
}
