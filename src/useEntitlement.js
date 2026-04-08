// src/useEntitlement.js
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { getDeviceId } from "./deviceId";

export function useEntitlement() {
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const device_id = getDeviceId();
        const { data, error } = await supabase
          .from("entitlements")
          .select("*")
          .eq("device_id", device_id)
          .eq("active", true)
          .maybeSingle();

        if (error) console.error("Entitlement query error:", error);
        if (mounted) setIsPremium(!!data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { loading, isPremium };
}
