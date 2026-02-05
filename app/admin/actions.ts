'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function updateApplicationStatus(id: string, newStatus: string) {
    const supabase = await createClient();

    // Verify auth again on the server action for safety
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);

    if (error) {
        console.error('Error updating status:', error);
        throw new Error('Failed to update status');
    }

    revalidatePath('/admin/dashboard');
}
