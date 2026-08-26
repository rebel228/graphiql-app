import '@material-tailwind/react';

declare module '@material-tailwind/react' {
  // Добавляем недостающие пропсы для всех компонентов, которые мы используем
  export interface ButtonProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface TypographyProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface InputProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface CardProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface NavbarProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface IconButtonProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface AccordionProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface AccordionHeaderProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface TabsHeaderProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface TabProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface TabsBodyProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface MenuListProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface MenuItemProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface SpinnerProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface AvatarProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface CardBodyProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }

  export interface CardFooterProps {
    placeholder?: string;
    onResize?: () => void;
    onResizeCapture?: () => void;
    onPointerEnterCapture?: () => void;
    onPointerLeaveCapture?: () => void;
  }
}
