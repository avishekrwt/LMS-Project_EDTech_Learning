import express from "express";
import { supabaseService, supabaseAnon } from "../supabaseClient";

const router = express.Router();

/** ---------------------------
 *  SIGNUP (ADMIN-LEVEL CREATION)
 * ----------------------------
 *  - No manual profile insert
 *  - First/last name stored in metadata
 *  - Lets Supabase trigger auto-create profiles
 */
router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ error: "Email, password, first name, and last name are required" });
  }

  try {
    const { data, error } = await supabaseService.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Ensure profile is created/updated with first_name and last_name
    if (data.user?.id) {
      const { error: profileError } = await supabaseService
        .from('profiles')
        .upsert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail signup if profile creation fails, but log it
      }
    }

    return res.json({
      message: "User created successfully",
      user: data.user,
    });
  } catch (err: any) {
    return res.status(500).json({ error: `Signup failed: ${String(err)}` });
  }
});

/** ---------------------------
 *  LOGIN (PUBLIC AUTH)
 * ----------------------------
 *  - Returns session + user
 *  - Fetches extended profile
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    const userId = data.user?.id;
    let profile = null;

    if (userId) {
      const { data: profileData, error: profileError } = await supabaseService
        .from("profiles")
        .select("first_name, last_name, avatar_url, role, organization")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      profile = profileData || null;
    }

    return res.json({
      message: "Login successful",
      session: data.session,
      user: data.user,
      profile,
    });
  } catch (err: any) {
    return res.status(500).json({ error: `Login failed: ${String(err)}` });
  }
});

export default router;
