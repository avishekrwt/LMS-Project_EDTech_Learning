import { Request, Response, NextFunction } from 'express';
import type { User } from '@supabase/supabase-js';
import { supabaseAnon } from '../supabaseClient';

export interface AuthenticatedRequest extends Request {
  supabaseUser?: User;
  accessToken?: string;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabaseAnon.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.supabaseUser = data.user;
    req.accessToken = token;
    return next();
  } catch (err) {
    return res.status(500).json({ error: `Auth check failed: ${String(err)}` });
  }
}

