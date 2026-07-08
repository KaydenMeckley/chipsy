/* =====================================================================
   CHIPSY BAKERY — SUPABASE CONNECTION
   This connects your website to your Supabase database in the cloud.
   The "publishable key" below is SAFE to have in your website code —
   it only allows the actions your security rules (RLS) permit.
   (Never put the secret / service_role key here.)
   Requires the Supabase library, loaded from a <script> tag on the page.
   ===================================================================== */

const SUPABASE_URL = "https://pcsfiwfgyvyhyipegbgw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1ogkdUwb4ighq0bXgz6mkA_ic4FUcmc";

// `window.supabase` comes from the CDN <script> tag on the page.
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
