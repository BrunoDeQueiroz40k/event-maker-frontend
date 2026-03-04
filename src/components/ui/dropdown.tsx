"use client"

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type ComponentPropsWithoutRef,
  cloneElement,
  isValidElement,
} from "react"

type DropdownContextValue = {
  open: boolean
  toggle: () => void
  close: () => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdown() {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error("Dropdown components must be used within Dropdown")
  return ctx
}

type DropdownProps = {
  children: ReactNode
}

export function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setOpen((o) => !o), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, toggle, close }}>
      <div className="relative" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

type DropdownTriggerProps = {
  children: ReactNode
}

export function DropdownTrigger({ children }: DropdownTriggerProps) {
  const { open, toggle } = useDropdown()
  const child = isValidElement(children) ? children : <span>{children}</span>
  return cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      ;(child.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e)
      toggle()
    },
    "aria-expanded": open,
    "aria-haspopup": true,
  })
}

type DropdownMenuProps = {
  children: ReactNode
  align?: "left" | "right"
  className?: string
}

export function DropdownMenu({
  children,
  align = "right",
  className = "",
}: DropdownMenuProps) {
  const { open } = useDropdown()
  if (!open) return null
  return (
    <div
      className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-44 py-1 bg-card border border-border shadow-lg z-50 ${className}`}
      role="menu"
    >
      {children}
    </div>
  )
}

type DropdownItemProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode
  asChild?: boolean
  variant?: "default" | "destructive"
}

const itemStyles = {
  default:
    "text-foreground hover:bg-primary/10 hover:text-primary",
  destructive:
    "text-muted-foreground hover:bg-destructive/20 hover:text-destructive",
}

export function DropdownItem({
  children,
  asChild,
  variant = "default",
  className = "",
  ...props
}: DropdownItemProps) {
  const { close } = useDropdown()
  const baseClass =
    "flex items-center gap-2 w-full px-3 py-2 text-left text-xs font-mono transition-colors cursor-pointer " +
    itemStyles[variant] +
    (className ? ` ${className}` : "")

  if (asChild && isValidElement(children)) {
    const childProps = children.props as { className?: string; onClick?: (e: React.MouseEvent) => void }
    const merged = {
      ...props,
      className: `${baseClass} ${childProps.className ?? ""}`.trim(),
      onClick: (e: React.MouseEvent) => {
        childProps.onClick?.(e)
        close()
      },
      role: "menuitem" as const,
    }
    return cloneElement(children, merged as Parameters<typeof cloneElement>[1])
  }

  return (
    <button
      type="button"
      className={baseClass}
      role="menuitem"
      onClick={(e) => {
        props.onClick?.(e)
        close()
      }}
      {...props}
    >
      {children}
    </button>
  )
}
