import React from 'react'
import { Scale, Ruler, Activity } from 'lucide-react'
import checkIMC from '@/utils/checkIMC'
import IMCDisplay from './IMCDisplay'
const ActualDataCards = ({physicalData}) => {
  return (
    <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Card for Weight */}
                    <div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <Scale className="text-primary" size={24} />
                            </div>
                            <p className="text-text-secondary">Poids actuel</p>
                        </div>
                        <p className="text-3xl font-medium">
                            {physicalData.length > 0 ? physicalData[physicalData.length - 1].weight : "—"}
                            <span className="text-lg text-text-secondary">kg</span>
                        </p>
                        {physicalData.length > 1 && (
                            <p className="text-sm text-primary mt-1">
                                {(physicalData[physicalData.length - 1].weight - physicalData[physicalData.length - 2].weight).toFixed(1) > 0 ? "+" : ""}
                                {(physicalData[physicalData.length - 1].weight - physicalData[physicalData.length - 2].weight).toFixed(1)}kg
                            </p>
                        )}
                    </div>

                    {/* Card for Height */}
                    <div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <Ruler className="text-primary" size={24} />
                            </div>
                            <p className="text-text-secondary">Taille actuelle</p>
                        </div>
                        <p className="text-3xl font-medium">
                            {physicalData.length > 0 ? (physicalData[physicalData.length - 1].height / 100).toFixed(2) : "—"}
                            <span className="text-lg text-text-secondary">m</span>
                        </p>
                        {physicalData.length > 1 && (
                            <p className="text-sm text-text-secondary mt-1">
                                {((physicalData[physicalData.length - 1].height - physicalData[physicalData.length - 2].height) / 100).toFixed(2) > 0 ? "+" : ""}
                                {((physicalData[physicalData.length - 1].height - physicalData[physicalData.length - 2].height) / 100).toFixed(2)}m
                            </p>
                        )}
                    </div>

                    {/* Card for IMC */}
                    <div className="bg-bgtone p-6 rounded-xl border-[1px] border-black/10 dark:border-white/5 shadow-md shadow-black/5 dark:shadow-white/5">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <Activity className="text-primary" size={24} />
                            </div>
                            <p className="text-text-secondary">IMC actuel</p>
                        </div>
                        <p className="text-3xl font-medium">
                            {physicalData.length > 0 ? physicalData[physicalData.length - 1].imc.toFixed(1) : "—"}
                        </p>
                        {physicalData.length > 1 && (
                            <p className="text-sm text-text-secondary mt-1">
                                <IMCDisplay imcData={checkIMC(physicalData[physicalData.length - 1].imc)} />
                            </p>
                        )}
                    </div>
                </div>
            </section>
  )
}

export default ActualDataCards