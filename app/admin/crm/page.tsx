import { getCrmStats, getContacts, getTasks } from './actions'
import { CrmDashboard } from '@/components/admin/crm/CrmDashboard'

export const dynamic = 'force-dynamic'

export default async function CrmPage() {
    const [stats, contacts, tasks] = await Promise.all([
        getCrmStats(),
        getContacts(),
        getTasks(),
    ])

    return (
        <CrmDashboard
            initialStats={stats}
            initialContacts={contacts}
            initialTasks={tasks}
        />
    )
}
