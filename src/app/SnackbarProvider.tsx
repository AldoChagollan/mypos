"use client";

import { SnackbarProvider } from "notistack";

export default function CustomSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
