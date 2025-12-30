/// <reference types="https://deno.land/x/types/index.d.ts" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey =
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return jsonResponse(500, { error: "missing_env" });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse(401, { error: "missing_authorization" });
  }

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await authClient.auth.getUser();
  if (userError || !userData?.user) {
    return jsonResponse(401, { error: "invalid_token" });
  }

  const user = userData.user;
  const allowedEmails = new Set(["admin@posterju.dge.com"]);

  if (!user.email || !allowedEmails.has(user.email)) {
    return jsonResponse(403, { error: "not_allowed" });
  }

  const serviceClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Ensure a profile exists (UI relies on it).
  const { data: existingProfile } = await serviceClient
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!existingProfile) {
    const fullName =
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
      user.email;

    const { error: profileError } = await serviceClient.from("profiles").insert({
      user_id: user.id,
      email: user.email,
      full_name: fullName,
      phone: typeof user.user_metadata?.phone === "string" ? user.user_metadata.phone : null,
      institution:
        typeof user.user_metadata?.institution === "string"
          ? user.user_metadata.institution
          : null,
      is_external: Boolean(user.user_metadata?.is_external ?? false),
    });

    if (profileError) {
      return jsonResponse(500, { error: "profile_insert_failed" });
    }
  }

  const { error: roleError } = await serviceClient
    .from("user_roles")
    .insert({ user_id: user.id, role: "admin" });

  // Ignore duplicate role.
  if (roleError && roleError.code !== "23505") {
    return jsonResponse(500, { error: "role_insert_failed" });
  }

  return jsonResponse(200, { ok: true });
});
