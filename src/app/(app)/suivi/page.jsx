import React from 'react'
import DashboardSuivi from '@/components/suivi/DashboardSuivi'
const PageSuivi = () => {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
    {/* Header Section */}
    <div className="bg-bgtone p-4 sm:p-6 rounded-2xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5 mb-6 sm:mb-8">
        <div>
            <h1 className="text-3xl sm:text-4xl font-medium mb-2">
                Suivi
            </h1>
            <p className="text-text-secondary">
                Visualisez vos progrès physiques
            </p>
        </div>
    </div>

    {/* Graphique */}
    <DashboardSuivi />
</div>
  )
}

export default PageSuivi