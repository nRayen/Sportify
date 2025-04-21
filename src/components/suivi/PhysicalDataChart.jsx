import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const PhysicalDataChart = ({physicalData, setShowNewEntryModal}) => {
    const [showWeight, setShowWeight] = useState(true);
    const [showHeight, setShowHeight] = useState(true);
    const [showIMC, setShowIMC] = useState(true);

    const {theme} = useTheme();
  return (
    <section className="flex flex-col gap-4 w-full">
                <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between items-center">
                    {/* Checkboxes */}
                    <div className="w-fit flex flex-wrap gap-3 mb-4">
                        <label
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                                showWeight
                                    ? "bg-primary/10 border border-primary/20"
                                    : "bg-bgtone dark:bg-bgtone-dark border border-bgtone dark:border-white/10"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={showWeight}
                                onChange={() => setShowWeight(!showWeight)}
                                className="w-4 h-4 accent-primary"
                            />
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#8884d8]"></span>
                                Poids
                            </span>
                        </label>

                        <label
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                                showHeight
                                    ? "bg-primary/10 border border-primary/20"
                                    : "bg-bgtone dark:bg-bgtone-dark border border-bgtone dark:border-white/10"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={showHeight}
                                onChange={() => setShowHeight(!showHeight)}
                                className="w-4 h-4 accent-primary"
                            />
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#82ca9d]"></span>
                                Taille
                            </span>
                        </label>

                        <label
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                                showIMC 
                                    ? "bg-primary/10 border border-primary/20"
                                    : "bg-bgtone dark:bg-bgtone-dark border border-bgtone dark:border-white/10"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={showIMC}
                                onChange={() => setShowIMC(!showIMC)}
                                className="w-4 h-4 accent-primary"
                            />
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
                                IMC
                            </span>
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => setShowNewEntryModal(true)}
                        className="flex items-center justify-center gap-2 w-full md:w-auto bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <Plus size={20} />
                        Nouvelle entrée
                    </button>
                </div>
                    <div className="flex justify-center items-center h-full w-full">
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart
                                data={physicalData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="2 4"
                                    stroke="#f5f5f5"
                                    horizontal={false}
                                />
                                <XAxis
                                    dataKey="created_at"
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: 12 }}
                                />
                                <YAxis
                                    stroke="#666"
                                    tick={{ fill: "#666", fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: theme === "dark" ? "#161616" : "white",
                                        color: theme === "dark" ? "white" : "#161616",
                                        border: theme === "dark" ? "1px solid #333" : "1px solid #ddd", 
                                        borderRadius: "8px",
                                        boxShadow:
                                            "2px 2px 10px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    height={36}
                                    iconType="circle"
                                />
                                {showWeight && (
                                    <Line
                                        type="monotone"
                                        dataKey="weight"
                                        name="Poids (kg)"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        activeDot={{
                                            r: 8,
                                            fill: "#8884d8",
                                            stroke: "white",
                                            strokeWidth: 2,
                                        }}
                                    />
                                )}
                                {showHeight && (
                                    <Line
                                        type="monotone"
                                        dataKey="height"
                                        name="Taille (cm)"
                                        stroke="#82ca9d"
                                        strokeWidth={2}
                                        activeDot={{
                                            r: 8,
                                            fill: "#82ca9d",
                                            stroke: "white",
                                            strokeWidth: 2,
                                        }}
                                    />
                                )}
                                {showIMC && (
                                    <Line
                                        type="monotone"
                                        dataKey="imc"
                                        name="IMC"
                                        stroke="#FFA500"
                                        strokeWidth={2}
                                        activeDot={{
                                            r: 8,
                                            fill: "#FFA500",
                                            stroke: "white",
                                            strokeWidth: 2,
                                        }}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                {/* )} */}
            </section>
  )
}

export default PhysicalDataChart