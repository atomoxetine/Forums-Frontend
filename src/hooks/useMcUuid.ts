import { useEffect, useState } from "react";

const useMcUuid = (username?: string): string | undefined => {
  const [uuid, setUuid] = useState<string>();

  useEffect(() => {
    if (!username) return;

    try {
      fetch(`/api/auth/mcNameToUuid?username=${username}`)
        .then(res => res?.json())
        .then(res => setUuid(res?.uuid));
    } catch { /* Do nothing */ }
  }, [username]);

  return uuid;
}
export default useMcUuid;