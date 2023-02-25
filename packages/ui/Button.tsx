import React from "react"

export interface ButtonProps {
  primary?: boolean
  size?: "small" | "large"
  label?: string
}

export const Button = ({
  primary = false,
  size = "small",
  label = "Button",
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: primary ? "red" : "blue",
        fontSize: size === "large" ? "24px" : "14px",
      }}
    >
      {label}
    </button>
  )
}
