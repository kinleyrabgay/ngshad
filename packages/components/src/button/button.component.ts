import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800',
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-background dark:hover:bg-accent dark:hover:text-accent-foreground',
  ghost:
    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline dark:text-primary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-9 px-4 text-sm rounded-md',
  lg: 'h-10 px-6 text-base rounded-md',
};

@Component({
  selector: 'ngshad-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      [attr.type]="type"
      [attr.aria-disabled]="disabled || loading"
      [attr.data-state]="loading ? 'loading' : undefined"
      (click)="handleClick($event)"
      (focus)="focused.emit($event)"
      (blur)="blurred.emit($event)"
    >
      <span class="flex items-center gap-2">
        <span *ngIf="loading" class="animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ButtonComponent {
  /** The visual variant of the button */
  @Input() variant: ButtonVariant = 'default';

  /** The size of the button */
  @Input() size: ButtonSize = 'md';

  /** Whether the button is disabled */
  @Input() disabled = false;

  /** The type of button */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Whether the button is in a loading state */
  @Input() loading = false;

  /** Whether the button should take up the full width of its container */
  @Input() fullWidth = false;

  /** Custom class for the button */
  @Input() customClass: string = '';

  /** Emitted when the button is clicked */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Emitted when the button receives focus */
  @Output() focused = new EventEmitter<FocusEvent>();

  /** Emitted when the button loses focus */
  @Output() blurred = new EventEmitter<FocusEvent>();

  /** Apply full width styles when fullWidth is true */
  @HostBinding('class.w-full')
  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  /** Get the combined classes for the button */
  get buttonClasses(): string {
    return [
      // Base styles
      'inline-flex items-center justify-center font-medium transition-colors duration-200 cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // Size variant
      sizeStyles[this.size],
      // Color variant
      variantStyles[this.variant],
      // Full width
      this.fullWidth ? 'w-full' : '',
      // Custom class
      this.customClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** Handle button click and emit event if not disabled or loading */
  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
