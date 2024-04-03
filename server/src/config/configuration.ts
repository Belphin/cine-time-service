export type ConfigObject = ReturnType<typeof configuration>;

export function configuration() {
  return {
    port: Number.parseInt(process.env.SERVER_PORT, 10) || 8000
  };
}
