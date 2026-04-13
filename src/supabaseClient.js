import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAPIKey = import.meta.env.VITE_SUPABASE_API_KEY;

class SupabaseClientSingleton {
	static instance = null;

	static getInstance() {
		if (!SupabaseClientSingleton.instance) {
			SupabaseClientSingleton.instance = createClient(supabaseUrl, supabaseAPIKey);
		}
		return SupabaseClientSingleton.instance;
	}
}

export const supabase = SupabaseClientSingleton.getInstance();

export default SupabaseClientSingleton;
