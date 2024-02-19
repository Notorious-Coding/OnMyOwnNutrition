import React from "react";

export default interface HtmlProps {
  className?: string;
  id?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
